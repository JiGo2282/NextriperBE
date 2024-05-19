const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const testimonialSchema = mongoose.Schema(
  {
    tName: {
      type: String,
      required: true,
      trim: true,
    },
    tFrom: {
      type: String,
      required: true,
      trim: true,
    },
    tMessage: {
      type: String,
      required: true,
      trim: true,
    },
    tImg: {
      type: String,
      required: true,
      trim: true,
    },
    tApproved: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
testimonialSchema.plugin(toJSON);
testimonialSchema.plugin(paginate);

/**
 * @typedef Testimonial
 */
const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
