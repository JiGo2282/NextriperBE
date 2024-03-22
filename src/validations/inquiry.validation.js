const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createInquiry = {
  body: Joi.object().keys({
    eName: Joi.string().required(),
    eContact: Joi.string().required(),
    eEmail: Joi.string().required(),
    eSubject: Joi.string().required(),
    eMessage: Joi.string().required(),
    eCreated: Joi.date().required(),
  }),
};

const getInquiries = {
  query: Joi.object().keys({
    startDate: Joi.date(),
    endDate: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getInquiry = {
  params: Joi.object().keys({
    inquiryId: Joi.string(),
  }),
};

const updateInquiry = {
  params: Joi.object().keys({
    inquiryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      eName: Joi.string(),
    })
    .min(1),
};

const deleteInquiry = {
  params: Joi.object().keys({
    inquiryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createInquiry,
  getInquiries,
  getInquiry,
  updateInquiry,
  deleteInquiry,
};
