const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';
const db = require('../../models');

async function generateAccessToken(user) {

const payload = {
    userId: user.user_id,
    name: user.name,
    email: user.email,
    role: user.role
};
const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {    // .....................
    expiresIn: '1m',
    });
    const RefreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '3m',
    });
    const userToken = await db.userToken.findOne({where:{user_id: user.user_id } });
if (userToken) userToken.destroy();
    await new db.userToken({ user_id: user.user_id, token: RefreshToken }).save();


return { accessToken:accessToken, RefreshToken:RefreshToken};
}

//this middleware function is used to authenticate incoming request  with access token
function authenticateAccessToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Access token is missing.' });
    }
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
         return res.status(403).json({ message: 'Invalid access token.' });
        }
    
        req.user = decoded;
        console.log(req.user);
        next();
    });
    }

    // Function to authorize user roles
const authorizeRole = (role) => {
    return (req, res, next) => {

     if (req.user.role === role) {

        next();
    } else {
        
        res.status(403).json({ error: 'Forbidden' });
     }
    };
};

    const verifyRefreshToken = (req,res) => {
        const RefreshToken = req.body.refreshToken;
    
        if (!RefreshToken) {
         return res.status(400).json({ message: 'Refresh token not found' });
        }
    
        // Verify the refresh token
        jwt.verify(RefreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
         if (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
         }
    
         // Generate a new access token with a 30-day expiration
         const payload = {
            userId: user.userId,
            name: user.name,
            email: user.email,
            role: user.role
        };
        console.log(payload)
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
         expiresIn: '3m',
        });    
        res.status(200).json({message: 'Access token generated susccesfully', accessToken:accessToken });
        });
    };
      


    module.exports = {generateAccessToken, authenticateAccessToken, verifyRefreshToken, authorizeRole}