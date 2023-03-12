import './App.css';

import { gql, useQuery } from '@apollo/client';

const ALL_COURSES = gql`
   {
    allCourses {
      authors {
        id
        firstName
        lastName
      }
      description
      id
      title
    }
  }
`

//console.log(ALL_COURSES);

function App() {

  const { loading, error, data } = useQuery(ALL_COURSES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  // console.log(data);

  return (
    <div className="App">
      <h2>Our Courses</h2>
      {data.allCourses.map(course => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          <h4>Authors</h4>
          {course.authors && course.authors.map(author => (
            <p>{author.firstName} {author.lastName}</p>
          ))}
          <div>{course.description} </div>
        </div>
      ))}
    </div>
  );
}

export default App;
