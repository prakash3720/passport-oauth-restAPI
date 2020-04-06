const express=require('express')
const router=express.Router()
const passport=require('passport')
const enc = require('iv-encrypt');

const admin=require('../config/firebase')
let db = admin.firestore();

router.get('/google',passport.authenticate('google',{ scope: ['profile','email'] }))
router.get('/google/redirect',passport.authenticate('google',{session:false}),(req,res)=>{
    // res.send({"token":req.token})
    res.redirect(`https://oauthmanager.herokuapp.com/auth/redirect/${req.token}`)
})

router.get('/facebook',passport.authenticate('facebook'))
router.get('/facebook/redirect',passport.authenticate('facebook',{session:false}),(req,res)=>{
    // res.send({"token":req.token})
    res.redirect(`https://oauthmanager.herokuapp.com/auth/redirect/${req.token}`)
})

router.get('/twitter',passport.authenticate('twitter'))
router.get('/twitter/redirect',passport.authenticate('twitter',{session:false}),(req,res)=>{
    // res.send({"token":req.token})
    res.redirect(`https://oauthmanager.herokuapp.com/auth/redirect/${req.token}`)
})

router.get('/github',passport.authenticate('github'))
router.get('/github/redirect',passport.authenticate('github',{session:false}),(req,res)=>{
    // res.send({"token":req.token})
    res.redirect(`https://oauthmanager.herokuapp.com/auth/redirect/${req.token}`)
})

router.get('/amazon',passport.authenticate('amazon'))
router.get('/amazon/redirect',passport.authenticate('amazon',{session:false}),(req,res)=>{
    // res.send({"token":req.token})
    res.redirect(`https://oauthmanager.herokuapp.com/auth/redirect/${req.token}`)
})

router.post('/get',(req,res)=>{
    let decoded = enc.Decrypt(req.body.token);
    db.collection("users").doc(decoded.id).get().then(doc=>{
        res.send(doc.data())
    })
    .catch(err=>{
        console.log(err)
        res.err(404).send({"msg":"Invalid Token"})
    })
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