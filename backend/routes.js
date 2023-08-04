const router = require('express').Router();
const authController = require('./controllers/auth-controller');
const activateController = require('./controllers/activate-controller');
const authMiddleware = require('./middlewares/auth-middleware');
const roomsController = require('./controllers/rooms-controller');


router.post('/api/send-otp', authController.sendOtp);
router.post('/api/verify-otp', authController.verifyOtp);
router.post('/api/activate', authMiddleware, activateController.activate); // this middleware runs to check the access token coming from user to check wheather it expires or not
router.get('/api/refresh', authController.refresh); //this is the refresh route which we create to refresh the access token
router.post('/api/logout', authMiddleware, authController.logout);  //this is called when we are  calling logout function
router.post('/api/rooms', authMiddleware, roomsController.create);  // this is called when we are  asking to create the room
router.get('/api/rooms', authMiddleware, roomsController.index);
router.get('/api/rooms/:roomId', authMiddleware, roomsController.show);
// router.get('/api/test', (req, res) => res.json({ msg: 'OK' }));

module.exports = router;
