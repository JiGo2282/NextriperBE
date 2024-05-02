const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const entertainmentSchema = mongoose.Schema(
  {
    packName: {
      type: String,
      required: true,
      trim: true,
    },
    packCountry: {
      type: String,
      required: true,
      trim: true,
    },
    packState: {
      type: String,
      required: true,
      trim: true,
    },
    packCity: {
      type: String,
      required: true,
      trim: true,
    },
    packDays: {
      type: String,
      required: false,
      trim: true,
    },
    packActualPrice: {
      type: String,
      required: false,
      trim: true,
    },
    packDiscountPrice: {
      type: String,
      required: false,
      trim: true,
    },
    packShortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    packLongDescription: {
      type: String,
      required: true,
      trim: true,
    },
    packMainImg: {
      type: String,
      required: true,
      trim: true,
    },
    packSubImg1: {
      type: String,
      required: true,
      trim: true,
    },
    packSubImg2: {
      type: String,
      required: true,
      trim: true,
    },
    packSubImg3: {
      type: String,
      required: true,
      trim: true,
    },
    packType: {
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
entertainmentSchema.plugin(toJSON);
entertainmentSchema.plugin(paginate);

/**
 * @typedef Entertainment
 */
const Entertainment = mongoose.model('Entertainment', entertainmentSchema);

module.exports = Entertainment;
