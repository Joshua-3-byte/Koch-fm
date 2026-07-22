import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Phone, Mail, MapPin } from 'lucide-react'
import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className='w-full bg-red-950/95 backdrop-blur-sm border-t border-red-800 mt-12'>
      <div className='max-w-7xl mx-auto px-8 lg:px-10 py-12'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          
          {/* Column 1: Brand */}
          <div>
            <Link to='/' className='inline-block mb-4'>
              <img
                src={logo}
                alt='Koch FM Logo'
                className='h-12 w-auto'
              />
            </Link>
            <p className='text-gray-300 text-sm leading-relaxed'>
              The voice of the community. News, local talent, and real youth conversations live from Kariobangi.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className='text-white font-semibold text-lg mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link to='/' className='text-gray-300 hover:text-red-400 transition-colors duration-200 text-sm'>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/about' className='text-gray-300 hover:text-red-400 transition-colors duration-200 text-sm'>
                  About
                </Link>
              </li>
              <li>
                <Link to='/shows' className='text-gray-300 hover:text-red-400 transition-colors duration-200 text-sm'>
                  Shows
                </Link>
              </li>
              <li>
                <Link to='/news' className='text-gray-300 hover:text-red-400 transition-colors duration-200 text-sm'>
                  News
                </Link>
              </li>
              <li>
                <Link to='/contact' className='text-gray-300 hover:text-red-400 transition-colors duration-200 text-sm'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className='text-white font-semibold text-lg mb-4'>Contact Us</h3>
            <ul className='space-y-3'>
              <li className='flex items-center gap-3 text-gray-300 text-sm'>
                <Phone size={18} className='text-red-400 flex-shrink-0' />
                <span>0745 608505</span>
              </li>
              <li className='flex items-center gap-3 text-gray-300 text-sm'>
                <Mail size={18} className='text-red-400 flex-shrink-0' />
                <span>info@kochfm.com</span>
              </li>
              <li className='flex items-center gap-3 text-gray-300 text-sm'>
                <MapPin size={18} className='text-red-400 flex-shrink-0' />
                <span>Kariobangi, Nairobi</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div>
            <h3 className='text-white font-semibold text-lg mb-4'>Follow Us</h3>
            <div className='flex gap-4'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 rounded-full bg-red-800/50 hover:bg-red-700 flex items-center justify-center transition-colors duration-300 text-gray-300 hover:text-white'
                aria-label='Facebook'
              >
                <FaFacebook size={20} />
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 rounded-full bg-red-800/50 hover:bg-red-700 flex items-center justify-center transition-colors duration-300 text-gray-300 hover:text-white'
                aria-label='Twitter'
              >
                <FaXTwitter size={20} />
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 rounded-full bg-red-800/50 hover:bg-red-700 flex items-center justify-center transition-colors duration-300 text-gray-300 hover:text-white'
                aria-label='Instagram'
              >
                <FaInstagram size={20} />
              </a>
              <a
                href='https://tiktok.com'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 rounded-full bg-red-800/50 hover:bg-red-700 flex items-center justify-center transition-colors duration-300 text-gray-300 hover:text-white'
                aria-label='TikTok'
              >
                <FaTiktok size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-red-800/50 mt-8 pt-6'>
          <p className='text-center text-gray-400 text-sm'>
            © {new Date().getFullYear()} KOCH FM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer