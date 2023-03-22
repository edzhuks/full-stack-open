describe("Blog app", function () {
  beforeEach(function () {
    // localStorage.removeItem('user')
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // cy.wait(1000)
    // const user = {
    //   name: 'Superuser',
    //   username: 'root',
    //   password: 'salainen'
    // }
    // cy.request('POST', 'http://localhost:3003/api/users/', user)
    // cy.wait(1000)
    // cy.visit('http://localhost:3000', { timeout: 10000 })
    // cy.wait(1000)
  });

  it("Login form is shown", function () {
    localStorage.removeItem("user");
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.wait(1000);
    const user = {
      name: "Superuser",
      username: "root",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.wait(1000);
    cy.visit("http://localhost:3000", { timeout: 10000 });
    cy.wait(1000);

    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("fails with incorrect credentials", function () {
      localStorage.removeItem("user");
      cy.request("POST", "http://localhost:3003/api/testing/reset");
      cy.wait(1000);
      const user = {
        name: "Superuser",
        username: "root",
        password: "salainen",
      };
      cy.request("POST", "http://localhost:3003/api/users/", user);
      cy.wait(1000);
      cy.visit("http://localhost:3000", { timeout: 10000 });
      cy.wait(1000);

      cy.contains("Log in to application");
      cy.get("#username", { timeout: 100000 }).type("root");
      cy.get("#password").type("badpassword");
      cy.contains("login").click();
      cy.contains("wrong username or password");
    });

    it("succeeds with correct credentials", function () {
      localStorage.removeItem("user");
      cy.request("POST", "http://localhost:3003/api/testing/reset");
      cy.wait(1000);
      const user = {
        name: "Superuser",
        username: "root",
        password: "salainen",
      };
      cy.request("POST", "http://localhost:3003/api/users/", user);
      cy.wait(1000);
      cy.visit("http://localhost:3000", { timeout: 10000 });
      cy.wait(1000);

      cy.contains("Log in to application");
      cy.get("#username").type("root");
      cy.get("#password").type("salainen");
      cy.contains("login").click();
      cy.contains("Superuser logged in");
      cy.contains("create new blog");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {});
    it("A blog can be created", function () {
      localStorage.removeItem("user");
      cy.request("POST", "http://localhost:3003/api/testing/reset");
      cy.wait(1000);
      const user = {
        name: "Superuser",
        username: "root",
        password: "salainen",
      };
      cy.request("POST", "http://localhost:3003/api/users/", user);
      cy.wait(1000);
      cy.visit("http://localhost:3000", { timeout: 10000 });
      cy.wait(1000);

      cy.contains("Log in to application");
      cy.get("#username").type("root");
      cy.get("#password").type("salainen");
      cy.contains("login").click();
      cy.contains("Superuser logged in");
      cy.contains("create new blog").click();
      cy.get("#title").type("I dont like cypress");
      cy.get("#author").type(":(");
      cy.get("#url").type("it-doesnt-work.com");
      cy.get("#create-button").click();
      cy.contains("a new blog");
    });

    it("A blog can be liked", function () {
      localStorage.removeItem("user");
      cy.request("POST", "http://localhost:3003/api/testing/reset");
      cy.wait(1000);
      const user = {
        name: "Superuser",
        username: "root",
        password: "salainen",
      };
      cy.request("POST", "http://localhost:3003/api/users/", user);
      cy.wait(1000);
      cy.visit("http://localhost:3000", { timeout: 10000 });
      cy.wait(1000);

      cy.contains("Log in to application");
      cy.get("#username").type("root");
      cy.get("#password").type("salainen");
      cy.contains("login").click();
      cy.contains("Superuser logged in");
      cy.contains("create new blog").click();
      cy.get("#title").type("I dont like cypress");
      cy.get("#author").type(":(");
      cy.get("#url").type("it-doesnt-work.com");
      cy.get("#create-button").click();
      cy.contains("view").click();
      cy.contains("likes 0");
      cy.get(".like-button").click();
      cy.contains("likes 1");
    });

    it("A blog can be deleted", function () {
      localStorage.removeItem("user");
      cy.request("POST", "http://localhost:3003/api/testing/reset");
      cy.wait(1000);
      const user = {
        name: "Superuser",
        username: "root",
        password: "salainen",
      };
      cy.request("POST", "http://localhost:3003/api/users/", user);
      cy.wait(1000);
      cy.visit("http://localhost:3000", { timeout: 10000 });
      cy.wait(1000);

      cy.contains("Log in to application");
      cy.get("#username").type("root");
      cy.get("#password").type("salainen");
      cy.contains("login").click();
      cy.contains("Superuser logged in");
      cy.contains("create new blog").click();
      cy.get("#title").type("blog to delete");
      cy.get("#author").type(":(");
      cy.get("#url").type("it-doesnt-work.com");
      cy.get("#create-button").click();
      cy.contains("view").click();
      cy.contains("remove").click();
      cy.on("window:confirm", () => true);
      cy.get("remove").should("not.exist");
    });

    it("A blog cannot be deleted by another user", function () {
      localStorage.removeItem("user");
      cy.request("POST", "http://localhost:3003/api/testing/reset");
      cy.wait(1000);
      const user = {
        name: "Superuser",
        username: "root",
        password: "salainen",
      };
      cy.request("POST", "http://localhost:3003/api/users/", user);
      cy.wait(1000);
      cy.visit("http://localhost:3000", { timeout: 10000 });
      cy.wait(1000);

      cy.contains("Log in to application");
      cy.get("#username").type("root");
      cy.get("#password").type("salainen");
      cy.contains("login").click();
      cy.contains("Superuser logged in");
      cy.contains("create new blog").click();
      cy.get("#title").type("blog to delete");
      cy.get("#author").type(":(");
      cy.get("#url").type("it-doesnt-work.com");
      cy.get("#create-button").click();
      cy.contains("logout").click();

      const otherUser = {
        name: "Other",
        username: "other",
        password: "salainen",
      };
      cy.request("POST", "http://localhost:3003/api/users/", otherUser);
      cy.wait(1000);
      cy.visit("http://localhost:3000", { timeout: 10000 });
      cy.wait(1000);

      cy.contains("Log in to application");
      cy.get("#username").type("other");
      cy.get("#password").type("salainen");
      cy.contains("login").click();
      cy.contains("Other logged in");
      cy.contains("view").click();
      cy.get("remove").should("not.exist");
    });
  });

  describe("Blogs are ordered", function () {
    beforeEach(function () {});
    it("by likes descending", function () {
      localStorage.removeItem("user");
      cy.request("POST", "http://localhost:3003/api/testing/reset");
      cy.wait(1000);
      const user = {
        name: "Superuser",
        username: "root",
        password: "salainen",
      };
      cy.request("POST", "http://localhost:3003/api/users/", user);
      cy.wait(1000);
      cy.visit("http://localhost:3000", { timeout: 10000 });
      cy.wait(1000);
      cy.contains("Log in to application");
      cy.get("#username").type("root");
      cy.get("#password").type("salainen");
      cy.contains("login").click();
      cy.contains("Superuser logged in");

      cy.contains("create new blog").click();
      cy.get("#title").type("blog that will have fewer likes");
      cy.get("#author").type(":(");
      cy.get("#url").type("it-doesnt-work.com");
      cy.get("#create-button").click();
      cy.contains("a new blog");

      cy.contains("create new blog").click();
      cy.get("#title").type("blog that will have more likes");
      cy.get("#author").type(":(");
      cy.get("#url").type("it-doesnt-work.com");
      cy.get("#create-button").click();
      cy.contains("a new blog");

      cy.get(".blog")
        .eq(0)
        .should("contain", "blog that will have fewer likes");
      cy.get(".blog").eq(1).should("contain", "blog that will have more likes");

      cy.get(".view-button").eq(1).click();
      cy.get(".like-button").click();

      cy.get(".blog")
        .eq(1)
        .should("contain", "blog that will have fewer likes");
      cy.get(".blog").eq(0).should("contain", "blog that will have more likes");
    });
  });
});
