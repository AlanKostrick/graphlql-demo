import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import CoursesScreen from './screens/CoursesScreen';
import HomeScreen from './screens/HomeScreen';
import Layout from './screens/Layout';
import TopicCoursesScreen from './screens/TopicCoursesScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomeScreen />
      },
      {
        path: 'courses',
        children: [
          {
            index: true,
            element: <CoursesScreen />
          },
          {
            path: ':topic',
            element: <TopicCoursesScreen />
          }
        ]
      }
    ]
  }
])

const App = () => (
  <div style={{ textAlign: 'center' }}>
    <RouterProvider router={router} />
  </div>
);

export default App;
