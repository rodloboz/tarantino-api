'use strict';
const mongoose = require('mongoose'),
  Quote = mongoose.model('Quotes');

exports.list_all_quotes = function(req, res) {
  Quote.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_quote = function(req, res) {
  const new_quote = new Quote(req.body);
  new_quote.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.read_a_quote = function(req, res) {
  Quote.findById(req.params.quoteId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_a_quote = function(req, res) {
  Quote.findOneAndUpdate({_id: req.params.quoteId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.delete_a_quote = function(req, res) {
  Quote.remove({
    _id: req.params.quoteId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Quote successfully deleted' });
  });
};
