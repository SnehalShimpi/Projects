var express = require('express');
var router = express.Router();
var users = require('./controllers/users.js');
var states = require('./controllers/states.js')
var profilePic = require('./controllers/profilePic')
var userInfo = require('./controllers/UserInfo')

console.log(router);

router.get('/myapi/users/', users.getAll);
router.post('/myapi/user/',users.create);
router.get('/myapi/states/', states.getAll);
router.post('/myapi/state/',states.create);
 router.post('/myapi/login/',users.login);
router.post('/myapi/upload/',users.uploadPiture);
router.put('/myapi/password/',users.Update);
router.post('/myapi/mail/',users.mail)
router.post('/secure/userInfo/',userInfo.userInfo)

module.exports = router;