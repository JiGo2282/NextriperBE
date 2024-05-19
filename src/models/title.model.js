const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const titleSchema = mongoose.Schema(
  {
    tName: {
      type: String,
      required: true,
      trim: true,
    },
    tTitle: {
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
titleSchema.plugin(toJSON);
titleSchema.plugin(paginate);

/**
 * @typedef Title
 */
const Title = mongoose.model('Title', titleSchema);

module.exports = Title;
