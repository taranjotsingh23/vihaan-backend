const { number } = require('@hapi/joi');
const mongoose=require('mongoose');

const selfAssessmentSchema= new mongoose.Schema({
    userId: {
        type: String,
        default: "Null"
    },
    symptom: {
        type: String,
        required: true
    },
    live: {
        type: String,
        required: true
    },
    exercise: {
        type: String,
        required: true
    },
    smoke: {
        type: String,
        required: true
    },
    scale: {
        type: Number,
        default: 0
    }
});

module.exports=mongoose.model('SelfAssessment',selfAssessmentSchema);