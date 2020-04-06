const express=require('express')
const router=express.Router()
const passport=require('passport')
const jwt=require('jsonwebtoken')

const admin=require('../config/firebase')
let db = admin.firestore();

router.get('/google',passport.authenticate('google',{ scope: ['profile','email'] }))
router.get('/google/redirect',passport.authenticate('google',{session:false}),(req,res)=>{
    // res.send({"token":req.token})
    res.redirect(`http://localhost:8080/auth/redirect/${req.token}`)
})

router.get('/facebook',passport.authenticate('facebook'))
router.get('/facebook/redirect',passport.authenticate('facebook',{session:false}),(req,res)=>{
    // res.send({"token":req.token})
    res.redirect(`http://localhost:8080/auth/redirect/${req.token}`)
})

router.get('/twitter',passport.authenticate('twitter'))
router.get('/twitter/redirect',passport.authenticate('twitter',{session:false}),(req,res)=>{
    // res.send({"token":req.token})
    res.redirect(`http://localhost:8080/auth/redirect/${req.token}`)
})

router.get('/github',passport.authenticate('github'))
router.get('/github/redirect',passport.authenticate('github',{session:false}),(req,res)=>{
    // res.send({"token":req.token})
    res.redirect(`http://localhost:8080/auth/redirect/${req.token}`)
})

router.get('/amazon',passport.authenticate('amazon'))
router.get('/amazon/redirect',passport.authenticate('amazon',{session:false}),(req,res)=>{
    // res.send({"token":req.token})
    res.redirect(`http://localhost:8080/auth/redirect/${req.token}`)
})

router.post('/get',(req,res)=>{
    let decoded = jwt.verify(req.body.token, 'secret');
    db.collection("users").doc(decoded.id).get().then(doc=>{
        res.send(doc.data())
    })
    .catch(err=>console.log(err))
})

// router.get('/instagram',passport.authenticate('instagram'))
// router.get('/instagram/redirect',passport.authenticate('instagram',{session:false}),(req,res)=>{
//     res.send({"msg":"Instagram Success"})
// })

// router.get('/snapchat',passport.authenticate('snapchat'))
// router.get('/snapchat/redirect',passport.authenticate('snapchat',{session:false}),(req,res)=>{
//     res.send({"msg":"Snapchat Success"})
// })

module.exports=router