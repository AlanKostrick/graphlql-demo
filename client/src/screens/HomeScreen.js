import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import React from 'react';

const HomeScreen = () => (
    <>
        <h1>Home</h1>
        <Button variant='secondary' style={{ margin: '10px' }} >
            <Link style={{ color: '#fff', textDecoration: 'none' }} to="courses/javascript">JavaScript Courses</Link>
        </Button>
        <Button variant='secondary' style={{ margin: '10px' }}>
            <Link style={{ color: '#fff', textDecoration: 'none' }} to="courses/node">Node Courses</Link>
        </Button>
        <Button variant='secondary' style={{ margin: '10px' }}>
            <Link style={{ color: '#fff', textDecoration: 'none' }} to="courses/graphql">GraphQL Courses</Link>
        </Button>
    </>
);

export default HomeScreen;