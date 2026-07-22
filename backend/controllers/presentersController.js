import Presenter from '../models/Presenter.js'
import cloudinary from '../config/cloudinary.js'

export async function getAllPresenters(req, res) {
  try {
    const allPresenters = await Presenter.find().sort({ createdAt: -1 })
    res.status(200).json(allPresenters)
  } catch (error) {
    console.error('Error in getAllPresenters controller', error);
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export async function createPresenter(req, res) {
  try {
    const { name, bio, image, socialLinks } = req.body

    // Validate required fields
    if (!name || !bio || !image) {
      return res.status(400).json({ message: 'Name, bio, and image are required' })
    }

    let cloudinaryResponse = null

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: 'presenter' })
    }

    const newPresenter = new Presenter({
      name,
      bio,
      image: cloudinaryResponse ? cloudinaryResponse.secure_url : '',
      socialLinks: socialLinks || { twitter: '', instagram: '', facebook: '' }
    })

    await newPresenter.save()
    res.status(201).json(newPresenter)

  } catch (error) {
    console.error('Error in CreatePresenter controller', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export async function updatePresenter(req, res) {
  try {
    const { name, bio, image, socialLinks } = req.body
    const presenter = await Presenter.findById(req.params.id)

    if (!presenter) {
      return res.status(404).json({ message: 'Presenter not Found!' })
    }

    let imageUrl = presenter.image

    if (image && !image.startsWith('http')) {
      if (presenter.image) {
        const publicid = presenter.image.split('/').pop().split('.')[0]
        try {
          await cloudinary.uploader.destroy(`presenter/${publicid}`)
        } catch (error) {
          console.error('Error Deleting Image from Cloudinary', error)
        }
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: 'presenter' })
      imageUrl = cloudinaryResponse.secure_url
    }

    presenter.name = name || presenter.name
    presenter.bio = bio || presenter.bio
    presenter.socialLinks = socialLinks || presenter.socialLinks
    presenter.image = imageUrl

    await presenter.save()
    res.json(presenter)

  } catch (error) {
    console.error('Error in updatePresenter controller', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export async function deletePresenter(req, res) {
  try {
    const presenter = await Presenter.findById(req.params.id)

    if (!presenter) {
      return res.status(404).json({ message: 'Presenter not Found!' })
    }

    if (presenter.image) {
      const publicid = presenter.image.split('/').pop().split('.')[0]
      try {
        await cloudinary.uploader.destroy(`presenter/${publicid}`)
      } catch (error) {
        console.error('Error Deleting Image from Cloudinary', error)
      }
    }

    await Presenter.findByIdAndDelete(req.params.id)
    return res.json({ message: 'Presenter Deleted Successfully' })

  } catch (error) {
    console.error('Error in deletePresenter controller', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}