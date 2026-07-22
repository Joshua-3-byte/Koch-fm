import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const SocialIcons = () => {
  return (
    <div className='flex gap-8'>
      <a 
        href='https://facebook.com' 
        target='_blank'
        rel='noopener noreferrer'
        className='text-gray-400 hover:text-red-400 transition-colors duration-300'
        aria-label='Facebook'
      >
        <FaFacebook size={24} />
      </a>
      <a 
        href='https://twitter.com' 
        target='_blank'
        rel='noopener noreferrer'
        className='text-gray-400 hover:text-red-400 transition-colors duration-300'
        aria-label='Twitter'
      >
        <FaXTwitter size={24} />
      </a>
      <a 
        href='https://instagram.com' 
        target='_blank'
        rel='noopener noreferrer'
        className='text-gray-400 hover:text-red-400 transition-colors duration-300'
        aria-label='Instagram'
      >
        <FaInstagram size={24} />
      </a>
      <a 
        href='https://tiktok.com' 
        target='_blank'
        rel='noopener noreferrer'
        className='text-gray-400 hover:text-red-400 transition-colors duration-300'
        aria-label='TikTok'
      >
        <FaTiktok size={24} />
      </a>
    </div>
  )
}

export default SocialIcons