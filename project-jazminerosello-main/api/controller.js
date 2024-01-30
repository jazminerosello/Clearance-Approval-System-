import mongoose from 'mongoose';
import session from 'express-session';

await mongoose.connect('mongodb://127.0.0.1:27017/Project')
const Remark = {
	remark: String,
	date: Date,
	commenter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	stepgiven: Number,
	cocommenter: String,
}
const StudentSubmission = {
	remarklink: String,
	date: Date,
	stepgiven: Number
}
const Application = mongoose.model('Application', {
	student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
	status: String,
	step: Number,
	remarks: [Remark],
	studentsubmission: [StudentSubmission],
});
const User = mongoose.model('User', {
	accepted: Number,
	firstName: String,
	middleName: String,
	lastName: String,
	studentNumber: Number,
	userType: String,
	upMail: String,
	password: String,
	application: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
  adviser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});



const checkIfStudentHasAdviser = async (req,res)=>{
	const studentupmail = req.query.upMail;
	const user = await User.findOne({ upMail: studentupmail });
	if (!user) {
	  return res.status(404).json({ error: 'User not found' });
	}
	if (user.adviser==null){
		res.send({success: false})
	} else {
		res.send({success: true})
	}
}
const addSubmission = async (req, res) => {
	const { studentsubmission1, id } = req.body;
  
	const appli = await Application.findOne({ _id: id });
	if (!appli) {
	  return res.status(404).json({ error: 'Application not found' });
	}
  
	try {
	  appli.studentsubmission.push(studentsubmission1); // Spread the studentsubmission array elements
	  await appli.save();
  
	  res.json({ success: true, message: 'Submission added successfully' });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ success: false, message: 'Failed to save submission' });
	}
  };
  
const addApplication = async (req, res) => {
	const { status, step, remarks, studentsubmission, upMail } = req.body;
	const userEmail = upMail;
  
	const user = await User.findOne({ upMail: userEmail });
	if (!user) {
	  return res.status(404).json({ error: 'User not found' });
	}
  
	const newApplication = new Application({
	  student: user._id, // Set the student field to the user's ID
	  status,
	  step,
	  remarks,
	  studentsubmission: [studentsubmission]
	});
  
	try {
	  const savedApplication = await newApplication.save();
	  user.application.push(savedApplication._id); // Add the application to the user's application array
	  await user.save();
  
	  const adviser = await User.findOneAndUpdate(
		{ _id: user.adviser },
		{ $push: { application: savedApplication._id } }
	  );
  
	  if (adviser) {
		res.json({ success: true, message: userEmail, id: savedApplication._id });
	  } else {
		res.json({ success: false, message: 'Failed to update adviser application' });
	  }

	} catch (error) {
	  console.error(error);
	  res.status(500).json({ success: false, message: 'Failed to save application' });
	}
  };

  const addReturnRemark = async (req, res) => {
	const {applicationid, remarkgivenstring, stepgiven, date, commenterid } = req.body;
	const applicationfound = await Application.findOne({_id: applicationid});
	if (!applicationfound) {//eme lang to actually no need na to dapat, pati sa commenter try catch
		return res.status(404).json({ error: applicationid });
	  }
	const commenterfound = await User.findOne({upMail: commenterid});
	if (!commenterfound) {
		
		const remarkObject = {
			remark: remarkgivenstring,
			date: date,
			cocommenter: commenterid,
			stepgiven, stepgiven
		}
		try {
			applicationfound.remarks.push(remarkObject);
			const savedapplication = await applicationfound.save();
	
			if (savedapplication){
				res.json({ success: true });
			} else {
				res.json({ success: false, message: 'Failed to add return remark' });
		  
			}
		}catch (error) {
			console.error(error);
			res.status(500).json({ success: false, message: 'there was an error' });
		  }
	  
	  } else {
		const remarkObject = {
			remark: remarkgivenstring,
			date: date,
			commenter: commenterfound._id,
			stepgiven, stepgiven
		}
		try {
			applicationfound.remarks.push(remarkObject);
			const savedapplication = await applicationfound.save();
	
			if (savedapplication){
				res.json({ success: true });
			} else {
				res.json({ success: false, message: 'Failed to add return remark' });
		  
			}
		}catch (error) {
			console.error(error);
			res.status(500).json({ success: false, message: 'there was an error' });
		  }
	  }
  };
  

  
  
