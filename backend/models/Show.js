import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true, 
    trim: true
  },
  description: { 
    type: String,
    required: true 
  },
  image: { 
    type: String,
    required: true
  },
  host: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Presenter", 
    required: true 
  },
  // ✅ NEW: Schedule type
  scheduleType: {
    type: String,
    required: true,
    enum: ['single', 'range'],
    default: 'single'
  },
  // ✅ For single day
  dayOfWeek: { 
    type: String, 
    enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    lowercase: true 
  },
  // ✅ For range (e.g., mon-fri)
  dayRangeStart: { 
    type: String, 
    enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    lowercase: true 
  },
  dayRangeEnd: { 
    type: String, 
    enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    lowercase: true 
  },
  startTime: { 
    type: String,
    required: true, 
    trim: true 
  },
  endTime: { 
    type: String,
    required: true, 
    trim: true 
  }
}, { timestamps: true });

const Show = mongoose.model('Show', showSchema)
export default Show