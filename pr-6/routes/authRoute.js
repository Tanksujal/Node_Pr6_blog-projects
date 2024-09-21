const express = require('express')
const { LoginPage, RegisterPage, AddUser, Loginuser, Dash ,addblogpage,addblogs,DeleteBlog,UpdateBlog,showblog, editblog} = require('../controllers/authcontroller')
const multer = require('multer')
const crypto = require('crypto')
const path = require('path')
const router = express.Router()
const IsLogin = (req,res,next) => {
    const token = req.cookies.token
    if(!token){
      return res.redirect('/')
    }
    next()
}
const Isloggedinuser = (req,res,next) => {
    const token = req.cookies.token
    if(token){
        res.redirect('/dash')
    }
    next()
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      crypto.randomBytes(12,function(err,name){ 
        const fn = name.toString("hex")+path.extname(file.originalname)
        cb(null, fn)
      })
    }
  })
  
  const upload = multer({ storage: storage })
router.get('/',Isloggedinuser,LoginPage)
router.get('/register',Isloggedinuser,RegisterPage)
router.post('/adduser',AddUser)
router.post('/Loginuser',Loginuser)
router.get('/dash',IsLogin,Dash)
router.get('/add',IsLogin,addblogpage)
router.get('/show',IsLogin,showblog)
router.post('/addblogs',upload.single('image'),addblogs)
router.get('/deleteblog',DeleteBlog)
router.post('/UpdateBlog',upload.single('image'),UpdateBlog)
router.get('/editblog',editblog)
module.exports = router