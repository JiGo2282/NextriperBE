const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const packageRoute = require('./package.route');
const docsRoute = require('./docs.route');
const inquiryRoute = require('./inquiry.route');
const activityRoute = require('./activity.route');
const bannerRoute = require('./banner.route');
const menubarRoute = require('./menubar.route');
const entertainmentRoute = require('./entertainment.route');
const testimonialRoute = require('./testimonial.route');
const titleRoute = require('./title.route');
const blogRoute = require('./blog.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/packages',
    route: packageRoute,
  },
  {
    path: '/inquiry',
    route: inquiryRoute,
  },
  {
    path: '/activity',
    route: activityRoute,
  },
  {
    path: '/banner',
    route: bannerRoute,
  },
  {
    path: '/menubar',
    route: menubarRoute,
  },
  {
    path: '/entertainment',
    route: entertainmentRoute,
  },
  {
    path: '/testimonial',
    route: testimonialRoute,
  },
  {
    path: '/title',
    route: titleRoute,
  },
  {
    path: '/blog',
    route: blogRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
