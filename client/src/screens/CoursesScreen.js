import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

const ALL_COURSES = gql`
   query GetAllCourses{
    allCourses {
      authors {
        firstName
        lastName
      }
      description
      id
      title
      topic
    }
  }
`

const CHANGE_TOPIC = gql`
    mutation ChangeTopic($id:String!, $topic:String!){
        updateCourseTopic(
            id:$id,
            topic:$topic
        )
        {
            title
            authors {
                firstName
                lastName
            }
            description
            topic
            url
        }
    }
`


//console.log(ALL_COURSES);

const CoursesScreen = () => {
    const [show, setShow] = useState(false);
    const [courseInfo, setCourseInfo] = useState(null);
    const [updatedTopic, setUpdatedTopic] = useState(null);


    const { loading, error, data } = useQuery(ALL_COURSES);
    const [changeTopic] = useMutation(CHANGE_TOPIC, {
        refetchQueries: [
            { query: ALL_COURSES },
            'GetAllCourses'
        ]
    })

    const handleClose = () => {
        if (updatedTopic !== null) {
            changeTopic({
                variables: {
                    id: courseInfo.id,
                    topic: updatedTopic
                }
            })
        }
        setShow(false);
    }

    const handleShow = (course) => {
        setCourseInfo(course);
        setShow(true);
    }


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    //console.log(data);


    return (
        <>
            <h2>Our Courses</h2>
            {data.allCourses.map(course => (
                <div style={{ backgroundColor: '#eee', margin: '50px', padding: '20px' }} key={course.id}>
                    <h3>{course.title}</h3>
                    <h4>Authors</h4>
                    {course.authors && course.authors.map((author, index) => (
                        <div key={index}>
                            <p>{author.firstName} {author.lastName}</p>
                        </div>
                    ))}
                    <div>{course.description} </div>
                    <div>Topic: {course.topic}</div>
                    <Button variant="primary" size="sm" onClick={() => handleShow(course)}>
                        Edit
                    </Button>
                </div>
            ))}
            <Modal show={show} onHide={() => handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Course Topic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    Title
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={courseInfo && courseInfo.title} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                    Topic
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" placeholder={courseInfo && courseInfo.topic} onChange={(e) => setUpdatedTopic(e.target.value)} />
                                </Col>
                            </Form.Group>
                        </Form>
                    </>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleClose()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CoursesScreen;