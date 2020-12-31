const express = require("express");
const router = express.Router();
var multer = require("multer");
const path = require("path");
const {
  createBlog,
  getBlogById,
  getBlog,
  updateBlog,
  deleteBlog,
  getMediaData,
} = require("../controllers/blog");
const Blog = require("../models/blogSchema");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "video/mp4"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.param("blogId", getBlogById);

router.post("/create", upload.single("media"), createBlog);
router.put("/update/:blogId", upload.single("media"), updateBlog);
router.delete("/delete/:blogId", deleteBlog);
router.get("/:blogId", getBlog);
router.get("/media/:blogId", (req, res) => {
  var options = {
    root: path.join(__dirname, ".."),
  };
  res.sendFile(`/uploads/${req.blog.mediaName}`, options, (err) => {
    if (err) {
      return res.json({
        error: "error Getting Media File",
      });
    }
  });
});

module.exports = router;
