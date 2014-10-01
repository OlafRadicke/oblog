"use strict";


module.exports = function(req, res){
    console.log('new artikele....');

    var mongoose = require('mongoose');
    mongoose.createConnection('mongodb://localhost/oblog');

    var Article = mongoose.model(
        'Article',
        {
            title: String,
            body: String
        }
    );

    var new_article = new Article({
        title: 'Titel',
        body: 'Der Text'
    });
    new_article.save(function (err) {
      if (err) // ...
      console.log('save...');
    });

    mongoose.connection.close();
    res.render('add_article.jade');
}
