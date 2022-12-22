const jwt = require("jsonwebtoken");

let payload = {
  userName: "Narasimha Reddy",
};
let token = jwt.sign(payload, "PSA@100");
console.log(token);

//Client Token from browser local storage
let token_Client =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ik5hcmFzaW1oYSBSZWRkeSIsImlhdCI6MTYxMTMwNjkzM30.0ENkQsOYWnRbYy_luB1paWFngwtDJMhAflHDgaMok7U";
let paylod_New = jwt.verify(token_Client, "PSA@100");
console.log(paylod_New);
