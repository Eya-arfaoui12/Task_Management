const mongoose = require('mongoose');
const { type } = require('os') // 

const TaskSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
            minlength: 1,
            trim: true // Supprime les espaces inutiles
        },
        _listId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        description: {
            type: String,
            minlength: 1,
            trim: true
        },
        completed: {
            type: Boolean,
            default: false // Par défaut, une tâche n'est pas complétée
        },
        createdAt: {
            type: Date,
            default: Date.now // Date de création automatique
        }
})

const Task = mongoose.model('Task', TaskSchema); 

module.exports = { Task }