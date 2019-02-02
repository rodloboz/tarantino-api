'use strict';
module.exports = function(app) {
  const quoteList = require('../controllers/quoteListController');

  // todoList Routes
  app.route('/quotes')
    .get(quoteList.list_all_quotes)
    .post(quoteList.create_a_quote);


  app.route('/quotes/:quoteId')
    .get(quoteList.read_a_quote)
    .patch(quoteList.update_a_quote)
    .delete(quoteList.delete_a_quote);
};
