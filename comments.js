// create a web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// In order to parse the body of a POST request, we need to add the body-parser middleware to our Express app.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET /comments
app.get('/comments', function(req, res) {
  // Read the comments.json file and return the comments as JSON
  fs.readFile('comments.json', function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('Oops, something went wrong');
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

// POST /comments
app.post('/comments', function(req, res) {
  // Read the comments.json file
  fs.readFile('comments.json', function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('Oops, something went wrong');
      return;
    }
    // Parse the JSON data
    var comments = JSON.parse(data);
    // Create a new comment
    var newComment = {
            id: comments.length + 1,
            text: req.body.text
          };
          // Add the new comment to the comments array
          comments.push(newComment);
          // Write the updated comments array back to the comments.json file
          fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
            if (err) {
              console.log(err);
              res.status(500).send('Oops, something went wrong');
              return;
            }
            res.status(201).send('Comment added');
          });
        });
      });