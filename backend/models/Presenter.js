
import mongoose from "mongoose";

const presenterSchema = new mongoose.Schema({
  name: { 
    type: String,
     required: true, 
     trim: true 
    },
  bio: { 
    type: String,
     required: true
     },
  image: { 
    type: String, 
    required: true
   }, 
  socialLinks: {
    twitter: { type: String, default: "" },
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" }
  }
}, { timestamps: true });

const Presenter = mongoose.model('Presenter', presenterSchema)
export default Presenter
