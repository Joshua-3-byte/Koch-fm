import { redis } from "../config/redis.js"
import User from "../models/User.js"
import jwt from 'jsonwebtoken'

const generateToken = (userId) => {
  const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m', 
  })

  const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d'
  })

  return {accessToken, refreshToken}
}

const storeRefreshToken = async(userId, refreshToken) => {
  await redis.set(`refresh_token:${userId}`, refreshToken, { EX: 7*24*60*60 })
}

const setCookies = (res, accessToken, refreshToken) => {
  const isProduction = process.env.NODE_ENV === 'production'
  
  res.cookie('accessToken', accessToken, {
    httpOnly: true, 
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'strict',
    maxAge: 15 * 60 * 1000,
    domain: isProduction ? '.onrender.com' : undefined
  })
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true, 
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    domain: isProduction ? '.onrender.com' : undefined
  })
}

// SIGNUP
export async function adminSignup(req,res)  {
  try {
    const {email,password} = req.body
    const existingUser = await User.findOne({email})

    if(existingUser) {
      return res.status(400).json({message: 'Email Already Exist! Login'})
    }

    const newUser = new User({email,password})
  
    const {accessToken, refreshToken} = generateToken(newUser._id)
  
    await storeRefreshToken(newUser._id, refreshToken)

    setCookies(res,accessToken,refreshToken)

    await newUser.save()
    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      role: newUser.role
    })
  } catch (error) {
    console.error('Error in Signup controller', error)
    res.status(500).json({ error: error.message })
  }
}

// LOGIN
export async function adminLogin(req,res)  {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await user.comparePassword(password))) {
      const {accessToken,refreshToken} = generateToken(user._id)

      await storeRefreshToken(user._id, refreshToken)
      setCookies(res, accessToken, refreshToken)

      res.json({
        _id: user._id,
        email: user.email,
        role: user.role
      })
    } else {
      return res.status(401).json({message: 'Invalid email or password'})
    }
  } catch (error) {
    console.error('Error in Login controller', error)
    res.status(500).json({message: 'Internal Server Error'})
  }
}

// LOGOUT
export async function adminLogout(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      await redis.del(`refresh_token:${decoded.userId}`);
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    
    return res.json({ message: 'Logged Out Successfully' });
  } catch (error) {
    console.error('Error in Logout controller', error)

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
}

// REFRESH ACCESS TOKEN
export async function refreshToken(req, res) {
try {
  const refreshToken = req.cookies.refreshToken

  if(!refreshToken) {
    return res.status(401).json({message: 'No refresh Token Provided'})
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
  const storedToken = await redis.get(`refresh_token:${decoded.userId}`)

  if(storedToken !== refreshToken) {
    return res.status(401).json({message: 'Invalid Refresh Token'})
  }

  const accessToken = jwt.sign({userId: decoded.userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})

  res.cookie('accessToken', accessToken,{
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    maxAge: 15 * 60 * 1000,
    domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : undefined
  })

  res.json({message: 'Token Refreshed'})
} catch ( error) {
  console.error( 'Error in RefresToken controller', error)
  res.status(500).json({message: 'Internal Server Error'})
}
}

// ✅ FIXED - Send only necessary data
export async function getProfile(req, res) {
  try {
    res.json({
      _id: req.user._id,
      email: req.user.email,
      role: req.user.role
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}