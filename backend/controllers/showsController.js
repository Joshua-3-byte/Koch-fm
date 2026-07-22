import cloudinary from "../config/cloudinary.js";
import { redis } from "../config/redis.js";
import Show from "../models/Show.js";

// GET ALL SHOWS
export async function getAllShows(req, res) {
  try {
    // Fetches all shows, populates the host info, and sorts by newest first
    const allShows = await Show.find()
      .populate("host", "name image bio")
      .sort({ createdAt: -1 });

    res.status(200).json(allShows);
  } catch (error) {
    console.error('Error in getAllShows controller', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// CREATE SHOW
export async function createShow(req, res) {
  try {
    const { title, description, image, host, scheduleType, dayOfWeek, dayRangeStart, dayRangeEnd, startTime, endTime } = req.body;
    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: 'show' });
    }

    // ✅ Validation
    if (scheduleType === 'single' && !dayOfWeek) {
      return res.status(400).json({ message: 'Day of week is required for single day schedule' });
    }
    if (scheduleType === 'range' && (!dayRangeStart || !dayRangeEnd)) {
      return res.status(400).json({ message: 'Start and end days are required for range schedule' });
    }

    const newShow = new Show({
      title,
      description,
      image: cloudinaryResponse ? cloudinaryResponse.secure_url : '',
      host,
      scheduleType,
      dayOfWeek: scheduleType === 'single' ? dayOfWeek : undefined,
      dayRangeStart: scheduleType === 'range' ? dayRangeStart : undefined,
      dayRangeEnd: scheduleType === 'range' ? dayRangeEnd : undefined,
      startTime,
      endTime
    });

    await newShow.save();

    const populatedShow = await Show.findById(newShow._id).populate("host", "name image bio");
    res.status(201).json(populatedShow);
  } catch (error) {
    console.error('Error in createShow controller', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// UPDATE SHOW
export async function updateShow(req, res) {
  try {
    const { title, description, image, host, scheduleType, dayOfWeek, dayRangeStart, dayRangeEnd, startTime, endTime } = req.body;
    const show = await Show.findById(req.params.id);

    if (!show) {
      return res.status(404).json({ message: 'Show not Found!' });
    }

    let imageUrl = show.image;

    if (image && !image.startsWith('http')) {
      if (show.image) {
        const publicid = show.image.split('/').pop().split('.')[0];
        try {
          await cloudinary.uploader.destroy(`show/${publicid}`);
        } catch (error) {
          console.error('Error Deleting Image from Cloudinary', error);
        }
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: 'show' });
      imageUrl = cloudinaryResponse.secure_url;
    }

    show.title = title || show.title;
    show.description = description || show.description;
    show.host = host || show.host;
    show.scheduleType = scheduleType || show.scheduleType;
    
    if (scheduleType === 'single') {
      show.dayOfWeek = dayOfWeek || show.dayOfWeek;
      show.dayRangeStart = undefined;
      show.dayRangeEnd = undefined;
    } else if (scheduleType === 'range') {
      show.dayRangeStart = dayRangeStart || show.dayRangeStart;
      show.dayRangeEnd = dayRangeEnd || show.dayRangeEnd;
      show.dayOfWeek = undefined;
    }
    
    show.startTime = startTime || show.startTime;
    show.endTime = endTime || show.endTime;
    show.image = imageUrl;

    await show.save();

    const populatedShow = await Show.findById(show._id).populate("host", "name image bio");
    res.json(populatedShow);
  } catch (error) {
    console.error('Error in updateShow controller', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// DELETE SHOW
export async function deleteShow(req, res) {
  try {
    const show = await Show.findById(req.params.id);

    if (!show) {
      return res.status(404).json({ message: 'Show not Found!' });
    }

    // Removes image from Cloudinary asset storage
    if (show.image) {
      const publicid = show.image.split('/').pop().split('.')[0];
      try {
        await cloudinary.uploader.destroy(`show/${publicid}`);
      } catch (error) {
        console.error('Error Deleting Image from Cloudinary', error);
      }
    }

    await Show.findByIdAndDelete(req.params.id);
    
    // Invalidates outdated cache lists
    await redis.del('all_shows');
    await redis.del(`shows_day_${show.dayOfWeek}`);

    return res.json({ message: 'Show Deleted' });
  } catch (error) {
    console.error('Error in deleteShow controller', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
