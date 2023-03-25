const Book = require("./models/book");
const Author = require("./models/author");
const { GraphQLError } = require("graphql");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {};
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          return null;
        }
        filter.author = author._id;
      }
      if (args.genre) {
        filter.genres = args.genre;
      }
      return Book.find(filter).populate("author");
    },
    allAuthors: async () => Author.find({}),
    allGenres: async () => {
      const genres = await Book.aggregate([
        { $unwind: "$genres" },
        { $group: { _id: "a", res: { $addToSet: "$genres" } } },
      ]);
      return genres[0].res;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
    favoriteBooks: async (root, args, context) => {
      return Book.find({ genres: context.currentUser.favoriteGenre }).populate(
        "author"
      );
    },
  },
  // Author: {
  //   bookCount: async (root) => {
  //     const books = await Book.find({ author: root._id });
  //     return books.length;
  //   },
  // },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author, bookCount: 0 });
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error,
            },
          });
        }
      }
      author.bookCount += 1
      await author.save()
      const book = new Book({ ...args, author: author._id });
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      const bookWithAuthor = await book.populate("author");
      pubsub.publish("BOOK_ADDED", { bookAdded: bookWithAuthor });
      return bookWithAuthor;
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      console.log(author);
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Editing author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "password") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator("BOOK_ADDED") },
  },
};

module.exports = resolvers;
