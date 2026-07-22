import { Link } from 'react-router-dom'
import React from 'react'
import logo from '../assets/logo.png';


const Navbar = () => {




  return (
    <header
      className='fixed top-0 left-0 w-full
      bg-red-900/90 backdrop-blur-md shadow-lg z-40
      transition-all duration-300 border-b border-red-800'
    >
      <div className='max-w-7xl mx-auto px-8 lg:px-10 py-6'>
        <div className='flex flex-wrap justify-between items-center'>
          <Link to='/'>
            <img
              src={logo}
              alt='Koch Fm Logo'
              className='h-15 w-auto'
            />
          </Link>

          <nav className='flex flex-wrap items-center gap-12 font-semibold'>
            {/* Changed hover color to red-400 */}
            <Link
              to='/'
              className='transition-colors duration-300 hover:text-red-400'
            >
              Home
            </Link>

            {/* Changed hover color to red-400 */}
            <Link
              to='/'
              className='transition-colors duration-300 hover:text-red-400'
            >
              About
            </Link>

            {/* Changed hover color to red-400 */}
            <Link
              to='/'
              className='transition-colors duration-300 hover:text-red-400'
            >
              Blogs
            </Link>

            {/* Changed hover color to red-400 */}
            <Link
              to='/'
              className='transition-colors duration-300 hover:text-red-400'
            >
              Shows
            </Link>

            {/* Changed hover color to red-400 */}
            <Link
              to='/'
              className='transition-colors duration-300 hover:text-red-400'
            >
              Projects
            </Link>

            {/* Changed hover color to red-400 */}
            <Link
              to='/'
              className='transition-colors duration-300 hover:text-red-400'
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar