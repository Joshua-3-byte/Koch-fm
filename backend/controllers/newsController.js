import cloudinary from "../config/cloudinary.js";
import { redis } from "../config/redis.js";
import News from "../models/News.js";

// ALL NEWS
export async function getAllNews(req, res) {
  try {
    const allNews = await News.find().sort({ createdAt: -1 });
    res.status(200).json(allNews);
  } catch (error) {
    console.error('Error in getAllNews controller', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// GET SINGLE NEWS BY ID
export async function getSingleNews(req, res) {
  try {
    const news = await News.findById(req.params.id);
    
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    
    res.json(news);
  } catch (error) {
    console.error('Error in getSingleNews controller', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// BREAKING NEWS
export async function getBreakingNews(req, res) {
  try {
    let breakingNews = await redis.get('breaking_news');

    if (breakingNews) {
      return res.json(JSON.parse(breakingNews));
    }

    breakingNews = await News.find({ isBreaking: true }).sort({ createdAt: -1 }).lean();

    // ✅ Return empty array instead of 404
    return res.json(breakingNews);
  } catch (error) {
    console.error('Error in getBreakingNews Controller', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// TRENDING NEWS
export async function getTrendingNews(req, res) {
  try {
    const news = await News.aggregate([
      { $sample: { size: 3 } },
      {
        $project: {
          _id: 1,
          image: 1,
          title: 1,
          tag: 1,
          author: 1,
          content: 1
        }
      }
    ]);
    res.json(news);
  } catch (error) {
    console.error('Error in TrendingNews controller', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// CREATE NEWS
export async function createNews(req, res) {
  try {
    const { image, title, tag, author, content, isBreaking } = req.body;
    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: 'news' });
    }

    const newNews = new News({
      image: cloudinaryResponse ? cloudinaryResponse.secure_url : '',
      title,
      tag,
      author,
      content,
      isBreaking: isBreaking || false
    });

    await newNews.save();

    if (newNews.isBreaking) {
      await redis.del('breaking_news');
    }

    res.status(201).json(newNews);
  } catch (error) {
    console.error('Error in CreateNews controller', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// UPDATE NEWS
export async function updateNews(req, res) {
  try {
    const { image, title, tag, author, content, isBreaking } = req.body;
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: 'News not Found!' });
    }

    let imageUrl = news.image;

    if (image && !image.startsWith('http')) {
      if (news.image) {
        const publicid = news.image.split('/').pop().split('.')[0];
        try {
          await cloudinary.uploader.destroy(`news/${publicid}`);
        } catch (error) {
          console.error('Error Deleting Image from Cloudinary', error);
        }
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: 'news' });
      imageUrl = cloudinaryResponse.secure_url;
    }

    news.title = title || news.title;
    news.tag = tag || news.tag;
    news.author = author || news.author;
    news.content = content || news.content;
    news.image = imageUrl;
    news.isBreaking = isBreaking !== undefined ? isBreaking : news.isBreaking;

    await news.save();
    await redis.del('breaking_news');

    res.json(news);
  } catch (error) {
    console.error('Error in updateNews controller', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// DELETE NEWS
export async function deleteNews(req, res) {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: 'News not Found!' });
    }

    if (news.image) {
      const publicid = news.image.split('/').pop().split('.')[0];
      try {
        await cloudinary.uploader.destroy(`news/${publicid}`);
      } catch (error) {
        console.error('Error Deleting Image from Cloudinary', error);
      }
    }

    if (news.isBreaking) {
      await redis.del('breaking_news');
    }

    await News.findByIdAndDelete(req.params.id);
    return res.json({ message: 'News Deleted' });
  } catch (error) {
    console.error('Error in deleteNews controller', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// GET NEWS BY CATEGORY
export async function getNewsByCategory(req, res) {
  const { category } = req.params;
  try {
    const news = await News.find({ tag: category }).sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    console.error('Error in getNewsByCategory controller', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
