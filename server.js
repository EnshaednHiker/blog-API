const express = require('express');
const morgan = require('morgan');

const server = express();

const blogRouter = require('./blogRouter');

server.use(morgan('common'));

server.use('/blog-posts', recipesRouter);

server.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});