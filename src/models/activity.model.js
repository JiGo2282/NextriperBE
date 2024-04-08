const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const activitySchema = mongoose.Schema(
  {
    actName: {
      type: String,
      required: true,
      trim: true,
    },
    actCountry: {
      type: String,
      required: true,
      trim: true,
    },
    actState: {
      type: String,
      required: true,
      trim: true,
    },
    actCity: {
      type: String,
      required: true,
      trim: true,
    },
    actDays: {
      type: String,
      required: true,
      trim: true,
    },
    actActualPrice: {
      type: String,
      required: true,
      trim: true,
    },
    actDiscountPrice: {
      type: String,
      required: true,
      trim: true,
    },
    actShortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    actLongDescription: {
      type: String,
      required: true,
      trim: true,
    },
    actMainImg: {
      type: String,
      required: true,
      trim: true,
    },
    actSubImg1: {
      type: String,
      required: true,
      trim: true,
    },
    actSubImg2: {
      type: String,
      required: true,
      trim: true,
    },
    actSubImg3: {
      type: String,
      required: true,
      trim: true,
    },
    actType: {
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
activitySchema.plugin(toJSON);
activitySchema.plugin(paginate);

/**
 * @typedef Activity
 */
const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
