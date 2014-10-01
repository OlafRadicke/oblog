"use strict";
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/oblog');

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});


module.exports = function(req, res){
    res.render('add_article.jade');
}
