const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const activityValidation = require('../../validations/activity.validation');
const activityController = require('../../controllers/activity.controller');

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'uploads');
  },
  fileName: (req, file, callBack) => {
    callBack(null, `Temp_${file.originalname}`);
  },
});

const upload = multer({ storage });

router
  .route('/')
  .post(validate(activityValidation.createActivity), activityController.createActivity)
  .get(validate(activityValidation.getActivities), activityController.getActivities);

router.route('/file').post(upload.single('img'), (req, res, next) => {
  if (!req.file) {
    const err = new Error('No File');
    err.httpStatusCode = 400;
    return next(err);
  }
  // eslint-disable-next-line no-useless-concat
  const oPath = `D:/HardDisk/Project/Nextripper/website/backend/NextriperBE/uploads/` + `${req.file.filename}`;
  const Basename = `${path.parse(req.file.originalname).name}_`;
  // eslint-disable-next-line no-useless-concat
  const nPath = `${
    // eslint-disable-next-line no-useless-concat
    `D:/HardDisk/Project/Nextripper/website/frontend/NextriperFE/src/assets/images/uploads/` + `${Basename}`
  }${Date.now()}.jpg`;
  // eslint-disable-next-line security/detect-non-literal-fs-filename,no-useless-concat
  fs.promises.rename(oPath, nPath).then((r) => r);
  req.file.uploadedFilePath = nPath;
  res.send(req.file);
});

router
  .route('/:activityId')
  .get(validate(activityValidation.getActivity), activityController.getActivity)
  .patch(auth(), validate(activityValidation.updateActivity), activityController.updateActivity)
  .delete(validate(activityValidation.deleteActivity), activityController.deleteActivity);

module.exports = router;
