import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import SignUp from './pages/Student/sign-up';
import ViewClearApplication from './pages/Student/viewClearedApplication';
import StudentLogin from './pages/Student/login';
import Clearance from './pages/Student/clearance';
import Pending from './pages/Adviser/pending';
import ApproverLogin from './pages/Adviser/logIn';
import AdminLogin from './pages/Admin/login';
import AdminView from './pages/Admin/view';
import Createapprover from './pages/Admin/createapprover';
import DeleteApprover from './pages/Admin/deleteapprover';
import Openapplication from './pages/Student/openapp';
import Cohomepage from './pages/Clearance/cohomepage';
import ViewApp from './pages/Student/viewApplication';
import EditApprover from './pages/Admin/editApprover';
import Search from './pages/Admin/search';
import ClearanceLogIn from './pages/Clearance/login';
import ViewAllApp from './pages/Clearance/viewAll';
import AdviserViewAll from './pages/Adviser/viewAllApp';
import Wait from './pages/Student/wait'
import SearchStud from './pages/Adviser/search'
import SearchNumber from './pages/Adviser/searchNum'

//for paths of the pages
const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/signUp', element: <SignUp /> },
  { path: '/studentLogin', element: <StudentLogin /> },
  { path: '/clearance', element: <Clearance /> },
  { path: '/viewClearApplication', element: <ViewClearApplication /> },
  { path: '/pending', element: <Pending /> },
  { path: '/approverLogIn', element: <ApproverLogin /> },
  { path: '/adminLogIn', element: <AdminLogin /> },
  {path: '/viewApplication', element: <AdminView/>},
  {path: '/create-approver', element: <Createapprover/>},
  {path: '/delete-approver', element: <DeleteApprover/>},
  {path: '/openapplication', element: <Openapplication/>},
  {path: '/cohomepage', element: <Cohomepage/>},
  {path: '/openApp', element: <ViewApp/>},
  {path: '/editApprover', element: <EditApprover/>},
  {path: '/search', element: <Search/>},
  {path: '/clearance-log-in', element: <ClearanceLogIn/>},
  {path: '/view-all-applications', element: <ViewAllApp/>},
  {path: '/view-all', element: <AdviserViewAll/>},
  {path: '/wait-adviser', element: <Wait/>},
  {path: '/search-student', element: <SearchStud/>},
  {path: '/search-student-number', element: <SearchNumber/>},
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();