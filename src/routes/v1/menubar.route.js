const express = require('express');
const validate = require('../../middlewares/validate');
const menubarValidation = require('../../validations/menubar.validation');
const menubarController = require('../../controllers/menubar.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(menubarValidation.createMenubar), menubarController.createMenubar)
  .get(validate(menubarValidation.getMenubars), menubarController.getMenubars);

router
  .route('/:menubarId')
  .get(validate(menubarValidation.getMenubar), menubarController.getMenubar)
  .patch(validate(menubarValidation.updateMenubar), menubarController.updateMenubar)
  .delete(validate(menubarValidation.deleteMenubar), menubarController.deleteMenubar);

module.exports = router;
