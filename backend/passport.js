const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
require("dotenv").config();
const {User} = require('./db')
const mongoose = require("mongoose");
const {Account} = require('./db')



mongoose.connect("mongodb+srv://Ani:Abhiani@atlascluster.phipben.mongodb.net/");


async function  findOrCreateUserGoogle  (accessToken, refreshToken, profile, done) {
  const email = profile.emails[0].value;
  const firstName = profile.name.givenName;
  const lastName = profile.name.familyName;
  // console.log(profile) 

  try {
    let user = await User.findOne({ username: email });
    if (user) {
      done(null, { profile: user, accessToken: accessToken });
    } else {
      user = await User.create({
        username: email,
        password: generateRandomPassword(),
        firstName: firstName,
        lastName: lastName,
      });
      const userId = user._id;
      console.log(userId) 

      await Account.create({
        userId,
        balance: 1 + Math.random() * 10000,
      }); // Giving an initial amount to user on signup
  

      done(null, { profile: user, accessToken: accessToken });
    }
  } catch (err) {
    done(err);
  }
}
async function  findOrCreateUserGithub  (accessToken, refreshToken, profile, done) {
  const email = profile.emails[0].value;
  const names = profile.displayName ? profile.displayName.split(' ') : ['Unknown', ''];
const firstName = names[0]; 
const lastName = names[1] || ''; 


  try {
    let user = await User.findOne({ username: email });
    if (user) {
      done(null, { profile: user, accessToken: accessToken });
    } else {
      user = await User.create({
        username: email,
        password: generateRandomPassword(),
        firstName: firstName,
        lastName: lastName,
      });
      const userId = user._id;
      console.log(userId) 

      await Account.create({
        userId,
        balance: 1 + Math.random() * 10000,
      }); // Giving an initial amount to user on signup
  

      done(null, { profile: user, accessToken: accessToken });
    }
  } catch (err) {
    done(err);
  }
}

function generateRandomPassword() {
  return require("crypto").randomBytes(3).toString("hex");
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "https://paytm-wh8p.onrender.com/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        await findOrCreateUserGoogle(accessToken, refreshToken, profile, done);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/github/callback",
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        await findOrCreateUserGithub(accessToken, refreshToken, profile, done);
      } catch (error) {
        done(error);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
