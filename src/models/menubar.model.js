const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const menubarSchema = mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    items: [
      {
        label: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
menubarSchema.plugin(toJSON);
menubarSchema.plugin(paginate);

/**
 * @typedef Menubar
 */
const Menubar = mongoose.model('Menubar', menubarSchema);

module.exports = Menubar;
