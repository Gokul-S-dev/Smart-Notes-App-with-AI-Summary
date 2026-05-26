const jwt = require('jsonwebtoken');

const token = process.argv[2];
if(!token){
  console.error('Usage: node decodeToken.cjs <token>');
  process.exit(1);
}

const decoded = jwt.decode(token, {complete: false});
console.log(JSON.stringify(decoded, null, 2));
