import cloudinary from "../config/cloudinary.js";
import Blog from "../models/Blog.js";

// ALL Blogs
export async function getAllBlog(req, res) {
  try {
    const allBlog = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(allBlog);
  } catch (error) {
    console.error('Error in getAllBlog controller', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// GET SINGLE Blog BY ID
export async function getSingleBlog(req, res) {
  try {
    // ✅ Fixed: Use a different variable name to avoid shadowing
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.json(blog);
  } catch (error) {
    console.error('Error in getSingleBlog controller', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// CREATE Blog
export async function createBlog(req, res) {
  try {
    const { image, title, author, content } = req.body;
    let cloudinaryResponse = null;

    if (!image || !title || !author || !content) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: 'blog' });
    }

    const newBlog = new Blog({
      image: cloudinaryResponse ? cloudinaryResponse.secure_url : '',
      title,
      author,
      content,
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error in CreateBlog controller', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// UPDATE Blog
export async function updateBlog(req, res) {
  try {
    const { image, title, author, content } = req.body;
    // ✅ Fixed: Use a different variable name
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not Found!' });
    }

    let imageUrl = blog.image;

    if (image && !image.startsWith('http')) {
      if (blog.image) {
        const publicid = blog.image.split('/').pop().split('.')[0];
        try {
          await cloudinary.uploader.destroy(`blog/${publicid}`);
        } catch (error) {
          console.error('Error Deleting Image from Cloudinary', error);
        }
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: 'blog' });
      imageUrl = cloudinaryResponse.secure_url;
    }

    blog.title = title || blog.title;
    blog.author = author || blog.author;
    blog.content = content || blog.content;
    blog.image = imageUrl;

    await blog.save();
    res.json(blog);
  } catch (error) {
    console.error('Error in updateBlog controller', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// DELETE Blog
export async function deleteBlog(req, res) {
  try {
    // ✅ Fixed: Use a different variable name
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not Found!' });
    }

    if (blog.image) {
      const publicid = blog.image.split('/').pop().split('.')[0];
      try {
        await cloudinary.uploader.destroy(`blog/${publicid}`);
      } catch (error) {
        console.error('Error Deleting Image from Cloudinary', error);
      }
    }

    await Blog.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Blog Deleted Successfully' });
  } catch (error) {
    console.error('Error in deleteBlog controller', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}