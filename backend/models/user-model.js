const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//this schema contains all the things which we want  in the database of user

const userSchema = new Schema(
    {
        phone: { type: String, required: true },
        name: { type: String, required: false },
        avatar: {
            type: String,
            required: false,
            get: (avatar) => {
                if (avatar) {
                    return `${process.env.BASE_URL}${avatar}`;
                }
                return avatar;
            },
        },
        activated: { type: Boolean, required: false, default: false },
    },
    {
        timestamps: true,
        toJSON: { getters: true },
    }
);

module.exports = mongoose.model('User', userSchema, 'users');