import { NavLink, Link } from 'react-router-dom'  // ✅ Added Link back
import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Shows', path: '/shows' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' }
  ]

  const activeLinkClass = 'text-red-400 border-b-2 border-red-400'
  const inactiveLinkClass = 'text-white hover:text-red-400'

  return (
    <header className='fixed top-0 left-0 w-full bg-red-900/90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-red-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-4 sm:py-6'>
        <div className='flex justify-between items-center'>
          {/* ✅ Use Link for logo */}
          <Link to='/'>
            <img src={logo} alt='Koch Fm Logo' className='h-10 sm:h-12 md:h-15 w-auto' />
          </Link>

          <button onClick={toggleMenu} className='lg:hidden text-white hover:text-red-400 transition-colors'>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <nav className='hidden lg:flex flex-wrap items-center gap-8 xl:gap-12 font-semibold'>
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.path} 
                className={({ isActive }) => 
                  `transition-colors duration-300 text-sm xl:text-base ${
                    isActive ? activeLinkClass : inactiveLinkClass
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 py-4' : 'max-h-0'}`}>
          <nav className='flex flex-col items-center gap-3 font-semibold'>
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `transition-colors duration-300 text-base w-full text-center py-2 border-b border-red-800/50 last:border-0 ${
                    isActive ? 'text-red-400' : 'text-white hover:text-red-400'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar