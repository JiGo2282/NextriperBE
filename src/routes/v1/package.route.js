const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const packageValidation = require('../../validations/package.validation');
const packageController = require('../../controllers/package.controller');

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
  .post(validate(packageValidation.createPackage), packageController.createPackage)
  .get(validate(packageValidation.getPackages), packageController.getPackages);

router.route('/file').post(upload.single('img'), (req, res, next) => {
  if (!req.file) {
    const err = new Error('No File');
    err.httpStatusCode = 400;
    return next(err);
  }

  let fn = __filename;
  let fp = __dirname;

  // eslint-disable-next-line no-useless-concat
  const oPath = `D:/HardDisk/Project/Nextripper/website/backend/NextriperBE/uploads/` + `${req.file.filename}`;
  const Basename = `${path.parse(req.file.originalname).name}_`;
  // eslint-disable-next-line no-useless-concat
  const nPath = `${
    // eslint-disable-next-line no-useless-concat
    `D:/HardDisk/Project/Nextripper/website/frontend/NextriperFE/src/assets/images/uploads/` + `${Basename}`
  }${Date.now()}.jpg`;

  // D:/HardDisk/KrishivaTech/Ecommerce/admin/src/assets/demo/images/uploads/
  // D:/HardDisk/Project/Nextripper/website/frontend/NextriperFE/src/assets/images/uploads/
  // eslint-disable-next-line security/detect-non-literal-fs-filename,no-useless-concat
  fs.promises.rename(oPath, nPath).then((r) => r);
  req.file.uploadedFilePath = nPath;
  res.send(req.file);
});

router
  .route('/:packageId')
  .get(validate(packageValidation.getPackage), packageController.getPackage)
  .patch(validate(packageValidation.updatePackage), packageController.updatePackage)
  .delete(validate(packageValidation.deletePackage), packageController.deletePackage);

module.exports = router;
