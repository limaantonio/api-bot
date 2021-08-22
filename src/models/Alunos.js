const mongoose = require('mongoose');

const AlunosSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },

  matricula: {
    type: String,
    require: true,
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model('Alunos', AlunosSchema);