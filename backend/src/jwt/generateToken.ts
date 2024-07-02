/* eslint-disable @typescript-eslint/no-var-requires */
const jwt = require('jsonwebtoken');

const generateToken = (user: any) => {
  console.log(user, 'user jwt');
  return jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', {
    expiresIn: '24h',
  });
};
export default generateToken;
