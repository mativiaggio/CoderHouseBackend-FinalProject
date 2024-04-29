const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const { Server } = require("socket.io");
const dotenv = require("dotenv");

// Importing routes
const cartsRouter = require("./routes/carts.router");
const productsRouter = require("./routes/products.router");
const viewsRouter = require("./routes/views.router");
const sessionRouter = require("./routes/sessions.router");
const emailRouter = require("./routes/emails.router");

// Importing configurations
const initializePassport = require("./config/passport.config");
const envConfig = require("./config/config");

// Importing middlewares
const selectLayout = require("./middlewares/selectLayout");

// Load environment variables
dotenv.config();

// Constants
const PORT = process.env.PORT || 8080;

// Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

// MongoDB connection
mongoose
  .connect(
    `mongodb+srv://matiasviaggio-admin:${envConfig.mongoPassword}@coderhousebackend.vocmiqt.mongodb.net/backend`
  )
  .then(() => {
    console.log("Mongoose conectado");
  });

// Handlebars configuration
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// Express middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Socket.io
let newProduct = [];
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("newProduct", (productData) => {
    newProduct.push(productData);
    socket.emit("updateProducts", { productData });
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Session middleware
app.use(cookieParser());
app.use(
  session({
    secret: "ourSecret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://matiasviaggio-admin:${envConfig.mongoPassword}@coderhousebackend.vocmiqt.mongodb.net/`,
    }),
  })
);

// Passport initialization
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/mail", emailRouter);
app.use("/", viewsRouter);

// Starting the server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
