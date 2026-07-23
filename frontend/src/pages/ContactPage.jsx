import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const ContactPage = () => {
  const contactInfo = [
    {
      icon: <Phone size={28} className='text-red-500' />,
      title: 'Phone',
      details: ['0745 608505']
    },
    {
      icon: <Mail size={28} className='text-red-500' />,
      title: 'Email',
      details: ['info@kochfm.com']
    },
    {
      icon: <MapPin size={28} className='text-red-500' />,
      title: 'Address',
      details: ['Kariobangi, Nairobi, Kenya']
    },
    {
      icon: <Clock size={28} className='text-red-500' />,
      title: 'Working Hours',
      details: ['Mon-Fri: 6:00 AM - 10:00 PM', 'Sat-Sun: 8:00 AM - 8:00 PM']
    }
  ]

  const socialLinks = [
    { icon: <FaFacebook size={24} />, label: 'Facebook', href: 'https://facebook.com' },
    { icon: <FaXTwitter size={24} />, label: 'Twitter', href: 'https://twitter.com' },
    { icon: <FaInstagram size={24} />, label: 'Instagram', href: 'https://instagram.com' },
    { icon: <FaTiktok size={24} />, label: 'TikTok', href: 'https://tiktok.com' }
  ]

  return (
    <div className='w-full bg-gray-100 min-h-screen'>
      
      {/* Hero Section - Red background extends below cards */}
      <section className='relative bg-gradient-to-br from-red-900 to-red-800 text-white pb-48 pt-16 sm:pt-20 overflow-hidden'>
        <div className='absolute inset-0 bg-black/40'></div>
        
        <motion.div 
          className='relative z-10 max-w-7xl mx-auto px-4 text-center'
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='inline-block p-4 bg-red-600/30 rounded-full mb-6'
          >
            <span className='text-4xl'>📬</span>
          </motion.div>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4'>
            Contact Us
          </h1>
          <p className='text-xl sm:text-2xl text-red-200 font-light max-w-2xl mx-auto'>
            We'd love to hear from you — reach out to us anytime
          </p>
        </motion.div>
      </section>

      {/* Contact Cards - Overlapping the hero with more overlap */}
      <section className='max-w-7xl mx-auto px-4 -mt-40 relative z-20'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              className='bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className='w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3'>
                {item.icon}
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-1'>{item.title}</h3>
              {item.details.map((detail, i) => (
                <p key={i} className='text-gray-600 text-sm'>{detail}</p>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className='max-w-7xl mx-auto px-4 py-16'>
        <motion.div
          className='rounded-2xl overflow-hidden shadow-xl border border-gray-200'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className='w-full h-96 bg-gray-300 flex items-center justify-center'>
            <div className='text-center'>
              <MapPin size={48} className='text-red-500 mx-auto mb-2' />
              <p className='text-gray-600 text-lg'>Kariobangi, Nairobi</p>
              <p className='text-gray-400 text-sm'>Google Map will be embedded here</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Social Links */}
      <section className='max-w-7xl mx-auto px-4 pb-16'>
        <motion.div
          className='bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>📲 Follow Us</h2>
          <div className='flex justify-center gap-6 flex-wrap'>
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target='_blank'
                rel='noopener noreferrer'
                className='w-14 h-14 rounded-full bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md'
                whileHover={{ y: -3 }}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

    </div>
  )
}

export default ContactPage