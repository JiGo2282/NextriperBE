const httpStatus = require('http-status');
const { Package } = require('../models');
const ApiError = require('../utils/ApiError');
/**
 * Create a package
 * @param {Object} packageBody
 * @returns {Promise<Package>}
 */
const createPackage = async (packageBody) => {
  return Package.create(packageBody);
};

/**
 * Query for packages
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<void>}
 */
const queryPackages = async (filter, options) => {
  return Package.paginate(filter, options);
};

/**
 * Get package by id
 * @param {ObjectId} id
 * @returns {Promise<Package>}
 */
const getPackageById = async (id) => {
  return Package.findById(id);
};

/**
 * Update package by id
 * @param {ObjectId} packageId
 * @param updateBody
 * @returns {Promise<Package>}
 */
const updatePackageById = async (packageId, updateBody) => {
  const updatePackage = await getPackageById(packageId);
  if (!updatePackage) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Package not found');
  }
  Object.assign(updatePackage, updateBody);
  await updatePackage.save();
  return updatePackage;
};

/**
 * Delete package by id
 * @param {ObjectId} packageId
 * @returns {Promise<Package>}
 */
const deletePackageById = async (packageId) => {
  const delPackage = await getPackageById(packageId);
  if (!delPackage) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Package not found');
  }
  await delPackage.remove();
  return delPackage;
};

module.exports = {
  createPackage,
  queryPackages,
  getPackageById,
  updatePackageById,
  deletePackageById,
};
