const routes = (app) => {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    const blogSchema = require('../models/blogModel');
    const blogModel = mongoose.model('blog', blogSchema);
    app.post('/blogs/create', (req, res) => {
        let blog = new blogModel(req.body);
        blog.save((err, blogModel) => {
            if (err) {
                res.send(err);
            }
            res.json(blog);
        })
    });

    let getAllBlogs = (req, res) => {
        blogModel.find({}, (err, blogs) => {
            if (err) {
                res.send(err);
            }
            res.json(blogs);
        })
    }
    app.get('/blogs/getall', getAllBlogs);

    let getBlogById = (req, res) => {
        blogModel.findById((req.params.id), (err, blog) => {
            if (err) {
                res.send(err);
            }
            res.json(blog);

        })
    }
    app.get('/blogs/getone/:id', getBlogById);

    app.get('/blogs/getall', getAllBlogs);

    let updateBlog = (req, res) => {
        blogModel.findByIdAndUpdate((req.params.id), req.body, { new: true }, (err, blog) => {
            if (err) {
                res.send(err);
            }
            res.json(blog);

        })
    }
    app.put('/blogs/update/:id', updateBlog);

    let deleteBlog = (req, res) => {
        blogModel.deleteOne({_id: req.params.id}, (err, blog) => {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Blog deleted successfully!'});

        })
    }
    app.delete('/blogs/delete/:id', deleteBlog);
}

module.exports = routes;