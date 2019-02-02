'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const QuoteSchema = new Schema({
  movie: {
    type: String,
    required: 'Please enter the name of the movie'
  },
  character: {
    type: String,
    required: 'Please enter the name of the character'
  },
  body: {
    type: String,
    required: 'Please enter the quote from the character'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Quotes', QuoteSchema);
