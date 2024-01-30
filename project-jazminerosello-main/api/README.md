# API Documentation

## Routes

### 

1. GET /get-subjects
Returns the complete list of subjects
Input: N/A
Ouput: Array of Subjects 

2. POST /greet-by-post
Expects a JSON object with a String field "name".
Returns a String greeting

Input: { "name": String }
Output: "Hello, <name>"

3. GET /get-subject-by-code
Expects a query parameter "code" with the Subject code
Returns a single subject of the specified code

Input: code=<Subject code>
Ouput: { "code": String, "title": String, "desc": String, "units": Number, "sem_offered": [String] }


4. POST /add-subject
Expects a JSON object containing the details of the subject. Saves this into the subjects database
Returns an object with a boolean field "success". The value of success is true if the subject was saved. Else, false.

Input: { "code": String, "title": String, "desc": String, "units": Number, "sem_offered": [String] }
Output: { "success": Boolean }


5. POST /delete-subject
Expects a JSON object containing the code of the subject. Deletes 1 subject that has the specified code if it exists. Returns an object with a boolean field "success". The value of success is true if a record was deleted. Else, false.

Input: { "code": String }
Output: { "success": Boolean }