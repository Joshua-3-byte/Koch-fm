import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Phone, Mail, MapPin } from 'lucide-react'
import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className='w-full bg-red-950/95 backdrop-blur-sm border-t border-red-800 mt-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-8 sm:py-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
          
          {/* Column 1: Brand */}
          <div className='text-center sm:text-left'>
            <Link to='/' className='inline-block mb-4'>
              <img src={logo} alt='Koch FM Logo' className='h-10 sm:h-12 w-auto mx-auto sm:mx-0' />
            </Link>
            <p className='text-gray-300 text-xs sm:text-sm leading-relaxed'>
              The voice of the community. News, local talent, and real youth conversations live from Kariobangi.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className='text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-center sm:text-left'>Quick Links</h3>
            <ul className='space-y-1.5 sm:space-y-2 text-center sm:text-left'>
              {['Home', 'About', 'Shows', 'News', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to='/' className='text-gray-300 hover:text-red-400 transition-colors duration-200 text-xs sm:text-sm'>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className='text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-center sm:text-left'>Contact Us</h3>
            <ul className='space-y-2 sm:space-y-3'>
              <li className='flex items-center justify-center sm:justify-start gap-2 sm:gap-3 text-gray-300 text-xs sm:text-sm'>
                <Phone size={16} className='text-red-400 flex-shrink-0' />
                <span>0745 608505</span>
              </li>
              <li className='flex items-center justify-center sm:justify-start gap-2 sm:gap-3 text-gray-300 text-xs sm:text-sm'>
                <Mail size={16} className='text-red-400 flex-shrink-0' />
                <span>info@kochfm.com</span>
              </li>
              <li className='flex items-center justify-center sm:justify-start gap-2 sm:gap-3 text-gray-300 text-xs sm:text-sm'>
                <MapPin size={16} className='text-red-400 flex-shrink-0' />
                <span>Kariobangi, Nairobi</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div>
            <h3 className='text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-center sm:text-left'>Follow Us</h3>
            <div className='flex justify-center sm:justify-start gap-3 sm:gap-4'>
              {[FaFacebook, FaXTwitter, FaInstagram, FaTiktok].map((Icon, index) => (
                <a key={index} href='#' target='_blank' rel='noopener noreferrer' className='w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-800/50 hover:bg-red-700 flex items-center justify-center transition-colors duration-300 text-gray-300 hover:text-white'>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className='border-t border-red-800/50 mt-6 sm:mt-8 pt-4 sm:pt-6'>
          <p className='text-center text-gray-400 text-xs sm:text-sm'>
            © {new Date().getFullYear()} KOCH FM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer