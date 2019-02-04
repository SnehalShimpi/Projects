var multer = require('multer');

var fileUpload = {
uploadPiture: function(req, res) {
    var path 
    //console.log(req.file);
    
    
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
   this.path = req.file.path;
   console.log(this.path);
if (err) {
res.status(200).json({ status: false ,   err : err.message , docs: req.file.path });
} else {

res.status(200).json({ status:  req.file.path  , message: 'Picture is Successfully uploaded' , });
}

});
}
}

module.exports = fileUpload;