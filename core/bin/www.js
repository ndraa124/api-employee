#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from "../app";
import debugLib from "debug";
import http from "http";
import https from "https";
import fs from "fs";
import dotenv from "dotenv";
const debug = debugLib("aou-notes:server");
dotenv.config();

const port = normalizePort(process.env.PORT || "4000");
app.set("port", port);

let options, server;
if (process.env.NODE_ENV === "production") {
  options = {
    key: fs.readFileSync(__dirname + "/id_key.key"),
    cert: fs.readFileSync(__dirname + "/id_cert.crt"),
    ca: fs.readFileSync(__dirname + "/ca_bundle.ca_bundle"),
  };
  server = https.createServer(options, app);
} else {
  server = http.createServer(app);
}

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
