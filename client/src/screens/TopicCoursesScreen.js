import { gql, useQuery } from '@apollo/client';

import React from 'react';
import { useParams } from 'react-router-dom';

const COURSES_BY_TOPIC = gql`
    query GetAllCoursesByTopic($topic: String!) {
        coursesByTopic(topic: $topic) {
            authors {
                firstName
                lastName
            }
            description
            id
            title
            topic
            url
        }
    }
`

const TopicCoursesScreen = () => {
    const topic = useParams().topic;

    const { loading, error, data } = useQuery(COURSES_BY_TOPIC, {
        fetchPolicy: "no-cache",
        variables: { topic },
    });

    if (loading) return null;
    if (error) return `Error! ${error}`;

    //console.log(data);

    return (
        <>
            <h2>Our {topic} based courses</h2>
            {
                data.coursesByTopic.map(course => (
                    <div style={{ backgroundColor: '#eee', margin: '50px', padding: '20px' }} key={course.id}>
                        <h3>{course.title}</h3>
                        <h4>Authors</h4>
                        {course.authors && course.authors.map((author, index) => (
                            <div key={index}>
                                <p>{author.firstName} {author.lastName}</p>
                            </div>
                        ))}
                        <div>{course.description} </div>
                    </div>
                ))
            }
        </>
    );
}

export default TopicCoursesScreen;