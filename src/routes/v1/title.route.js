const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const validate = require('../../middlewares/validate');
const titleValidation = require('../../validations/title.validation');
const titleController = require('../../controllers/title.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(titleValidation.createTitle), titleController.createTitle)
  .get(validate(titleValidation.getTitles), titleController.getTitles);

router
  .route('/:titleId')
  .get(validate(titleValidation.getTitle), titleController.getTitle)
  .patch(validate(titleValidation.updateTitle), titleController.updateTitle)
  .delete(validate(titleValidation.deleteTitle), titleController.deleteTitle);

module.exports = router;
