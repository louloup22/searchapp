var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile('success2.html',{
      root: './public/'
  });
});


module.exports = router;