const getStudents = async (req, res) => {
	const users = await User.find({userType: "Student", accepted: 0});
	res.send(users)
}
const getApprovers = async (req, res) => {
	const users = await User.find({userType: "Adviser"});
	res.send(users)
}


const getApproversAlphabetical = async (req, res) => {
	const users = await User.find({userType: "Adviser"}).sort({firstName:1});
	res.send(users)
}
const getApproversAlphabeticalDescending = async (req, res) => {
	const users = await User.find({userType: "Adviser"}).sort({firstName:-1});
	res.send(users)
}

const getStudentNumber = async (req, res) => {
	const users = await User.find({accepted: 0, userType: "Student"}).sort({studentNumber:1});
	res.send(users)
} 

const getStudentName= async (req, res) => {
	const users = await User.find({accepted: 0, userType: "Student"}).sort({lastName:1});
	res.send(users)
} 

const getOneApprover = async(req, res) => {
	const app = await User.findOne({userType: "Adviser", upMail: req.query.upMail})
	res.send(app)
}

const getApplicationsAdviser = async (req, res) => {
	try {
	  const { upMail } = req.body;
	  const user = await User.findOne({ upMail }).populate({
		path: 'application',
		match: {
		  step: 1,
		  status: { $ne: 'Closed' }, // Add the $ne operator to exclude closed applications
		},
		populate: {
		  path: 'student',
		  select: '-password',
		  model: 'User',
		},
		model: 'Application',
	  }).exec();
  
	  if (!user) {
		return res.status(404).json({ error: 'User not found' });
	  }
  
	  const applications = user.application.map((application) => {
		const { student, ...rest } = application.toObject();
		return { ...rest, student };
	  });
  
	  //console.log(applications);
  
	  res.json({ applications });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'An error occurred' });
	}
  };

  
  const getApplication = async (req, res) => {
	try {
		const { upMail } = req.body;
	  const user = await User.findOne({ upMail }).populate({
		path: 'application',
		populate: {
			path: 'remarks',
		},
		  model: 'Application',
	  }).exec();
	  if (!user) {
		return res.status(404).json({ error: 'User not found' });
	  }
	  const applications = user.application.map((application) => {
		const { student, ...rest } = application.toObject();
		return { ...rest, student };
	  });
	  //console.log(applications);
	  res.json({ applications });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'An error occurred' });
	}
  };

  

  const getApplicationofAllStudentsPerAdviser = async (req, res) => {
	const { upMail } = req.body;
	try {
	  const user = await User.findOne({ upMail }).populate({
		path: 'application',
		populate: {
			path: 'remarks',
		},
		  model: 'Application',
	  }).populate({
		path: 'application',
		populate: {
		  path: 'student',
		  model: 'User',
		},
	  }).exec();

	  if (!user) {
		return res.status(404).json({ error: 'User not found' });
	  }
	  const applications = user.application.map((application) => {
		const { student, ...rest } = application.toObject();
		return { ...rest, student };
	  });

	  //console.log(applications);

	  res.json({ applications });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'An error occurred' });
	}
  };

  const getPendingApplicationofAllStudentsPerAdviser = async (req, res) => {
	const { upMail } = req.body;
	try {
	  const user = await User.findOne({ upMail }).populate({
		path: 'application',
		match: {
			step: 2,
			status: { $ne: 'Closed' }, // Add the $ne operator to exclude closed applications
		  },
		populate: {
			path: 'remarks',
		},
		  model: 'Application',
	  }).populate({
		path: 'application',
		populate: {
		  path: 'student',
		  model: 'User',
		},
	  }).exec();


	  if (!user) {
		return res.status(404).json({ error: 'User not found' });
	  }
	  const applications = user.application.map((application) => {
		const { student, ...rest } = application.toObject();
		return { ...rest, student };
	  });

	  //console.log(applications);

	  res.json({ applications });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'An error occurred' });
	}
  };

  const getAllApplication = async (req, res) => {
	try {
		

		const applications = await Application.find().populate({
			path: 'student',
			select: 'firstName lastName studentNumber upMail',
		  });
		res.json(applications)
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'An error occurred' });
	}
  };
  
  const adviserApproves = async (req, res) => {
	
	try {
		const user = await Application.findOneAndUpdate({_id: req.body.id}, {status:"Pending", step:2});
		res.json(user);
	  } catch (error) {
		console.log('Error:', error);
		res.status(500).json({ message: 'Error closing the application' });
	  }
}

