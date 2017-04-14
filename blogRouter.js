
const bodyParser = require('body-parser');

const express = require('express');
const router = express.Router();
router.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {Blog} = require('./models');

router.get('/', (req, res) => {
    const filters = {};
    const queryableFields = Object.keys(req.body);
    queryableFields.forEach(field => {
        if (req.query[field]) {
            filters[field] = req.query[field];
        }
    });
    Blog
        .find(filters)
        .exec()
        .then(Blogs => res.json(
            Blogs.map(blog => blog.apiRepr())
        ))
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal server error'})
        });
});

router.get('/:id', (req, res) => {
  Blog
    // this is a convenience method Mongoose provides for searching
    // by the object _id property
    .findById(req.params.id)
    .exec()
    .then(blog =>res.json(blog.apiRepr()))
    .catch(err => {
      console.error(err);
        res.status(500).json({message: 'Internal server error'})
    });
});

router.post('/', (req, res) => {

  const requiredFields = ["title",  "content", "author"];
  
  requiredFields.forEach(field => {
    
    if (!(field in req.body)) {
      const message = `Missing ${field} in request body, you dummy!`
      console.error(message);
      return res.status(400).send(message);
    }
  });

  Blog
    .create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    })
    .then(blog => res.status(201).json(blog.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    })
  });



router.put('/:id', (req, res) => {
  
  if (!(req.params.id && req.body.id && req.body.id === req.params.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    res.status(400).json({message: message});
  }

  const toUpdate = {};
  const updateableFields = ['title', 'content', 'author'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Blog
    // all key/value pairs in toUpdate will be updated -- that's what `$set` does
    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .exec()
    .then(blog => res.status(201).json(blog.apiRepr()))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.delete('/:id', (req, res) => {
  Blog
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(blog => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});

module.exports = router;