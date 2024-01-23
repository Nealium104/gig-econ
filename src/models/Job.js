const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Assuming you have a User model
    },
    jobName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Job', JobSchema);