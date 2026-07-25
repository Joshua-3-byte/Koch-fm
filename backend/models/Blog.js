import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  title: { 
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema)
export default Blog