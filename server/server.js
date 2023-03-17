var express = require('express');
var express_graphql = require('express-graphql').graphqlHTTP;
var { buildSchema } = require('graphql');
const cors = require('cors');
var coursesData = require('./coursesData.json');
const { v4: generateId } = require('uuid');

// GraphQL schema
var schema = buildSchema(`
    input AuthorInput {
        firstName: String, 
        lastName: String
    }
    type Query {
        course(id: String!): Course
        coursesByTopic(topic: String): [Course]
        allCourses: [Course]
    },
    type Mutation {
        updateCourseTopic(id: String!, topic: String!): Course
        addCourse(title: String, authors: [AuthorInput], description: String, topic: String, url: String): Course
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

var getCourse = function (args) {
    var id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
}
var getCoursesByTopic = function (args) {
    if (args.topic) {
        var topic = args.topic;
        return coursesData.filter(course => course.topic === topic);
    } else {
        return coursesData;
    }
}
var getAllCourses = function () {
    return coursesData;
}
var updateCourseTopic = function ({ id, topic }) {
    coursesData.map(course => {
        if (course.id === id) {
            course.topic = topic;
            return course;
        }
    });
    return coursesData.filter(course => course.id === id)[0];
}

var addCourse = function ({ title, authors, description, topic, url }) {

    let foundCourse = null;

    foundCourse = coursesData.find(course => course.title === title);

    if (!foundCourse) {
        var course = {
            id: generateId(),
            title: title,
            authors: authors,
            description: description,
            topic: topic,
            url: url
        }
        coursesData.push(course);
        return course;
    } else {
        return foundCourse;
    }
}

var root = {
    course: getCourse,
    coursesByTopic: getCoursesByTopic,
    allCourses: getAllCourses,
    updateCourseTopic: updateCourseTopic,
    addCourse: addCourse
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use(cors());
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));