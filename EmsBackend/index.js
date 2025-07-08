const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/events');
const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/user');
const BookingRoutes = require('./routes/booking');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.log('❌ DB error:', err));

// API routes

app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/admin', require('./routes/admin'));
app.use('/api/users', userRoutes);
app.use('/api/bookings', BookingRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
