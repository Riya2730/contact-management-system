const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET all contacts
router.get('/', async (req, res) => {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
});

// POST a new contact
router.post('/', async (req, res) => {
    const contact = new Contact(req.body);
    await contact.save();
    res.json(contact);
});

// PUT update contact
router.put('/:id', async (req, res) => {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

// DELETE a contact
router.delete('/:id', async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

module.exports = router;