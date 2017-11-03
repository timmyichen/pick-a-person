const express = require('express');
const engines = require('consolidate');
const config = require('./config/config');
const MongoClient = require('mongodb').MongoClient;

const apiRoutes = require('./api/index');

const app = express();


MongoClient.connect(config.keys.mongoURI, (err, db) => {
  if (err) console.log(`failed to connect to the database: ${err}`);
  console.log('Successfully connected to database');
  
  app.locals.db = db;
  
  app.use('/api', apiRoutes);
  
  app.get('*.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
  });
  
  app.engine('njk', engines.nunjucks);
  app.set('view engine', 'njk');
  app.set('views', __dirname + '/views');
  app.use(express.static('public'));
  
  app.get('*', (req, res) => {
    res.render('pages/index', {
      appname: config.APPNAME
    });
  });
  
  app.listen(config.PORT, function () {
    console.log(`App currently running; navigate to localhost:${config.PORT} in a web browser.`);
  });
    
});