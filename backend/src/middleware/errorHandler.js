//Centralized error management

import dotenv from 'dotenv';
dotenv.config();

// Centralized Error Handling Middleware
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || res.statusCode || 500;
  if (statusCode === 200) statusCode = 500;

  let message = err.message || "An unexpected internal server error occurred.";
  let errors = err.errors || null;

  // Handle Mongoose Validation Errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Database Validation Failed";
    errors = Object.values(err.errors).map((el) => el.message);
  }

  // Handle Mongoose Duplicate Key Errors
  if (err.code && err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field value entered for: ${field}.`;
  }

  // Handle Shopify API Rate Limit / Request Errors
  if (err.name === "ShopifyHTTPError" || err.response?.errors) {
    statusCode = err.response?.code || 502;
    message = "Shopify API Gateway Error: Unable to synchronize stock levels.";
    errors = err.response?.errors || [err.message];
  }

  // Console output for development debugging
  if (process.env.NODE_ENV !== "production") {
    console.error("💥 Internal Server Error Log:", {
      path: req.originalUrl,
      method: req.method,
      error: err.stack,
    });
  }

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    ...(errors && { errors }),
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

// Catch-All 404 Handler for Undefined Routes
export const notFound = (req, res, next) => {
  const error = new Error(`Route Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};