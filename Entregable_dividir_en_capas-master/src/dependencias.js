const logger = require("pino");
const compression = require('compression');
const fs = require('fs');
const { inspect } = require('util');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-local');
const LocalStrategy = Strategy;
const User= require('../src/models/User');
const bcrypt = require('bcrypt');
const {fork} = require('child_process');
const minimist=require('minimist');
const cluster = require('cluster');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");


module.exports = {logger, compression, fs, inspect, session, passport, Strategy, LocalStrategy, User, 
bcrypt, fork, minimist, cluster}
