const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
  },
  created: {type: Date, default: Date.now}
});

blogPostSchema.virtual('fullName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim()});

blogPostSchema.methods.apiRepr = function() {

  return {
    id: this._id,
    title: this.title,
    content: this.content,
    author: this.fullName
  };
}



const Blog = mongoose.model('Blog', blogPostSchema);
module.exports = {Blog};

