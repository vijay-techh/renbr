import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import * as Users from "../models/usersModel.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await Users.findByGoogleId(profile.id);

        if (!user) {
          user = await Users.createUser({
            google_id: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            avatar_url: profile.photos[0]?.value,
            is_verified: true
          });
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
