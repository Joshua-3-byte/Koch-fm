import mongoose from "mongoose";

const newsSchema =  new mongoose.Schema({
image: {
  type: String,
  required: true
},
title: {
  type: String,
  required: true,
  trim: true
},
tag: {
  type: String,
  required: true,
  enum: ['politics', 'sports', 'business', 'technology', 'world'],
  lowercase: true,
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
isBreaking: {
  type: Boolean,
  default: false
}
},{timestamps: true})

const News = mongoose.model('News', newsSchema)
export default News