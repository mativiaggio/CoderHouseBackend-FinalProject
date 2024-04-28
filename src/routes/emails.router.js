const { Router } = require("express");
const env_config = require("../config/config");
const nodemailer = require("nodemailer");

const router = Router();

// Mailer configuration
const transport = nodemailer.createTransport({
  service: env_config.mailing.emailService,
  port: env_config.mailing.emailPort,
  auth: {
    user: env_config.mailing.auth.emailUser,
    pass: env_config.mailing.auth.emailPassword,
  },
});

// Route to send a test email
router.get("/test-email", async (req, res) => {
  const destination = req.query.destination;

  try {
    await transport.sendMail({
      from: `Coder Test <${env_config.mailing.auth.user}>`,
      to: destination,
      subject: "Test Email",
      html: "This is a test email",
    });
    res.redirect("/");
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

// Route for sending successfully registered email
router.get("/successfully-registered", async (req, res) => {
  const { destination, firstname, lastname } = req.query;

  try {
    await transport.sendMail({
      from: `Coder Test <${env_config.mailing.auth.user}>`,
      to: destination,
      subject: "Successfully Registered",
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <!-- Bootstrap CSS -->
          </head>
          <body>
            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <h3>Successfully Registered!</h3>
                  <p>Hello ${firstname} ${lastname}!</p>
                  <p>Your user has been successfully registered.</p>
                  <p>You can now start shopping on our website.</p>
                </div>
              </div>
            </div>

            <!-- Bootstrap JS -->
          </body>
        </html>
      `,
    });
    res.redirect("/");
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

// Route for sending successfully logged in email
router.get("/successfully-login", async (req, res) => {
  const { destination, firstname, lastname } = req.query;

  try {
    await transport.sendMail({
      from: `Coder Test <${env_config.mailing.auth.user}>`,
      to: destination,
      subject: "Successfully Logged In",
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <!-- Bootstrap CSS -->
          </head>
          <body>
            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <h3>Successfully Logged In!</h3>
                  <p>Hello ${firstname} ${lastname}!</p>
                  <p>Your user has been successfully logged in.</p>
                  <p>You can now start shopping on our website.</p>
                </div>
              </div>
            </div>

            <!-- Bootstrap JS -->
          </body>
        </html>
      `,
    });
    res.redirect("/");
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

module.exports = router;
