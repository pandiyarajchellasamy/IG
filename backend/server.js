import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";


import logger from "morgan";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import createError from "http-errors";

// Importing Routes
import authRouter from "./routes/oauth.js";
import requestRouter from "./routes/request.js";
import htmlAuthRouter from "./routes/htmlAuth.js";
import htmlFileRouter from "./routes/htmlResponse.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
// import bodyParser from 'body-parser';
import contactRoutes from './routes/contactRoute.js';

// Set up environment variables
dotenv.config();

// App Config
const app = express();
const port = process.env.PORT || 4000;
// app.use(body-Parser.json());
// app.use(body-Parser.urlencoded({ extended: true }));

// Workaround for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Logger
app.use(logger("dev"));

// DB connection
connectDB();

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],  // Allow both frontend origins
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization','token'],  // Add any other headers your app uses
  credentials: true, // Allow cookies to be sent across origins
};

app.use(cors(corsOptions));
// Enable CORS for all routes
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  // Preflight handling

// Set view engine
app.set("view engine", "pug");

// API Endpoints
app.use("/oauth", authRouter);
app.use("/request", requestRouter);
app.use("/htmlAuth", htmlAuthRouter);
app.use("/htmlResponse", htmlFileRouter);
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use('/api/contact', contactRoutes);

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// Start the server
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
