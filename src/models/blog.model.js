const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const blogSchema = mongoose.Schema(
  {
    blogName: {
      type: String,
      required: true,
      trim: true,
    },
    blogImage: {
      type: String,
      required: true,
      trim: true,
    },
    blogDescription: {
      type: String,
      required: true,
      trim: true,
    },
    blogBy: {
      type: String,
      required: true,
      trim: true,
    },
    blogCreateDate: {
      type: Date,
      required: true,
    },
    blogCategories: {
      type: String,
      required: true,
      trim: true,
    },
    blogIsPopular: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
blogSchema.plugin(toJSON);
blogSchema.plugin(paginate);

/**
 * @typedef Blog
 */
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
