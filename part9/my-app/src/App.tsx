interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends CoursePartDescription {
    kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: 'group';
}

interface CoursePartBackround extends CoursePartDescription {
    backroundMaterial: string;
    kind: 'background';
}

interface CoursePartSpecial extends CoursePartDescription {
    requirements: string[];
    kind: 'special';
}

type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackround
    | CoursePartSpecial;

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
    switch (coursePart.kind) {
        case 'basic':
            return (
                <div style={{ backgroundColor: 'lightcoral' }}>
                    <h4>{coursePart.name}</h4>
                    <p>{coursePart.exerciseCount} exercises </p>
                    <p>
                        <i>{coursePart.description}</i>
                    </p>
                </div>
            );
        case 'group':
            return (
                <div style={{ backgroundColor: 'lightseagreen' }}>
                    <h4>{coursePart.name}</h4>
                    <p>{coursePart.exerciseCount} exercises </p>
                    <p>{coursePart.groupProjectCount} group projects</p>
                </div>
            );
        case 'background':
            return (
                <div style={{ backgroundColor: 'lavender' }}>
                    <h4>{coursePart.name}</h4>
                    <p>{coursePart.exerciseCount} exercises </p>
                    <p>
                        <i>{coursePart.description}</i>
                    </p>
                    <p>background material: {coursePart.backroundMaterial}</p>
                </div>
            );
        case 'special':
            return (
                <div style={{ backgroundColor: 'lightyellow' }}>
                    <h4>{coursePart.name}</h4>
                    <p>{coursePart.exerciseCount} exercises </p>
                    <p>
                        <i>{coursePart.description}</i>
                    </p>
                    <p>required skills: {coursePart.requirements.toString()}</p>
                </div>
            );
    }
};

const Header = ({ name }: { name: string }) => {
    return <h1>{name}</h1>;
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <div>
            {courseParts.map((c) => (
                <Part key={c.name} coursePart={c} />
            ))}
        </div>
    );
};
const Total = ({
    courseParts,
}: {
    courseParts: { name: string; exerciseCount: number }[];
}) => {
    return (
        <p>
            Number of exercises{' '}
            {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
    );
};

const App = () => {
    const courseName = 'Half Stack application development';
    const courseParts: CoursePart[] = [
        {
            name: 'Fundamentals',
            exerciseCount: 10,
            description: 'This is an awesome course part',
            kind: 'basic',
        },
        {
            name: 'Using props to pass data',
            exerciseCount: 7,
            groupProjectCount: 3,
            kind: 'group',
        },
        {
            name: 'Basics of type Narrowing',
            exerciseCount: 7,
            description: 'How to go from unknown to string',
            kind: 'basic',
        },
        {
            name: 'Deeper type usage',
            exerciseCount: 14,
            description: 'Confusing description',
            backroundMaterial:
                'https://type-level-typescript.com/template-literal-types',
            kind: 'background',
        },
        {
            name: 'TypeScript in frontend',
            exerciseCount: 10,
            description: 'a hard part',
            kind: 'basic',
        },
        {
            name: 'Backend development',
            exerciseCount: 21,
            description: 'Typing the backend',
            requirements: ['nodejs', 'jest'],
            kind: 'special',
        },
    ];

    return (
        <div>
            <Header name={courseName} />
            <Content courseParts={courseParts} />
            <Total courseParts={courseParts} />
        </div>
    );
};

export default App;
