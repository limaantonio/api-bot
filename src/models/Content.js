const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema ({
    title: {
        type: String,
        
    },

    subject: {
        type: String
    },

    data: {
        type: String
    }, 

    createdAt: {
        type: Date,
        default: Date.now()
      },
})

module.exports = mongoose.model('Content', ContentSchema);