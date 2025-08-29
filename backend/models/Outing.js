const mongoose = require('mongoose');
const OutingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    outingType: { type: String, enum: ['Local', 'Non-Local'], required: true },
    outTime: { type: Date, default: Date.now },
    inTime: { type: Date },
    status: { type: String, enum: ['Active', 'Completed'], default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('Outing', OutingSchema);