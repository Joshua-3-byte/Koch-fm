import React, { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      title: 'APHRC Chefs Project',
      description: 'Koch FM, in partnership with African Population and Health Research Center, is implementing a school feeding program at Daniel Comboni Primary School and Tortolla Rehema School in Korogocho.',
      image: '/project1.jpg',
      align: 'left'
    },
    {
      id: 2,
      title: 'Climate Change & Food Systems',
      description: 'A community engagement initiative focused on raising awareness about climate change, food systems, and health in partnership with APHRC.',
      image: '/project2.jpg',
      align: 'right'
    },
    {
      id: 3,
      title: 'Safaricom@25 Celebrations',
      description: 'Koch FM joined Safaricom in the on-the-ground celebrations during the Safaricom@25 campaign, bringing the community together for this milestone event.',
      image: '/project3.jpg',
      align: 'left'
    },
    {
      id: 4,
      title: 'Youth Empowerment Program',
      description: 'A comprehensive program designed to equip young people in Korogocho with skills, mentorship, and opportunities for personal and professional growth.',
      image: '/project1.jpg',
      align: 'right'
    },
    {
      id: 5,
      title: 'Community Health Outreach',
      description: 'Mobile health clinics and awareness campaigns bringing essential healthcare services and health education directly to the community.',
      image: '/project2.jpg',
      align: 'left'
    },
    {
      id: 6,
      title: 'Environmental Clean-Up Drive',
      description: 'A community-led initiative to clean and beautify Korogocho, promoting environmental sustainability and community pride.',
      image: '/project3.jpg',
      align: 'right'
    }
  ]

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  }

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  }

  const imageZoom = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <div className='w-full bg-gray-100 min-h-screen'>
      
      {/* Hero Section */}
      <section className='relative bg-gradient-to-br from-red-900 to-red-800 text-white min-h-[50vh] flex items-center justify-center overflow-hidden'>
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
            
          </motion.div>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4'>
            Our Projects
          </h1>
          <p className='text-xl sm:text-2xl text-red-200 font-light max-w-2xl mx-auto'>
            Empowering the community through impactful initiatives
          </p>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className='max-w-7xl mx-auto px-4 py-16 sm:py-20'>
        <div className='space-y-20'>
          {projects.map((project, index) => {
            const isLeft = project.align === 'left'
            
            return (
              <motion.div
                key={project.id}
                className={`flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
              >
                {/* Image */}
                <motion.div 
                  className='w-full lg:w-1/2 h-64 sm:h-80 md:h-96 overflow-hidden'
                  variants={imageZoom}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className='w-full h-full object-cover'
                  />
                </motion.div>

                {/* Content */}
                <motion.div 
                  className='w-full lg:w-1/2 p-6 sm:p-8 lg:p-10'
                  variants={isLeft ? slideInLeft : slideInRight}
                >
                  <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-4 hover:text-red-600 transition-colors duration-300'>
                    {project.title}
                  </h2>
                  <p className='text-gray-600 text-sm sm:text-base leading-relaxed'>
                    {project.description}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </div> 
      </section>

    </div>
  )
}

export default ProjectsPage