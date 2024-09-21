const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the blog post
const blogSchema = new Schema({
  title: {
    type: String,
    required: true, // Title is required
    trim: true, // Remove whitespace from the start and end
  },
  image: {
    type: String,
    required: true, // Image URL is required
    trim: true
  },
  description: {
    type: String,
    required: true, // Description is required
    trim: true,// Maximum length of the description
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create and export the model
module.exports = mongoose.model('Blog', blogSchema);

