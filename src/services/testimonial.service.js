const httpStatus = require('http-status');
const { Testimonial } = require('../models');
const ApiError = require('../utils/ApiError');
/**
 * Create a testimonial
 * @param {Object} testimonialBody
 * @returns {Promise<Testimonial>}
 */
const createTestimonial = async (testimonialBody) => {
  return Testimonial.create(testimonialBody);
};

/**
 * Query for testimonials
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTestimonials = async (filter, options) => {
  // eslint-disable-next-line no-return-await
  return await Testimonial.paginate(filter, options);
};

/**
 * Get testimonial by id
 * @param {ObjectId} id
 * @returns {Promise<Testimonial>}
 */
const getTestimonialById = async (id) => {
  return Testimonial.findById(id);
};

/**
 * Update testimonial by id
 * @param {ObjectId} testimonialId
 * @param updateBody
 * @returns {Promise<Testimonial>}
 */
const updateTestimonialById = async (testimonialId, updateBody) => {
  const updateTestimonial = await getTestimonialById(testimonialId);
  if (!updateTestimonial) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Testimonial not found');
  }
  Object.assign(updateTestimonial, updateBody);
  await updateTestimonial.save();
  return updateTestimonial;
};

/**
 * Delete testimonial by id
 * @param {ObjectId} testimonialId
 * @returns {Promise<Testimonial>}
 */
const deleteTestimonialById = async (testimonialId) => {
  const delTestimonial = await getTestimonialById(testimonialId);
  if (!delTestimonial) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Testimonial not found');
  }
  await delTestimonial.remove();
  return delTestimonial;
};

module.exports = {
  createTestimonial,
  queryTestimonials,
  getTestimonialById,
  updateTestimonialById,
  deleteTestimonialById,
};
