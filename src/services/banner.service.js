const httpStatus = require('http-status');
const { Banner } = require('../models');
const ApiError = require('../utils/ApiError');
/**
 * Create a banner
 * @param {Object} bannerBody
 * @returns {Promise<Banner>}
 */
const createBanner = async (bannerBody) => {
  return Banner.create(bannerBody);
};

/**
 * Query for banners
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBanners = async (filter, options) => {
  const banners = await Banner.paginate(filter, options);
  return banners;
};

/**
 * Get banner by id
 * @param {ObjectId} id
 * @returns {Promise<Banner>}
 */
const getBannerById = async (id) => {
  return Banner.findById(id);
};

/**
 * Delete banner by id
 * @param {ObjectId} bannerId
 * @returns {Promise<Banner>}
 */
const deleteBannerById = async (bannerId) => {
  const delBan = await getBannerById(bannerId);
  if (!delBan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Banner not found');
  }
  await delBan.remove();
  return delBan;
};

module.exports = {
  createBanner,
  queryBanners,
  getBannerById,
  deleteBannerById,
};
