const mongoose = require('mongoose');

const FamilyMemberSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    relation: { type: String, required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'FamilyMember', default: null },
});

module.exports = mongoose.model('FamilyMember', FamilyMemberSchema);
