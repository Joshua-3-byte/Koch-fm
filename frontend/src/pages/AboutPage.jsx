import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mic,
  MapPin,
  Phone,
  Mail,
  Users
} from 'lucide-react';

// Your images from public folder
const heroImages = [
  '/about1.jpg',
  '/about2.jpg',
  '/about3.jpg'
];

const AboutPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const communities = [
    'Korogocho',
    'Kariobangi',
    'Huruma',
    'Mathare',
    'Babadogo',
    'Dandora'
  ];

  const programmaticAreas = [
    {
      number: '01',
      title: 'Radio Broadcasting',
      statement:
        'Radio broadcasting is at the heart of Koch FM’s work.',
      description:
        'We produce and broadcast both live and pre-recorded programmes designed to inform, educate, entertain and engage our audience on issues that directly affect their lives.',
      details: [
        'Live radio talk shows, interviews, radio features, documentaries, music programmes, news production, public service announcements and community-focused discussions.',
        'A platform for community members, experts, government representatives, civil society organizations, youth, women and other stakeholders to share information, discuss challenges and explore practical solutions.'
      ],
      focus: [
        'Governance and civic participation',
        'Health, maternal and reproductive health',
        'Entrepreneurship and livelihoods',
        'Access to healthcare',
        'Water, sanitation and hygiene',
        'Gender-based violence',
        'Youth and women empowerment',
        'Human rights and community development'
      ]
    },
    {
      number: '02',
      title: 'Radio & Digital Media',
      statement:
        'Conversations do not have to end when the broadcast does.',
      description:
        'Koch FM complements its radio broadcasting with social media and digital platforms, allowing us to extend conversations beyond the airwaves and reach audiences who increasingly consume information online.',
      details: [
        'Through social media, we share programme highlights, news updates, community stories, awareness messages, short videos, audience questions, campaign content and other digital materials.',
        'Our digital platforms provide an additional space for listeners and community members to interact with the station, participate in discussions and share their views.'
      ],
      focus: [
        'Programme highlights and news updates',
        'Community stories and awareness messages',
        'Short videos and digital content',
        'Audience questions and participation',
        'Campaign content and public engagement',
        'Connecting conversations from radio to online spaces'
      ]
    },
    {
      number: '03',
      title: 'Community Outreach & Engagement',
      statement:
        'Meaningful community development goes beyond the radio studio.',
      description:
        'Through our community outreach and engagement activities, we create opportunities for people to meet, share experiences, identify challenges and collectively develop solutions.',
      details: [
        'We organize and facilitate community forums, community dialogues, focus group discussions, public awareness activities, stakeholder engagements and other outreach events.',
        'By taking conversations from the airwaves into the community, and bringing community experiences back to the airwaves, we strengthen the link between media, citizens and decision-makers.'
      ],
      focus: [
        'Community forums and dialogues',
        'Focus group discussions',
        'Public awareness activities',
        'Stakeholder engagement',
        'Community participation and ownership',
        'Connecting people with services and opportunities'
      ]
    },
    {
      number: '04',
      title: 'Youth Empowerment, Training & Skills Development',
      statement:
        'Developing skills, confidence and leadership for the next generation.',
      description:
        'As a youth-focused community media organization, Koch FM places strong emphasis on developing the skills, confidence and leadership potential of young people.',
      details: [
        'We provide internship, attachment, volunteering and practical training opportunities for young people interested in media, journalism, radio production and community engagement.',
        'Participants gain hands-on experience in radio production, news gathering and reporting, interviewing, scriptwriting, presentation, programme development, studio operations, digital content creation and community outreach.'
      ],
      focus: [
        'Internship and attachment opportunities',
        'Practical media and journalism training',
        'Radio production and studio operations',
        'News gathering and reporting',
        'Digital content creation',
        'Community volunteering and engagement'
      ]
    }
  ];

  return (
    <div className='w-full bg-gray-100 min-h-screen'>

      {/* Hero Section with Sliding Images - Full Screen */}
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
            <span className='px-4 py-2 bg-red-700/50 rounded-full text-sm'>
              Community Radio
            </span>

            <span className='px-4 py-2 bg-red-700/50 rounded-full text-sm'>
              Est. 2006
            </span>

            <span className='px-4 py-2 bg-red-700/50 rounded-full text-sm'>
              Non-Profit
            </span>
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
              Koch FM was born in{' '}
              <span className='font-semibold text-gray-900'>2006</span>{' '}
              when a group of{' '}
              <span className='font-semibold text-gray-900'>ten youth</span>{' '}
              from Korogocho decided to change the narrative. Tired of being
              portrayed only through stories of crime and poverty, they created
              a platform where residents could tell their own stories and
              celebrate their community.
            </p>

            <p className='text-gray-700 text-base sm:text-lg leading-relaxed'>
              Today, Koch FM stands as one of Kenya's earliest urban community
              radio initiatives, serving as a vital platform for community
              participation and positive change.
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
                <h3 className='text-2xl font-bold text-gray-900'>
                  Our Mission
                </h3>
              </div>

              <p className='text-gray-600 text-base leading-relaxed mb-4'>
                To provide a platform where the community can:
              </p>

              <ul className='space-y-2 text-gray-600'>

                <li className='flex items-start gap-3'>
                  <span className='text-red-600 mt-1 font-black text-lg'>
                    •
                  </span>
                  <span>Share information relevant to local residents</span>
                </li>

                <li className='flex items-start gap-3'>
                  <span className='text-red-600 mt-1 font-black text-lg'>
                    •
                  </span>
                  <span>Promote education and public awareness</span>
                </li>

                <li className='flex items-start gap-3'>
                  <span className='text-red-600 mt-1 font-black text-lg'>
                    •
                  </span>
                  <span>
                    Encourage dialogue on social, economic & governance issues
                  </span>
                </li>

                <li className='flex items-start gap-3'>
                  <span className='text-red-600 mt-1 font-black text-lg'>
                    •
                  </span>
                  <span>
                    Give a voice to young people and underrepresented community
                    members
                  </span>
                </li>

              </ul>
            </div>

            {/* Purpose */}
            <div className='bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300'>

              <div className='flex items-center gap-3 mb-4'>
                <h3 className='text-2xl font-bold text-gray-900'>
                  Our Purpose
                </h3>
              </div>

              <p className='text-gray-600 text-base leading-relaxed mb-4'>
                Koch FM operates as a non-partisan, non-discriminatory, and
                voluntary association of community change agents committed to:
              </p>

              <ul className='space-y-2 text-gray-600'>

                <li className='flex items-start gap-3'>
                  <span className='text-red-600 mt-1 font-black text-lg'>
                    •
                  </span>
                  <span>
                    Encouraging meaningful participation in societal processes
                  </span>
                </li>

                <li className='flex items-start gap-3'>
                  <span className='text-red-600 mt-1 font-black text-lg'>
                    •
                  </span>
                  <span>Educating and informing the community</span>
                </li>

                <li className='flex items-start gap-3'>
                  <span className='text-red-600 mt-1 font-black text-lg'>
                    •
                  </span>
                  <span>Entertaining responsibly</span>
                </li>

                <li className='flex items-start gap-3'>
                  <span className='text-red-600 mt-1 font-black text-lg'>
                    •
                  </span>
                  <span>Organizing and mobilizing communities</span>
                </li>

              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Our Programmatic Areas */}
      <section className='py-20 sm:py-24 bg-gray-200 overflow-hidden'>

        <div className='max-w-7xl mx-auto px-4'>

          {/* Programmatic Header */}
          <div className='max-w-3xl mb-16 sm:mb-20'>

            <div className='flex items-center gap-4 mb-5'>
              

              <span className='text-red-600 font-bold text-sm tracking-[0.2em] uppercase'>
                What We Do
              </span>
            </div>

            <h2 className='text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight'>
              Our Programmatic
              <span className='block text-red-600'>
                Areas.
              </span>
            </h2>

            <p className='text-gray-600 text-lg sm:text-xl leading-relaxed mt-6 max-w-2xl'>
              Koch FM uses community media as a platform for information,
              education, dialogue, empowerment and community action. Our work
              is delivered through interconnected areas that bring people,
              ideas and opportunities together.
            </p>
          </div>

          {/* Programmatic Areas */}
          <div className='space-y-8'>

            {programmaticAreas.map((area, index) => (

              <article
                key={index}
                className='group relative border border-gray-200 bg-white overflow-hidden transition-all duration-500 hover:border-red-200 hover:shadow-2xl'
              >

                {/* Animated red line */}
                <div className='h-1 bg-red-600 w-0 group-hover:w-full transition-all duration-500'></div>

                <div className='grid grid-cols-1 lg:grid-cols-12'>

                  {/* Number */}
                  <div className='lg:col-span-2 p-7 sm:p-8 lg:p-10 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200 flex lg:flex-col justify-between'>

                    <span className='text-6xl sm:text-7xl font-bold text-red-100 group-hover:text-red-200 transition-colors duration-500'>
                      {area.number}
                    </span>

                    <div className='mt-6'>
                      

                      <span className='text-xs font-bold tracking-[0.18em] uppercase text-gray-500'>
                        Program Area
                      </span>
                    </div>

                  </div>

                  {/* Content */}
                  <div className='lg:col-span-7 p-7 sm:p-10'>

                    <h3 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-5 group-hover:text-red-700 transition-colors duration-300'>
                      {area.title}
                    </h3>

                    <p className='text-red-700 font-semibold text-base sm:text-lg leading-relaxed mb-5'>
                      {area.statement}
                    </p>

                    <p className='text-gray-700 text-base leading-relaxed mb-6'>
                      {area.description}
                    </p>

                    <div className='space-y-4 pt-6 border-t border-gray-100'>

                      {area.details.map((detail, idx) => (
                        <p
                          key={idx}
                          className='text-gray-600 text-sm sm:text-base leading-relaxed'
                        >
                          {detail}
                        </p>
                      ))}

                    </div>

                  </div>

                  {/* Focus */}
                  <div className='lg:col-span-3 bg-gray-50 p-7 sm:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-gray-200'>

                    <p className='text-xs font-bold tracking-[0.2em] uppercase text-red-600 mb-6'>
                      Key Focus
                    </p>

                    <div className='space-y-4'>

                      {area.focus.map((item, idx) => (

                        <div
                          key={idx}
                          className='flex items-start gap-3'
                        >
                          <span className='text-red-600 font-black text-lg leading-5'>
                            •
                          </span>

                          <span className='text-sm text-gray-700 leading-relaxed font-medium'>
                            {item}
                          </span>
                        </div>

                      ))}

                    </div>

                  </div>

                </div>

              </article>

            ))}

          </div>

          {/* Our Approach */}
          <div className='mt-16 sm:mt-20 relative bg-gradient-to-br from-red-900 to-red-800 text-white overflow-hidden'>

            {/* Background decoration */}
            <div className='absolute -top-24 -right-24 w-72 h-72 bg-red-700/30 rounded-full blur-3xl'></div>

            <div className='absolute -bottom-24 -left-24 w-72 h-72 bg-red-950/30 rounded-full blur-3xl'></div>

            <div className='relative z-10 p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center'>

              <div className='lg:col-span-4'>

                <div className='w-12 h-1 bg-red-300 mb-6'></div>

                <h3 className='text-3xl sm:text-4xl font-bold leading-tight'>
                  Our
                  <span className='block text-red-200'>
                    Approach.
                  </span>
                </h3>

              </div>

              <div className='lg:col-span-8'>

                <p className='text-red-100 text-base sm:text-lg leading-relaxed'>
                  Across all three areas, Koch FM is committed to community
                  participation, inclusion, local ownership and practical
                  action. We believe that when communities have access to
                  relevant information, meaningful platforms for dialogue and
                  opportunities to develop their skills, they are better
                  equipped to identify solutions and participate actively in
                  the development of their communities.
                </p>

                <div className='mt-8 pt-6 border-t border-red-700/70'>

                  <p className='text-white font-bold text-lg sm:text-xl'>
                    Koch FM, Mobilizing Community Action through Media.
                  </p>

                </div>

              </div>

            </div>

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
                Koch FM primarily serves Korogocho and neighbouring communities
                within Nairobi's eastern region, empowering residents to
                participate directly in programme production and discussions
                affecting their lives.
              </p>

              <div className='flex flex-wrap gap-2'>

                {communities.map((place, index) => (
                  <span
                    key={index}
                    className='px-4 py-2 bg-red-50 text-red-700 text-sm font-medium border border-red-200'
                  >
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
            Tune in to{' '}
            <span className='font-bold text-white'>99.9 FM</span>{' '}
            or reach out to us to share your story, suggest topics, or get
            involved in our community programming.
          </p>

          <div className='flex flex-wrap justify-center gap-4'>

            <Link
              to='/contact'
              className='px-6 py-3 bg-white text-red-700 rounded-lg font-semibold hover:bg-red-50 transition-colors duration-300 flex items-center gap-2'
            >
              <Phone size={20} />
              Contact Us
            </Link>

            <a
              href='/'
              className='px-6 py-3 bg-red-700/50 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300 flex items-center gap-2 border border-red-500/30'
            >
              <Mail size={20} />
              Email Us
            </a>

            <a
              href='/'
              className='px-6 py-3 bg-red-700/50 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300 flex items-center gap-2 border border-red-500/30'
            >
              <MapPin size={20} />
              Visit Us
            </a>

          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutPage;