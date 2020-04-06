const passport=require('passport')
const jwt=require('jsonwebtoken')

const admin=require('./firebase')
let db = admin.firestore();

const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy=require('passport-facebook').Strategy
const TwitterStrategy=require('passport-twitter').Strategy
const GitHubStrategy=require('passport-github').Strategy
const AmazonStrategy=require('passport-amazon').Strategy

// const SnapchatStrategy=require('passport-snapchat').Strategy
// const InstagramStrategy=require('passport-instagram').Strategy

passport.use('amazon', new AmazonStrategy({
  clientID: 'amzn1.application-oa2-client.ffe2741dc30549ca845e9ea54dce8f3c',
  clientSecret: '2cb7525d10c1b1b5c122b36e59fcc4bc0a468ee989cbcb5e4ff584fbf3b5ec5f',
  callbackURL: "https://passport-oauth.herokuapp.com/auth/amazon/redirect",
  scope:'profile',
  passReqToCallback : true
},
function(req, accessToken, refreshToken, profile, done) {
  let t=jwt.sign({id:profile.id},'secret')
    req.token=t
    db.collection("users").doc(profile.id).get().then(doc=>{
      if(!doc.exists){
        let modprofile=profile
        modprofile=JSON.parse(JSON.stringify(modprofile))
        db.collection("users").doc(profile.id).set(profile).then(()=>{
          done(null,profile)
        }).catch(err=>console.log(err))
      }else{
          done(null,profile)
      }
    }).catch(err=>console.log(err))
}
));

passport.use('google', new GoogleStrategy({
    clientID: '354006049453-39fb49v7pe924atugpbs0rqmd6ihpt60.apps.googleusercontent.com',
    clientSecret: 'uNd9QT08AEajRrRprZsT93gf',
    callbackURL: "https://passport-oauth.herokuapp.com/auth/google/redirect",
    passReqToCallback : true
  },
  function(req, accessToken, refreshToken, profile, cb) {
    let t=jwt.sign({id:profile.id},'secret')
    req.token=t
    db.collection("users").doc(profile.id).get().then(doc=>{
      if(!doc.exists){
        let modprofile=profile
        modprofile=JSON.parse(JSON.stringify(modprofile))
        db.collection("users").doc(profile.id).set(profile).then(()=>{
          cb(null,profile)
        }).catch(err=>console.log(err))
      }else{
          cb(null,profile)
      }
    }).catch(err=>console.log(err))
  }
));

passport.use('facebook', new FacebookStrategy({
    clientID: '1521622441333392',
    clientSecret: 'd81134dcc3595d541d1fa0f7c8524cc4',
    callbackURL: "https://passport-oauth.herokuapp.com/auth/facebook/redirect",
    passReqToCallback : true
  },
  function(req, accessToken, refreshToken, profile, cb) {
    let t=jwt.sign({id:profile.id},'secret')
    req.token=t
    db.collection("users").doc(profile.id).get().then(doc=>{
      if(!doc.exists){
        let modprofile=profile
        modprofile=JSON.parse(JSON.stringify(modprofile))
        db.collection("users").doc(profile.id).set(modprofile).then(()=>{
          cb(null,profile)
        }).catch(err=>console.log(err))
      }else{
          cb(null,profile)
      }
    }).catch(err=>console.log(err))
  }
));

passport.use('twitter', new TwitterStrategy({
    consumerKey: 'u3uAumHopMaCYAHsaYk2UV7EK',
    consumerSecret: 'KNo36ZC8PmOKxpFlPAXmjWt1lDwSIzSxuDNfZdbjh2XEn9jLFO',
    callbackURL: "https://passport-oauth.herokuapp.com/auth/twitter/redirect",
    passReqToCallback : true
  },
  function(req, token, tokenSecret, profile, cb) {
    let t=jwt.sign({id:profile.id},'secret')
    req.token=t
    db.collection("users").doc(profile.id).get().then(doc=>{
      if(!doc.exists){
        let modprofile=profile
        modprofile=JSON.parse(JSON.stringify(modprofile))
        db.collection("users").doc(profile.id).set(profile).then(()=>{
          cb(null,profile)
        }).catch(err=>console.log(err))
      }else{
          cb(null,profile)
      }
    }).catch(err=>console.log(err))
  }
));

passport.use('github', new GitHubStrategy({
    clientID: '702c3604c19a2cee9ac5',
    clientSecret: '68a2575c551bee76bf20c1e640e566b71fdc81c5',
    callbackURL: "https://passport-oauth.herokuapp.com/auth/github/redirect",
    passReqToCallback : true
  },
  function(req, accessToken, refreshToken, profile, cb) {
    let t=jwt.sign({id:profile.id},'secret')
    req.token=t
    db.collection("users").doc(profile.id).get().then(doc=>{
      if(!doc.exists){
        let modprofile=profile
        modprofile=JSON.parse(JSON.stringify(modprofile))
        db.collection("users").doc(profile.id).set(profile).then(()=>{
          cb(null,profile)
        }).catch(err=>console.log(err))
      }else{
          cb(null,profile)
      }
    }).catch(err=>console.log(err))
  }
));

// passport.use('snapchat', new SnapchatStrategy({
//     clientID: 'b72bf72a-6d86-4ec7-9569-71af5ddf348b',
//     clientSecret: 'r0jP218vM_EVCHaFbANJJy-UmQCnK2D2qwAa4IgWp8Q',
//     callbackURL: "https://localhost:3000/auth/snapchat/redirect",
//     scope:['user.bitmoji.avatar','user.display_name']
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     console.log(profile)
//     cb(null,profile)
//   }
// ));

// passport.use('instagram', new InstagramStrategy({
//     clientID: '498566144381400',
//     clientSecret: '92ce6186c01f3aa53cc680ea25d0815c',
//     callbackURL: "https://passport-oauth.herokuapp.com/auth/instagram/redirect"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     console.log(profile)
//     done(null,profile)
//   }
// ));