const coApproves = async (req, res) => {
	
	try {
		const user = await Application.findOneAndUpdate({_id: req.body._id}, {status:"Cleared", step:3});
		res.json(user);
	  } catch (error) {
		console.log('Error:', error);
		res.status(500).json({ message: 'Error closing the application' });
	  }
}
  
  
const logInCredentials = async (req, res) => {
	const user = await User.findOne({upMail: req.query.upMail, password: req.query.password, userType: req.query.userType });
	if (!user) {
		
		res.send(null); 
	} else {
		req.session.email = req.query.upMail;
		req.session.save(() => {
			res.send({user, message: req.session.email})
		  });
	  }
}
const getpendingapplicationsco = async (req, res) => {
	const user = await Application.find({ step: 2, status: { $ne: "Closed" } })
	  .populate('student', 'firstName')
	  .exec();
	res.send(user);
  };
  
  
const closeApplication = async (req, res) => {
	const { id } = req.body; // Extract the id from the request body
	try {
	  const updated = await Application.findOneAndUpdate(
		{ _id: id }, // Use the correct field to match the document (_id in this example)
		{ status: "Closed" },
		// { new: true } // Set the `new` option to true to get the updated document
	  );
	  res.json(updated);
	} catch (error) {
	  console.log('Error:', error);
	  res.status(500).json({ message: 'Error closing the application' });
	}
  };
  const updateStudentAdviser = async (req, res) => {
	try {
	  const foundadviser = await User.findOne({ upMail: req.body.adviserupmail });
	  if (!foundadviser) {
		return res.status(404).json({ error: 'Adviser not found' });
	  }

	  const updated = await User.findOneAndUpdate(
		{ studentNumber: req.body.studentNumber },
		{ adviser: foundadviser._id, accepted: 1 },
		{ new: true }
	  );

	  if (updated) {
		// Adviser updated successfully
		const { adviser } = updated;
		res.json({ message: 'Adviser updated successfully', adviser });
	  } else {
		// Student not found
		res.status(404).json({ error: 'Student not found' });
	  }
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'An error occurred' });
	}
  };



//SIGN UP
const signUpCredentials = async (req, res) => {
	const user = await User.findOne({ upMail: req.query.upMail});
	if (user) {
		res.send(user)
	} else {
		res.send(null)
	  }
}

const deleteStudent = async (req, res) => {
	const { studentNumber } = req.body

	const result = await User.deleteOne({ studentNumber })

	if (result.deletedCount == 1) {
		res.send({ success: true })
	} else { 
		res.send({ success: false })
	}
	
}
const checkifReturnedByCo = async (req, res) => {
	const studentupmail = req.query.upMail;
	const user = await User.findOne({ upMail: studentupmail });
	if (!user) {
	  return res.status(404).json({ error: 'User not found' });
	}
	if (user.adviser==null){
		res.send({success: false})
	} else {
		res.send({success: true})
	}
}
const deleteApprover = async (req, res) => {
	const { upMail } = req.body

	const result = await User.deleteOne({ upMail })

	if (result.deletedCount == 1) {
		res.send({ success: true })
	} else { 
		res.send({ success: false })
	}
	
}
const editApprover = async (req, res) => {

	const doc = await User.findOneAndUpdate({ upMail: req.body.upMail }, { firstName: req.body.firstName, middleName: req.body.middleName, lastName: req.body.lastName, password: req.body.password });
	res.send({ edited: true });

}

