require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

app.post("/api/shorturl", function(req, res){
  if(dns.lookup(res.query.original_url), (err, address, family)=>{
    if(err){ throw err; }
    console.log(`IP Adress ${address}, IP family: IPv${family}`);
    
    res.json({original_url: req.query.original_url, short_url: 1});
  });

});

app.get("/api/:short_url", function(req, res){
  res.redirect(req.query.original_url);
});