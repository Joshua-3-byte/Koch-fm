import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Mic, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Music, 
  Heart, 
  Shield, 
  Radio,
  GraduationCap
} from 'lucide-react'

// images from public folder
const heroImages = [
  '/about1.jpg',
  '/about2.jpg',
  '/about3.jpg'
]

const AboutPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const programmaticAreas = [
    {
      icon: <Radio size={28} />,
      title: 'Radio Broadcasting',
      tagline: 'Live and pre-recorded programming that informs, educates and engages',
      description: 'Talk shows, interviews, documentaries, music and news that give community members, experts and duty bearers a shared platform — extended onto social media and digital platforms so the conversation continues beyond the airwaves.',
      color: 'bg-red-600',
      tags: ['Governance & Civic Participation', 'Health & Reproductive Health', 'Entrepreneurship & Livelihoods', 'WASH', 'Gender-Based Violence', 'Youth & Women Empowerment', 'Human Rights']
    },
    {
      icon: <Users size={28} />,
      title: 'Community Outreach & Engagement',
      tagline: 'Taking conversations from the airwaves into the community',
      description: 'Community forums, dialogues, focus group discussions and stakeholder engagements that bring together residents, local leaders, government and civil society to identify challenges and shape solutions together.',
      color: 'bg-red-500',
      tags: ['Community Forums', 'Public Dialogues', 'Focus Group Discussions', 'Stakeholder Engagement']
    },
    {
      icon: <GraduationCap size={28} />,
      title: 'Youth Empowerment, Training & Skills Development',
      tagline: 'Building the next generation of community media practitioners',
      description: 'Internships, attachments and hands-on training in radio production, news gathering, scriptwriting and digital content creation — a pathway from training into volunteering and, ultimately, the Koch FM team.',
      color: 'bg-red-600',
      tags: ['Radio Production', 'News Gathering & Reporting', 'Scriptwriting & Presentation', 'Digital Content Creation']
    }
  ]

  const communities = [
    'Korogocho', 'Kariobangi', 'Huruma', 'Mathare',
    'Babadogo', 'Dandora', 
  ]

  return (
    <div className='w-full bg-gray-100 min-h-screen'>
      
      {/* Hero Section with Sliding Images - Full Screen, No Padding */}
      <section className='relative bg-gradient-to-br from-red-900 to-red-800 text-white min-h-screen flex items-center justify-center overflow-hidden'>
        {/* Sliding Background Images */}
        <div className='absolute inset-0'>
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-30' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundColor: 'rgba(0,0,0,0.3)'
              }}
            />
          ))}
          {/* Dark overlay */}
          <div className='absolute inset-0 bg-black/60'></div>
        </div>
        
        <div className='relative z-10 max-w-7xl mx-auto px-4 text-center'>
          <div className='inline-block p-4 bg-red-600/20 rounded-full mb-6'>
            <Mic size={48} className='text-red-300' />
          </div>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4'>
            About Koch FM
          </h1>
          <p className='text-xl sm:text-2xl text-red-200 font-light mb-3'>
            The Voice of the Community
          </p>
          <p className='text-lg text-red-300'>
            99.9 FM • Serving Nairobi's People Settlement of Korogocho and sorroundings
          </p>
          <div className='mt-8 flex justify-center gap-4 flex-wrap'>
            <span className='px-4 py-2 bg-red-700/50 rounded-full text-sm'>Community Radio</span>
            <span className='px-4 py-2 bg-red-700/50 rounded-full text-sm'>Est. 2006</span>
            <span className='px-4 py-2 bg-red-700/50 rounded-full text-sm'>Non-Profit</span>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className='max-w-7xl mx-auto px-4 py-16 sm:py-20'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div>
            <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
              Our Story
            </h2>
            <div className='w-20 h-1 bg-red-600 mb-6'></div>
            <p className='text-gray-700 text-base sm:text-lg leading-relaxed mb-4'>
              Koch FM was born in <span className='font-semibold text-gray-900'>2006</span> when a group of <span className='font-semibold text-gray-900'>ten youth</span> from Korogocho decided to change the narrative. Tired of being portrayed only through stories of crime and poverty, they created a platform where residents could tell their own stories and celebrate their community.
            </p>
            <p className='text-gray-700 text-base sm:text-lg leading-relaxed'>
              Today, Koch FM stands as one of Kenya's earliest urban community radio initiatives, serving as a vital platform for community participation and positive change.
            </p>
          </div>
          <div 
            className='h-80 sm:h-96 rounded-xl bg-gray-300 bg-cover bg-center shadow-xl'
            style={{
              backgroundImage: 'url(/community2.jpg)',
              backgroundColor: '#d1d5db'
            }}
          >
  
          </div>
        </div>
      </section>

      {/* Mission & Purpose Section */}
      <section className='bg-gray-100 py-16 sm:py-20'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            
            {/* Mission */}
            <div className='bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300'>
              <div className='flex items-center gap-3 mb-4'>
                <h3 className='text-2xl font-bold text-gray-900'>Our Mission</h3>
              </div>
              <p className='text-gray-600 text-base leading-relaxed mb-4'>
                To provide a platform where the community can:
              </p>
              <ul className='space-y-2 text-gray-600'>
                <li className='flex items-start gap-3'>
                  <span className='text-red-500 mt-1 font-bold text-lg leading-none'>•</span>
                  <span>Share information relevant to local residents</span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-red-500 mt-1 font-bold text-lg leading-none'>•</span>
                  <span>Promote education and public awareness</span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-red-500 mt-1 font-bold text-lg leading-none'>•</span>
                  <span>Encourage dialogue on social, economic & governance issues</span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-red-500 mt-1 font-bold text-lg leading-none'>•</span>
                  <span>Give a voice to young people and underrepresented community members</span>
                </li>
              </ul>
            </div>

            {/* Purpose */}
            <div className='bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300'>
              <div className='flex items-center gap-3 mb-4'>
                <h3 className='text-2xl font-bold text-gray-900'>Our Purpose</h3>
              </div>
              <p className='text-gray-600 text-base leading-relaxed mb-4'>
                Koch FM operates as a non-partisan, non-discriminatory, and voluntary association of community change agents committed to:
              </p>
              <ul className='space-y-2 text-gray-600'>
                <li className='flex items-start gap-3'>
                  <span className='text-red-500 mt-1 font-bold text-lg leading-none'>•</span>
                  <span>Encouraging meaningful participation in societal processes</span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-red-500 mt-1 font-bold text-lg leading-none'>•</span>
                  <span>Educating and informing the community</span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-red-500 mt-1 font-bold text-lg leading-none'>•</span>
                  <span>Entertaining responsibly</span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-red-500 mt-1 font-bold text-lg leading-none'>•</span>
                  <span>Organizing and mobilizing communities</span>
                </li>
              </ul>
            </div>
          </div>
        </div> 
      </section>

      {/* Core Programs Section */}
      <section className='py-16 sm:py-20'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-14'>
            <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 flex items-center justify-center gap-3'>
              Our Core Programs
            </h2>
            <div className='w-20 h-1 bg-red-600 mx-auto mt-4'></div>
            <p className='text-gray-600 max-w-2xl mx-auto mt-4'>
              Three interconnected areas that carry Koch FM's work from the studio, into the community, and back again.
            </p>
          </div>

          <div className='space-y-6'>
            {programmaticAreas.map((area, index) => (
              <div 
                key={index}
                className='bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300'
              >
                <div className='flex flex-col sm:flex-row gap-6'>
                  <div className='flex sm:flex-col items-center sm:items-start gap-4 sm:gap-3 sm:w-56 shrink-0'>
                    <div className={`w-14 h-14 rounded-full ${area.color} flex items-center justify-center text-white shrink-0`}>
                      {area.icon}
                    </div>
                    <div>
                      <h4 className='font-bold text-gray-900 text-lg leading-snug'>{area.title}</h4>
                    </div>
                  </div>
                  <div className='flex-1'>
                    <p className='text-red-600 text-sm font-semibold mb-2'>{area.tagline}</p>
                    <p className='text-gray-600 text-sm sm:text-base leading-relaxed mb-4'>
                      {area.description}
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      {area.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className='px-3 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full border border-red-200'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Community Section */}
      <section className='bg-gray-100 py-16 sm:py-20'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
                Our Community
              </h2>
              <div className='w-20 h-1 bg-red-600 mb-6'></div>
              <p className='text-gray-700 text-base sm:text-lg leading-relaxed mb-6'>
                Koch FM primarily serves Korogocho and neighbouring communities within Nairobi's eastern region, empowering residents to participate directly in programme production and discussions affecting their lives.
              </p>
              <div className='flex flex-wrap gap-2'>
                {communities.map((place, index) => (
                  <span key={index} className='px-4 py-2 bg-red-50 text-red-700  text-sm font-medium border border-red-200'>
                    {place}
                  </span>
                ))}
              </div>
            </div>
            <div 
              className='h-80 sm:h-96 rounded-xl bg-gray-300 bg-cover bg-center shadow-xl'
              style={{
                backgroundImage: 'url(/community1.jpg)',
                backgroundColor: '#d1d5db'
              }}
            >

            </div>
          </div>
        </div>
      </section>

      {/* Join the Conversation Section */}
      <section className='bg-gradient-to-br from-red-900 to-red-800 text-white py-16 sm:py-20'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
            Join the Conversation
          </h2>
          <p className='text-lg text-red-200 max-w-2xl mx-auto mb-8'>
            Tune in to <span className='font-bold text-white'>99.9 FM</span> or reach out to us to share your story, suggest topics, or get involved in our community programming.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <Link 
              to='/contact' 
              className='px-6 py-3 bg-white text-red-700 rounded-lg font-semibold hover:bg-red-50 transition-colors duration-300 flex items-center gap-2'
            >
              <Phone size={20} /> Contact Us
            </Link>
            <a 
              href='/' 
              className='px-6 py-3 bg-red-700/50 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300 flex items-center gap-2 border border-red-500/30'
            >
              <Mail size={20} /> Email Us
            </a>
            <a 
              href='/' 
              className='px-6 py-3 bg-red-700/50 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300 flex items-center gap-2 border border-red-500/30'
            >
              <MapPin size={20} /> Visit Us
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}

export default AboutPage