const getApprover = async (req, res) => {
	const approver = await User.find({ lastName: req.query.lastName, userType: "Adviser" })
	
	if (!approver) {
		res.send(null); 
	} else {
		res.send(approver)
	  }
}

//
const getStudentbyName = async (req, res) => {
	//console.log( req.query.lastName)
	//console.log( req.query.adviser)
	const student = await User.find({ lastName: req.query.lastName, userType: "Student", adviser: req.query.adviser})
	
	if (!student) {
		res.send(null); 
	} else {
		res.send(student)
	  } 

}

const getStudentbyNumber = async (req, res) => {
	//console.log( req.query.lastName)
	//console.log( req.query.adviser)
	const student = await User.find({ studentNumber: req.query.studentNumber, userType: "Student", adviser: req.query.adviser})
	
	if (!student) {
		res.send(null); 
	} else {
		res.send(student)
	  } 

}

const getApproversOne = async (req, res) => {
	const adviser = await User.findOne({upMail: req.query.upMail, userType: "Adviser"});
	if (!adviser) {
		res.send(null); 
	} else {
		res.send(adviser._id)
	  }
}

const getStudentbyStudnum = async (req, res) => {
	const student = await User.find({ studentNumber: req.query.studentNumber, userType: "Student"})
	
	if (!student) {
		res.send(null); 
	} else {
		res.send(student)
	  }
}

const greetByPOST = async (req, res) => {
	//console.log(req.body.name)
	
	const greeting = "Hello, " + req.body.name;
	res.send(greeting)
}

// save new subject
const addUser = async (req, res) => {
	const { firstName, middleName, lastName, studentNumber, userType, upMail, password, application, adviser, accepted } = req.body

	const newUser = new User({ firstName, middleName, lastName, studentNumber, userType, upMail, password, application, adviser, accepted })

	const result = await newUser.save()

	if (result._id) {
		// req.session.email = upMail;
		res.send({ success: true })
	} else {
		res.send({ success: false })
	}
}

const getAdviser = async (req, res) => {
	try {
		const a = await User.findOne({upMail: req.query.upMail}).populate({
			path: 'adviser',
			select: 'firstName lastName studentNumber upMail',
		  });
		console.log(a)
		res.json(a)
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'An error occurred' });
	}
}

const getAdviserbyId = async(req, res) => {
    const adviser = await User.findOne({userType: "Adviser", _id: req.query.id})
    if (!adviser) {
        res.send(null); 
    } else {
        res.send(adviser)
      }
}

const getStudentbyEmail = async(req, res) => {
    const student = await User.findOne({userType: "Student", upMail: req.query.upMail})
    res.send(student)
}

const getAdviserbyEmail = async(req, res) => {
    const adviser = await User.findOne({userType: "Adviser", upMail: req.query.upMail})
    res.send(adviser)
}

export { getAdviserbyEmail, getStudentbyEmail, getAdviserbyId, getAdviser, addSubmission,getApproversOne, getStudentbyNumber, getStudentbyStudnum,checkIfStudentHasAdviser, getStudentbyName, getPendingApplicationofAllStudentsPerAdviser, getApplicationofAllStudentsPerAdviser, getAllApplication, getApplication, addReturnRemark, coApproves, getOneApprover, getpendingapplicationsco, adviserApproves, getApplicationsAdviser, closeApplication, addApplication, getApproversAlphabeticalDescending, getApproversAlphabetical, getApprover, editApprover, deleteApprover, getApprovers, getStudents, deleteStudent, greetByPOST, logInCredentials, signUpCredentials, addUser, updateStudentAdviser, getStudentNumber, getStudentName};

