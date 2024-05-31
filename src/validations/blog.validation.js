const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBlog = {
  body: Joi.object().keys({
    blogName: Joi.string().required(),
    blogBy: Joi.string().required(),
    blogCategories: Joi.string(),
    blogIsPopular: Joi.string(),
    blogDescription: Joi.string().required(),
    blogCreateDate: Joi.date(),
    blogImage: Joi.string(),
  }),
};

const getBlogs = {
  query: Joi.object().keys({
    blogName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBlog = {
  params: Joi.object().keys({
    // blogId: Joi.string().custom(objectId),
    blogId: Joi.string(),
  }),
};

const updateBlog = {
  params: Joi.object().keys({
    blogId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      blogName: Joi.string().required(),
      blogBy: Joi.string().required(),
      blogCategories: Joi.string(),
      blogIsPopular: Joi.string(),
      blogDescription: Joi.string().required(),
      blogCreateDate: Joi.date(),
      blogImage: Joi.string(),
    })
    .min(1),
};

const deleteBlog = {
  params: Joi.object().keys({
    blogId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
