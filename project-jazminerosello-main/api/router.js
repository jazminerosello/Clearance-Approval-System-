

                                                                                              

import {getStudentbyEmail, getAdviserbyEmail, getAdviserbyId,  getAdviser, addSubmission, getStudentbyNumber,getApproversOne,getStudentbyStudnum,checkIfStudentHasAdviser, getStudentbyName,getStudentNumber, getStudentName ,getPendingApplicationofAllStudentsPerAdviser, getApplicationofAllStudentsPerAdviser, getAllApplication, addReturnRemark, getApplication, closeApplication, getOneApprover, getApproversAlphabetical, getApprover, editApprover, deleteApprover, getApprovers, getStudents, greetByPOST, logInCredentials, signUpCredentials, deleteStudent, addUser, updateStudentAdviser, getApproversAlphabeticalDescending, addApplication, getApplicationsAdviser, adviserApproves, getpendingapplicationsco, coApproves  } from './controller.js';


import cors from 'cors';
import session from 'express-session';
// import MongoDBStore from 'connect-mongodb-session';
import MongoDBStore from 'connect-mongodb-session';
const MongoDBStoreSession = MongoDBStore(session);


export default function router(app) {

  const store = new MongoDBStoreSession({
    uri: 'mongodb://127.0.0.1:27017/session-store', // Replace with your MongoDB connection URI
    collection: 'sessions', // Name of the collection to store sessions
  });
  // Set up session middleware
  app.use(session({
    secret: 'fuku', // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
    store: store,
    
  }));
  
  app.use(cors());

	// Allow Cross Origin Resource Sharing
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
  })
  
  app.get("/get-students", getStudents);
  app.get("/get-approvers", getApprovers);
  //
  app.get("/get-approversOne", getApproversOne);
  app.get("/get-approvers-alphabetical", getApproversAlphabetical);
  app.get("/get-approvers-alphabetical-descending", getApproversAlphabeticalDescending);
  app.get('/check-if-student-has-adviser', checkIfStudentHasAdviser)
  app.get("/getAllApplication", getAllApplication);
  app.get("/check-credentials-for-log-in", logInCredentials);
  app.get("/check-credentials-for-sign-up", signUpCredentials);
  app.get("/approver", getOneApprover);
  app.get("/search", getApprover)
  app.get("/search-student", getStudentbyName)
  app.get("/search-student-number", getStudentbyNumber)
  app.get("/search-student-number", getStudentbyStudnum)
  app.get("/get-student-num-asc", getStudentNumber);
  app.get("/get-student-name-asc", getStudentName);
  app.get("/get-adviser", getAdviser);
  app.get("/search-student-email", getStudentbyEmail)
  app.get("/search-adviser-email", getAdviserbyEmail)
  app.get("/search-adviser-id", getAdviserbyId)

  app.post("/greet-by-post", greetByPOST);
  app.post("/add-user", addUser);
  app.post("/assign-adviser-to-student", updateStudentAdviser)
  app.post("/delete-student-account", deleteStudent)
  app.post("/delete-approver", deleteApprover)
  app.post("/edit-approver", editApprover)
  app.post("/add-application", addApplication)
  app.post("/close-application", closeApplication)
  app.post("/get-applications-adviser", getApplicationsAdviser)
  app.post("/adviser-approves", adviserApproves)
  app.get("/get-pending-applications-co", getpendingapplicationsco)
  app.post("/co-approves", coApproves)
  app.post("/getStudentApplication", getApplication)
  app.post("/add-return-remark", addReturnRemark);
  app.post('/application-per-adviser', getApplicationofAllStudentsPerAdviser)
  app.post('/pending-application-per-adviser', getPendingApplicationofAllStudentsPerAdviser)
  app.post('/add-submission', addSubmission);

  
  app.get('/get-session-email', (req, res) => {
    if (req.session.email) {
      console.log(req.session.email);
      res.send(req.session.email);
    } else {
      res.status(401).send('Email not found in session');
    }
  });
  app.get('/get-session', (req, res) => {
    // req.session.reload();
    if (req.session.id) {
      console.log(req.session.id);
      res.send(req.session.id);
    } else {
      res.status(401).send('not found session');
    }
    
  });
  app.get('/get-session-cookie', (req, res) => {
    if (req.session.cookie) {
      console.log(req.session.cookie);
      res.send(req.session.cookie);
    } else {
      res.status(401).send('cookie not found in session');
    }
  });
}