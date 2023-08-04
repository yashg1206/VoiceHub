const tokenService = require('../services/token-service');

module.exports = async function (req, res, next) {
    try {
        const { accessToken } = req.cookies; //deconstruting the access token in cookies
        if (!accessToken) {
            throw new Error();
        }
        const userData = await tokenService.verifyAccessToken(accessToken); // calling this function to decrypt the access token using the same key which was used to generate the access token
        
        if (!userData) {
            throw new Error();
        }
        req.user = userData;   // here we are adding the userID to access the userId in activatecontroller.js
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' }); // this will be catched by the axios interceptor in client side
    }
};
