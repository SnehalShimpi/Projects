var userModel = require('../models/user');
const Cryptr = require('cryptr');

var nodemailer = require('nodemailer');
var jwt = require('jwt-simple');
jwt1 = require('jsonwebtoken');
var config = require('../config/config');
var multer = require('multer');
var path 
var users = {
    
    /* All data of database */

    getAll: function (req, res) {
        console.log('inside the GetAll');
        userModel.find(function (err, docs) {
            if (err) {
                res.status(500).json({ status: 'error', message: 'Datebase Error:' + err, docs: '' });
            }
            else {
                res.status(200).json({ status: 'success', message: 'Success', docs: docs });
              
                
            }
        });
    },

    /* Upload Image */

    uploadPiture: function(req, res) {
       
    var storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
    
    cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + (file.originalname))
    console.log(req.file);
    
    }
    });
    
    var upload = multer({ 
        storage: storage,
        fileFilter : function (req,file,callback){
            //var ext = path.extname(file.originalname);
            console.log(file.mimetype);
            if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
                callback(null, true);
            }
            else
            {
                return callback(new Error('Only Jpg & Png  images are allowed'))
        
            }
        },
        limits : {
            fileSize : 2 * ( 1024 * 1024)
        }
    }).single('photo');
    
    
    upload(req, res, function (err) {
       
    if (err) {
    res.status(200).json({ status: false ,   err : err.message , docs: '' });
    } else {
        this.path = req.file.path;
        console.log(this.path);
    res.status(200).json({ status:  true  , message: 'Picture is Successfully uploaded' , });
    }
    
    });
    },
    
    /* create new user */
    
    create: function (req, res) {
        var flag = null;
        var hobbies;
        var user = new userModel();
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.birthdate = (req.body.birthdate).slice(0,10);
        user.gender = req.body.gender;
        hobbies = filter_array(req.body.hobby);
        console.log(hobbies);
        user.hobby = hobbies;
        user.phoneNo = req.body.phoneNo;
        user.address = req.body.address;
        user.city = req.body.city;
        user.state = req.body.state;
        user.zipcode = req.body.zipcode;
        user.email = req.body.email;
        user.password = req.body.password;
        user.confirmPassword = req.body.confirmPassword;
        user.username = req.body.username;
        user.ProfPic = this.path;
        
        
   
         /* unique mail and unique email */
         
         userModel.find(function (err, docs) {
 
             if (err) {
                 res.status(500).json({ status: 'error', message: 'Datebase Error:' + err, docs: '' });
             }
             else {

                for (i = 0; i < docs.length; i++) {
                    if (user.email === docs[i].email) {
                        console.log(docs[i]);
                        flag = 1;
                        break;
                    }
                    else if(user.username == docs[i].username){
                        flag = 2;
                        break;
                    }

                    else {
                        flag = 0;
                    }
                    
                }
                //console.log(docs[0].username);
            }

            if (flag == 1) {

                console.log("already in use");
                res.status(200).json({ status: 1,  err: " Email should be unique" } );

            }
            else if(flag == 2){
                console.log("already in use");
                res.status(200).json({ status: 2 , err: "username Should be unique"});
            }
            else {
                console.log("unique");
                user.save(function (err) {
                    if (err) {
                        res.status(400).json({ status: 'error', message: 'Datebase Error:' + err, docs: '' });
                    }
                    else {
                        this.path = null;
                        res.status(200).json({ status: 'success', message: 'Added to Mongo successfully', doc: '' });
                    }

                });
            }
        });
    },

    /* User Login  */
    login: function (req, res) {

        userModel.findOne(
            { $and:[
                      {'username' : req.body.username},
                      {'password': req.body.password}
                    ]
            },
             function(err, user)
             {
                 console.log(req.body.username)
                 console.log(req.body.password)
                 console.log("************");
                 console.log(user);
              
                 if(err || !user) {
                    res.status(200).json({status:false , message: 'Authentication Error:', docs:''});
                  }
                  else {
                             var payload = { username : user.username};
                             var token = jwt.encode(payload, config.secretKey);
                             jwt1.sign({
                                data: payload
                              }, 'secret', { expiresIn: '1h' });
                            res.status(200).json({status:true , message: ' successfull', token: token});
                  }
           
          });



        

    },
      /* send forgot password link on mail */
    mail: function (req, res) {
        var flag = null;
        var user = new userModel()
        user.email = req.body.email;
        //  console.log(req.body.email)
        const cryptr = new Cryptr('myTotalySecretKey');
        const encryptedString = cryptr.encrypt(req.body.email);
        userModel.find(function (err, docs) {

            if (err) {
                res.status(500).json({ status: 'error', message: 'Datebase Error:' + err, docs: '' });
            }
            else {

                for (i = 0; i < docs.length; i++) {
                    if (user.email === docs[i].email) {
                        flag = 1;
                        break;
                    }
                    else {
                        flag = 0;
                    }

                }
              
            }

            if (flag == 1) {

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'snehalshimpi11@gmail.com',
                        pass: 'laxman@11'
                    }
                });

                var mailOptions = {
                    from: 'snehalshimpi11@gmail.com',
                    to: req.body.email,

                    subject: 'Sending Email For Reset Password',
                    text: `http://localhost:4200/resetPassword/${encryptedString}`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        flag = 0;

                    }
                    else {
                        console.log('Email sent: ' + info.response);
                        flag = 1;



                    }
                });

                if (flag == 1) {

                    console.log("Mail send");
                    res.status(200).json({ status: true, message: 'succes', docs: { success: true } });

                }

                else {
                    console.log(" mail not send");
                    res.status(200).json({ status: false, message: 'error', docs: { Error: false } });

                }
                //**************** */


            }
            else {
             
                console.log("not register");
                res.status(200).json({ status: false, message: 'Error', docs: { err: "not register mail" } });


            }
        });


    },

     /* Update Password*/ 
    Update: function (req, res) {
        console.log(req.body)
        var user = userModel;
        const cryptr = new Cryptr('myTotalySecretKey');
        user.email = cryptr.decrypt(req.body.email);
        console.log(user.email);
        var flag = null;
        userModel.find(function (err, docs) {

            if (err) {
                res.status(500).json({ status: 'error', message: 'Datebase Error:' + err, docs: '' });
            }
            else {

                for (i = 0; i < docs.length; i++) {
                    if (user.email == docs[i].email) {
                        flag = 1;
                        console.log(user.email);
                        console.log(docs[i].email)
                        console.log(flag);
                        break;
                    }
                    else {
                        flag = 0;
                    }

                }
                console.log(flag);
                if (flag == 1) {

                    var myquery = { email: user.email };
                    var newvalues = { $set: { password: req.body.password } };
                    userModel.updateOne(myquery, newvalues, function (err) {
                        if (err) {
                            throw err;
                        }
                        else {
                            console.log("1 document updated");


                        }

                    });
                    res.status(200).json({ status: true, message: 'true', docs: { err: "password updated" } });

                }
                else {
                    res.status(200).json({ status: false, message: 'Error', docs: { err: "password not updated" } });
                    console.log("not updated")

                }
            }
        });
        
       



    },

    demo : function (req,res){
        const cryptr = new Cryptr('myTotalySecretKey');
        const encryptedString = cryptr.encrypt('bacon');
        const decryptedString = cryptr.decrypt(encryptedString);
 
            console.log(encryptedString); 
            console.log(decryptedString); 
    },
   







}
function filter_array(test_array) {
    console.log("inside filter array")
    var index = -1,
        arr_length = test_array ? test_array.length : 0,
        resIndex = -1,
        result = [];

    while (++index < arr_length) {
        var value = test_array[index];

        if (value) {
            result[++resIndex] = value;
        }
    }
    console.log(result)
    return result;
}
module.exports = users;
