const Jimp = require('jimp'); //module to compress the image
const path = require('path');
const userService = require('../services/user-service');
const UserDto = require('../dtos/user-dto');

class ActivateController {
    async activate(req, res) {
        // Activation logic
        const { name, avatar } = req.body;
        if (!name || !avatar) {
            res.status(400).json({ message: 'All fields are required!' });
        }
           //console.log(req.user);
        // Image Base64
        const buffer = Buffer.from(
            avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), // removing the first part of avatar and taking only base64 string of img
            'base64'
        );
        const imagePath = `${Date.now()}-${Math.round(
            Math.random() * 1e9  // generating random path for storing the image
        )}.png`;
        // 32478362874-3242342342343432.png

        try {
            const jimResp = await Jimp.read(buffer);  //compressing  image using jimp 
            jimResp
                .resize(150, Jimp.AUTO)
                .write(path.resolve(__dirname, `../storage/${imagePath}`)); // storing the image in storage with random name
        } catch (err) {
            res.status(500).json({ message: 'Could not process the image' });
        }

        const userId = req.user._id;
        // Update user
        try {
            const user = await userService.findUser({ _id: userId }); //finding the user in the db
            if (!user) {
                res.status(404).json({ message: 'User not found!' });
            }
            user.activated = true;
            user.name = name;
            user.avatar = `/storage/${imagePath}`;
            user.save(); //updating the user in the db
            res.json({ user: new UserDto(user), auth: true });
        } catch (err) {
            res.status(500).json({ message: 'Something went wrong!' });
        }
    }
}

module.exports = new ActivateController();
