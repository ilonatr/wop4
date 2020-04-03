'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: './uploads/'});
const catController = require('../controllers/catController');

router.get('/', catController.cat_list_get);

router.get('/:id', catController.cat_get);

router.post('/hack', (req, res) => {
  res.send(req.body.search);
});

router.post('/', upload.single('cat'), (req, res) => {
  console.log('tiedosto: ', req.file);
  catController.cat_post(req, res);
  res.send('With this endpoint you can add cats');
});

router.put('/', catController.cat_put);

/* router.put('/', [
  body('name','Name required').required,
  body('age', 'Age required in numbers').isNumeric().isLength({min:1}),
  body('weight', 'Weight in numbers required').isNumeric().isLength({min: 1}),
  body('owner', 'Owner required').isLength({min:1}),
  body('file', 'Only image file required').accept("/image").isLength({min:1}),
], catController.cat_put);  => {
  res.send('With this endpoint you can edit cats');
});*/

router.delete('/:id', catController.cat_delete);

module.exports = router;
