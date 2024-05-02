const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const validate = require('../../middlewares/validate');
const entertainmentValidation = require('../../validations/entertainment.validation');
const entertainmentController = require('../../controllers/entertainment.controller');

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
  .post(validate(entertainmentValidation.createEntertainment), entertainmentController.createEntertainment)
  .get(validate(entertainmentValidation.getEntertainments), entertainmentController.getEntertainments);
// .get(validate(entertainmentValidation.getEntertainments), entertainmentController.getEntertainmentSample);

router.route('/file').post(upload.single('img'), (req, res, next) => {
  if (!req.file) {
    const err = new Error('No File');
    err.httpStatusCode = 400;
    return next(err);
  }
  // eslint-disable-next-line no-useless-concat
  const oPath = `/root/Nextriper/src/uploads/` + `${req.file.filename}`;
  const Basename = `${path.parse(req.file.originalname).name}_`;
  // eslint-disable-next-line no-useless-concat
  const nPath = `${
    // eslint-disable-next-line no-useless-concat
    `/var/www/html/assets/images/uploads/` + `${Basename}`
  }${Date.now()}.jpg`;
  // D:/HardDisk/KrishivaTech/Ecommerce/admin/src/assets/demo/images/uploads/
  // D:/HardDisk/Project/Nextripper/website/frontend/NextriperFE/src/assets/images/uploads/

  // eslint-disable-next-line security/detect-non-literal-fs-filename,no-useless-concat
  fs.promises.rename(oPath, nPath).then((r) => r);
  req.file.uploadedFilePath = `${
    // eslint-disable-next-line no-useless-concat
    `https://be-assets.nextriper.com/` + `${Basename}`
  }${Date.now()}.jpg`;
  res.send(req.file);
});

router
  .route('/:entertainmentId')
  .get(validate(entertainmentValidation.getEntertainment), entertainmentController.getEntertainment)
  .patch(validate(entertainmentValidation.updateEntertainment), entertainmentController.updateEntertainment)
  .delete(validate(entertainmentValidation.deleteEntertainment), entertainmentController.deleteEntertainment);

module.exports = router;
