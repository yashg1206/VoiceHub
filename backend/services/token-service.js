const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
const refreshModel = require('../models/refresh-model');
class TokenService {
    generateTokens(payload) {     // here we are generating tokens
        const accessToken = jwt.sign(payload, accessTokenSecret, {
            expiresIn: '1m',
        });
        const refreshToken = jwt.sign(payload, refreshTokenSecret, {
            expiresIn: '1y',
        });
        return { accessToken, refreshToken };
    }

    async storeRefreshToken(token, userId) {   // storing the refresh token in the data base
        try {
            await refreshModel.create({
                token,
                userId,
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    async verifyAccessToken(token) {   //verifying the access token
        return jwt.verify(token, accessTokenSecret);
    }
    async verifyRefreshToken(refreshToken) {   //verifying the refresh token recived from the cookie if it is valid dor not
        return jwt.verify(refreshToken, refreshTokenSecret);
    }

    async findRefreshToken(userId, refreshToken) {  //finding the  refresh token which is stored in the data base
        return await refreshModel.findOne({
            userId: userId,
            token: refreshToken,
        });
    }

    async updateRefreshToken(userId, refreshToken) {  //upadting the newly generated refresh token in the db
        return await refreshModel.updateOne(    //method to update it in the db
            { userId: userId },
            { token: refreshToken }
        );
    }

    async removeToken(refreshToken) {    //  removing refresh token from the database
        return await refreshModel.deleteOne({ token: refreshToken });
    }
}

module.exports = new TokenService();
