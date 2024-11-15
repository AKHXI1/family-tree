const express = require('express');
const FamilyMember = require('../models/FamilyMember');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Add Family Member
router.post('/add', authMiddleware, async (req, res) => {
    const { name, relation, parentId } = req.body;
    const userId = req.userId; // Get the userId from the auth middleware
    try {
        const familyMember = new FamilyMember({ userId, name, relation, parentId });
        await familyMember.save();
        res.json(familyMember);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Family Members
router.get('/', authMiddleware, async (req, res) => {
    try {
        const family = await FamilyMember.find({ userId: req.userId }).populate('parentId');
        res.json(family);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
