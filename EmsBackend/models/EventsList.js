const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventsSchema = new Schema(
    {
        name: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        image: { type: String },
        date: { type: String, required: true },
        time: { type: String, required: true },
        content: { type: String, required: true },
        location: { type: String, required: true },
    },
    { timestamps: true }
);

const Events = mongoose.model('Events', eventsSchema);
module.exports = Events;
