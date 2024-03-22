const httpStatus = require("http-status");
const { Inquiry } = require("../models");
const ApiError = require("../utils/ApiError");
/**
 * Create a inquiry
 * @param {Object} inquiryBody
 * @returns {Promise<Inquiry>}
 */
const createInquiry = async (inquiryBody) => {
  return Inquiry.create(inquiryBody);
};

/**
 * Query for inquirys
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryInquiries = async (filter, options) => {
  const inquirys = await Inquiry.paginate(filter, options);
  return inquirys;
};

const getInquiriesByDateRange = async (filter, limit) => {
  // eslint-disable-next-line no-prototype-builtins
  if (filter.hasOwnProperty('startDate')) {
    const fFilter = {
      eCreated: { $gte: new Date(filter.startDate).toISOString(), $lte: new Date(filter.endDate).toISOString() }
    };
    return Inquiry.find(fFilter).sort({ eCreated: -1 }).skip(0).limit(limit);
  } else {
    return Inquiry.find().sort({ eCreated: -1 }).skip(0).limit(limit);
  }
};

/**
 * Get inquiry by id
 * @param {ObjectId} id
 * @returns {Promise<Inquiry>}
 */
const getInquiryById = async (id) => {
  return Inquiry.findById(id);
};

/**
 * Update inquiry by id
 * @param {ObjectId} inquiryId
 * @param updateBody
 * @returns {Promise<Inquiry>}
 */
const updateInquiryById = async (inquiryId, updateBody) => {
  const updateInquiry = await getInquiryById(inquiryId);
  if (!updateInquiry) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  Object.assign(updateInquiry, updateBody);
  await updateInquiry.save();
  return updateInquiry;
};

/**
 * Delete inquiry by id
 * @param {ObjectId} inquiryId
 * @returns {Promise<Inquiry>}
 */
const deleteInquiryById = async (inquiryId) => {
  const delInquiry = await getInquiryById(inquiryId);
  if (!delInquiry) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  await delInquiry.remove();
  return delInquiry;
};

module.exports = {
  createInquiry,
  queryInquiries,
  getInquiryById,
  updateInquiryById,
  deleteInquiryById,
  getInquiriesByDateRange
};
