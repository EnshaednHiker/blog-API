/*

const chai = require('chai');
const chaiHttp = require('chai-http');

const {
    app,
    runServer,
    closeServer
} = require('../server');
const {
    BlogPosts
} = require('../models');

const should = chai.should();

chai.use(chaiHttp);

describe('Blog API', function () {
    before(function () {
        return runServer();
    });

    after(function () {
        return closeServer();
    });
    it('should list all blogs on GET', function () {
        return chai.request(app)
            .get('/blog-posts')
            .then(function (res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.be.at.least(1);
                const expectedKeys = ['author', 'content', 'modifiedDate', 'publishDate', 'title'];
                res.body.forEach(function (item) {
                    item.should.be.a('object');
                    item.should.include.keys(expectedKeys);
                });
            });
    });
    it('should list a specific blog by ID on GET', function () {
        const testBlog = BlogPosts.create("Incredible Morning, Incredible Coffee", "Blah blah blah. Incredible morning, the most greatest coffee.", "Ira Glass", new Date(2015, 10, 3), new Date(2015, 10, 3));
        return chai.request(app)
            .get(`/blog-posts/${testBlog.id}`)
            .then(function (res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                const expectedKeys = ['author', 'content', 'modifiedDate', 'publishDate', 'title', 'id'];
                res.body.should.include.keys(expectedKeys);
                res.body.should.contain.any.keys({
                    id: testBlog.id
                });

            });
    });

    it('should add a blog on POST', function () {
        const testBlog2 = {
            title: "Incredible Morning, Incredible Coffee",
            content: "Blah blah blah. Incredible morning, the most greatest coffee.",
            author: "Ira Glass",
            publishDate: new Date(2017, 4, 7),
            modifiedDate: new Date(2017, 4, 7)
        };
        return chai.request(app)
            .post('/blog-posts')
            .send(testBlog2)
            .then(function (res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.include.keys('author', 'content', 'modifiedDate', 'publishDate', 'title', 'id');
                res.body.id.should.not.be.null;
                res.body.should.deep.equal(Object.assign(testBlog2, {
                    id: res.body.id,
                    publishDate: res.body.publishDate,
                    modifiedDate: res.body.modifiedDate
                }));
            });
    });

    it('should update a blog on PUT', function () {
        const updateBlogData = {
            title: "Horrible Morning, Horrible Coffee",
            content: "Blah blah blah. Horrible morning, the most horrible coffee.",
            author: "Ira Glass",
            publishDate: new Date(2017, 4, 7),
            modifiedDate: new Date(2017, 4, 7)
        };

        return chai.request(app)
            .get('/blog-posts')
            .then(function (res) {
                updateBlogData.id = res.body[0].id;
                return chai.request(app)
                    .put(`/blog-posts/${updateBlogData.id}`)
                    .send(updateBlogData);
            })
            .then(function (res) {
                res.should.have.status(204);
            });
    });

    it('should delete a blog on DELETE', function() {
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        return chai.request(app)
          .delete(`/blog-posts/${res.body[0].id}`);
      })
      .then(function(res) {
        res.should.have.status(204);
      });
    });
});

*/