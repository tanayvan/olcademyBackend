const Blog = require("../models/blogSchema");
const path = require("path");
exports.createBlog = (req, res) => {
  var blog = new Blog({
    name: req.body.name,
    content: req.body.content,
    mediaName: req.file.filename,
  });
  blog.save((err, blog) => {
    if (err) {
      return res.status(400).json({
        error: "error saving blog in DB",
      });
    }
    res.json(blog);
  });
};

exports.getBlogById = (req, res, next, id) => {
  Blog.findById(id).exec((err, blog) => {
    if (err) {
      return res.status(400).json({
        error: "Blog Not Found",
      });
    }
    req.blog = blog;
    next();
  });
};

exports.getBlog = (req, res) => {
  return res.json(req.blog);
};

exports.updateBlog = (req, res) => {
  if (req.file) {
    req.body.mediaName = req.file.filename;
  }
  if (!req.blog) {
    return res.status(400).json({
      error: "Incorrect Id",
    });
  }
  Blog.findByIdAndUpdate(req.blog._id, req.body, { new: true }, (err, blog) => {
    if (err) {
      return res.status(400).json({
        error: "error updating blog",
      });
    }
    res.json(blog);
  });
};

exports.deleteBlog = (req, res) => {
  if (!req.blog) {
    return res.status(400).json({
      error: "Incorrect Id",
    });
  }
  Blog.findByIdAndDelete(req.blog._id, (err, deletedBlog) => {
    if (err) {
      return res.status(400).json({
        error: "error Deleting blog",
      });
    }
    res.json({
      message: "Blog Deleted Succesfully",
    });
  });
};
