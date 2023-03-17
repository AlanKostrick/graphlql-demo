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

const ADD_COURSE = gql`
    mutation AddCourse($title:String, $authors:[AuthorInput], $description:String, $topic:String, $url:String){
        addCourse(title:$title, authors:$authors, description:$description, topic:$topic, url:$url){
        title
        authors{
            firstName
            lastName
        }
        description
        topic
        url
        id
        }
    }
`


//console.log(ALL_COURSES);

const CoursesScreen = () => {
    const [show, setShow] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [courseInfo, setCourseInfo] = useState(null);
    const [updatedTopic, setUpdatedTopic] = useState(null);
    const [newCourseTitle, setNewCourseTitle] = useState(null);
    const [newCourseAuthorFirstName, setNewCourseAuthorFirstName] = useState(null);
    const [newCourseAuthorLastName, setNewCourseAuthorLastName] = useState(null);
    const [newCourseDescription, setNewCourseDescription] = useState(null);
    const [newCourseTopic, setNewCourseTopic] = useState(null);
    const [newCourseUrl, setNewCourseUrl] = useState(null);


    const { loading, error, data } = useQuery(ALL_COURSES);

    const [changeTopic] = useMutation(CHANGE_TOPIC, {
        refetchQueries: [
            { query: ALL_COURSES },
            'GetAllCourses'
        ]
    });

    const [addCourse] = useMutation(ADD_COURSE, {
        refetchQueries: [
            { query: ALL_COURSES },
            'GetAllCourses'
        ]
    });

    const handleClose = () => {
        if (updatedTopic !== null) {
            changeTopic({
                variables: {
                    id: courseInfo.id,
                    topic: updatedTopic
                }
            });
        }
        setShow(false);
    }

    const handleShow = (course) => {
        setCourseInfo(course);
        setShow(true);
    }

    const handleSaveCourse = () => {
        addCourse({
            variables: {
                title: newCourseTitle,
                authors: {
                    firstName: newCourseAuthorFirstName,
                    lastName: newCourseAuthorLastName
                },
                description: newCourseDescription,
                topic: newCourseTopic,
                url: newCourseUrl
            }
        });
        setShowAddModal(false);
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
                    <Modal.Title>Edit topic</Modal.Title>
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
            <Button onClick={() => setShowAddModal(true)}>Add a course</Button>
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextTitle">
                                <Form.Label column sm="2">
                                    Title
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" placeholder='Enter a title' onChange={(e) => setNewCourseTitle(e.target.value)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextFirstName">
                                <Form.Label column sm="2">
                                    Author
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" placeholder='Enter author first name' onChange={(e) => setNewCourseAuthorFirstName(e.target.value)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextLastName">
                                <Form.Label column sm="2">
                                    Author
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" placeholder='Enter author last naame' onChange={(e) => setNewCourseAuthorLastName(e.target.value)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextDescription">
                                <Form.Label column sm="2">
                                    Description
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" placeholder='Enter course description' onChange={(e) => setNewCourseDescription(e.target.value)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextTopic">
                                <Form.Label column sm="2">
                                    Topic
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" placeholder='Enter course topic' onChange={(e) => setNewCourseTopic(e.target.value)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextUrl">
                                <Form.Label column sm="2">
                                    Url
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" placeholder='Enter course url' onChange={(e) => setNewCourseUrl(e.target.value)} />
                                </Col>
                            </Form.Group>
                        </Form>
                    </>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveCourse()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CoursesScreen;