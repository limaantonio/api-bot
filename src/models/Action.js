const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    require: true,
  },

  context: {
    type: String,
    require: true,
  },

  classCompletionDate: {
    type: Date,
    require: false,
  },

  numberDays: {
    type: Number,
    require: false,
  },

  quiz: {
    type: String,
    require: false,
  },
  
  homeWork: {
    type: String,
    require: false,
  },

  class: {
    type: String,
    require: false,
  },

  dateClass: {
    type: Date,
    require: false,
  },

  group: {
    type: String,
    require: false,
  },

  passingScore: {
    type: String,
    require: false,
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model('Action', ActionSchema);