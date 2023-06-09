const express = require('express');
const express_graphql = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const cors = require('cors');
const coursesData = require('./coursesData.json');

// GraphQL schema
const schema = buildSchema(`
    type Query {
        course(id: String!): Course
        coursesByTopic(topic: String): [Course]
        allCourses: [Course]
    },
    type Mutation {
        updateCourseTopic(id: String!, topic: String!): Course
    },
    type Author {
        firstName: String 
        lastName: String
    }
    type Course {
        id: String
        title: String
        authors: [Author]
        description: String
        topic: String
        url: String
    }
`);

//Resolver functions are responsible for data population
function getCourse(args) {
    const id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
}
function getCoursesByTopic(args) {
    if (args.topic) {
        const topic = args.topic;
        return coursesData.filter(course => course.topic === topic);
    } else {
        return coursesData;
    }
}
function getAllCourses() {
    return coursesData;
}
function updateCourseTopic(args) {
    coursesData.map(course => {
        if (course.id === args.id) {
            course.topic = args.topic;
            return course;
        }
    });
    return coursesData.find(course => course.id === args.id);
}

const root = {
    course: getCourse,
    coursesByTopic: getCoursesByTopic,
    allCourses: getAllCourses,
    updateCourseTopic: updateCourseTopic
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use(cors());
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));