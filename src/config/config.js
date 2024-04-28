const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  mongoPassword: process.env.MONGO_PASSWORD,
  clientID: process.env.CLIENT_ID,
  callbackURL: process.env.CALLBACK_URL,
  clientSecret: process.env.CLIENT_SECRET,

  mailing: {
    emailService: process.env.EMAIL_SERVICE,
    emailPort: process.env.EMAIL_PORT,
    auth: {
      emailUser: process.env.EMAIL_USER,
      emailPassword: process.env.EMAIL_PASSWORD,
    },
  },
};
