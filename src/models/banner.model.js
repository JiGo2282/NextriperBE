const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const bannerSchema = mongoose.Schema(
  {
    bannerImg: {
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
bannerSchema.plugin(toJSON);
bannerSchema.plugin(paginate);

/**
 * @typedef Banner
 */
const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
