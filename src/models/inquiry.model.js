const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const inquirySchema = mongoose.Schema(
  {
    eName: {
      type: String,
      required: true,
      trim: true,
    },
    eContact: {
      type: String,
      required: true,
      trim: true,
    },
    eEmail: {
      type: String,
      required: true,
      trim: true,
    },
    eSubject: {
      type: String,
      required: true,
      trim: true,
    },
    eMessage: {
      type: String,
      required: true,
      trim: true,
    },
    eCreated: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
inquirySchema.plugin(toJSON);
inquirySchema.plugin(paginate);

/**
 * @typedef Inquiry
 */
const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
