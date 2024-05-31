const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { blogService } = require('../services');

const createBlog = catchAsync(async (req, res) => {
  req.body.blogDescription = req.body.blogDescription.replaceAll('&lt;', '<');
  const createAct = await blogService.createBlog(req.body);
  res.status(httpStatus.CREATED).send(createAct);
});

const getBlogs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await blogService.queryBlogs(filter, options);
  res.set("Access-Control-Allow-Origin", "*");
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(result);
});

const getBlog = catchAsync(async (req, res) => {
  const getAct = await blogService.getBlogById(req.params.blogId);
  if (!getAct) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");
  }
  res.send(getAct);
});

const updateBlog = catchAsync(async (req, res) => {
  req.body.blogDescription = req.body.blogDescription.replaceAll('&lt;', '<');
  const updateAct = await blogService.updateBlogById(req.params.blogId, req.body);
  res.send(updateAct);
});

const deleteBlog = catchAsync(async (req, res) => {
  const delAct = await blogService.deleteBlogById(req.params.blogId);
  if (!delAct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  res.send(delAct);
});

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
