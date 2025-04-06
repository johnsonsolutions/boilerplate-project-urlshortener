require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns');
const { error, log } = require('console');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use(bodyParser.urlencoded({extended: false}));

let urls = {
  "test": "https://yahoo.com/"
};

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

app.post("/api/shorturl", function(req, res){

  let valid = false;

  let url = req.body.url;

  try{
    let urlObj = new URL(url);

    dns.lookup(urlObj.hostname, (err)=>{
      if(err){ res.json({error: 'invalid url'}); return; }
      else{ valid = true; }
    });

    if(valid){
      let short = Math.floor(Math.random() * 1000);
      urls[short] = url;
      res.json({original_url: url, short: short});
    }
    else{ res.json({error: 'invalid url'}); }
  }
  catch { res.json({error: 'invalid url'}); return; }
});

app.get("/api/:short_url", function(req, res){

  ////res.redirect("https://freecodecamp.org/");
  res.redirect(urls[req.params.short_url]);
  
  //res.json({all: urls, selected: urls[req.params.short_url]});

});