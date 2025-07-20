const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const contactRoutes = require('./routes/contactRoutes');
app.use('/api/contacts', contactRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected...');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})
.catch(err => console.error(err));