const mongoose = require('mongoose');

const Video = mongoose.model('Video',{
    title:{
        required: true,
        type: String,
        trim: true
    },
    description:{
        type: String,
        trim: true
    },
    datetime:{
        type: String,
        required: true,
        trim: true
    },
    defaulturl1:{
        type: String,
        required: true,
        trim: true
    },
    defaulturl2:{
        type: String,
        required: true,
        trim: true
    },
    defaulturl3:{
        type: String,
        required: true,
        trim: true
    }
});

module.exports = Video;