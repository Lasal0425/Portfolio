import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Projects() {
  const [activeTab, setActiveTab] = useState('tech');

  const programmingProjects = [
    {
      title: "RiVVE Hostel Marketplace",
      description: "Developed a hostel booking platform for the System Development Group Project using React, Tailwind CSS, Node.js, and Express.js, with features like Google Maps integration and user reviews.",
      technologies: ["React", "Tailwind CSS", "Node.js", "Express.js"]
    },
    {
      title: "Event Ticketing System",
      description: "Built a CLI-based Java app with real-time ticketing, multi-threading, and JSON-based configuration using Java, Spring boot and React.",
      technologies: ["Java", "Spring Boot", "React", "JSON"]
    },
    {
      title: "Cybersecurity Incident Analysis on Target Corp (2013)",
      description: "Investigated the 2013 Target breach, analyzing vulnerabilities, threats, and mitigation strategies to improve cybersecurity resilience.",
      technologies: ["Security Analysis", "Threat Modeling"]
    },
    {
      title: "Sustainable Development Goal (SDG) Themed Website",
      description: "Designed a responsive website promoting UN Goal 13 with HTML, CSS, and JavaScript.",
      technologies: ["HTML", "CSS", "JavaScript"]
    },
    {
      title: "Airplane Seat Management System",
      description: "Developed a Java tool for seat reservations, pricing, and cancellations.",
      technologies: ["Java"]
    },
    {
      title: "University Progression Prediction Program",
      description: "Built a Python app to predict student progression using credit data.",
      technologies: ["Python", "Machine Learning"]
    }
  ];
  
  const aiesecFlyers = [
    {
      title: "Global Volunteer Program",
      description: "Promotional flyer for AIESEC's international volunteer opportunities.",
      impact: "Increased program applications by 25% in the target demographic."
    },
    {
      title: "Leadership Summit 2024",
      description: "Event promotional material for AIESEC's annual leadership conference.",
      impact: "Helped achieve record attendance with 300+ participants."
    },
    {
      title: "Cultural Exchange Initiative",
      description: "Campaign materials for cross-cultural learning programs.",
      impact: "Supported 50+ successful international exchanges."
    },
    {
      title: "SDG Awareness Campaign",
      description: "Educational flyers on Sustainable Development Goals.",
      impact: "Increased campus engagement with sustainability initiatives."
    },
    {
      title: "Local Volunteer Recruitment",
      description: "Recruitment materials for new AIESEC members.",
      impact: "Contributed to 40% growth in local chapter membership."
    }
  ];
  
  const tabVariants = {
    active: {
      color: "#fff",
      textShadow: "0 0 8px rgba(129, 230, 217, 0.8)",
      transition: { duration: 0.5 }
    },
    inactive: {
      color: "rgba(129, 230, 217, 0.5)",
      textShadow: "none",
      transition: { duration: 0.5 }
    }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };
  
  // Background scan effect animation
  const scanEffect = {
    initial: { top: "-100%" },
    animate: { 
      top: "100%",
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };
  
  return (
    <section className="py-20 bg-black text-green-400 border-t border-cyan-400/20 min-h-screen relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-400 inline-block text-transparent bg-clip-text mb-4">
            My Portfolio
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-400 mx-auto"></div>
        </motion.div>
        
        {/* Tab switcher */}
        <div className="flex justify-center mb-12 relative">
          <div className="bg-black/50 backdrop-blur-sm border border-cyan-400/30 rounded-full p-1 flex gap-2 relative">
            {/* Active tab indicator */}
            <motion.div 
              className="absolute h-full top-0 bottom-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-fuchsia-400/20 z-0"
              initial={{ width: "50%", left: activeTab === 'tech' ? "0%" : "50%" }}
              animate={{ left: activeTab === 'tech' ? "0%" : "50%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            
            {/* Tech Projects Tab */}
            <motion.button
              onClick={() => setActiveTab('tech')}
              className={`px-6 py-2 text-lg font-medium z-10 relative ${activeTab === 'tech' ? 'text-white' : 'text-cyan-400/50'}`}
              variants={tabVariants}
              animate={activeTab === 'tech' ? 'active' : 'inactive'}
            >
              Tech Projects
              {activeTab === 'tech' && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-transparent opacity-0 rounded-full"
                  initial={scanEffect.initial}
                  animate={scanEffect.animate}
                />
              )}
            </motion.button>
            
            {/* AIESEC Projects Tab */}
            <motion.button
              onClick={() => setActiveTab('aiesec')}
              className={`px-6 py-2 text-lg font-medium z-10 relative ${activeTab === 'aiesec' ? 'text-white' : 'text-cyan-400/50'}`}
              variants={tabVariants}
              animate={activeTab === 'aiesec' ? 'active' : 'inactive'}
            >
              AIESEC Designs
              {activeTab === 'aiesec' && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-transparent opacity-0 rounded-full"
                  initial={scanEffect.initial}
                  animate={scanEffect.animate}
                />
              )}
            </motion.button>
          </div>
        </div>
        
        {/* Content container */}
        <AnimatePresence mode="wait">
          {activeTab === 'tech' && (
            <motion.div 
              key="tech"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {programmingProjects.map((project, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-black border border-green-400/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-400/70 group relative"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-fuchsia-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Digital circuit pattern overlay */}
                  <div className="absolute inset-0 bg-circuit-pattern opacity-5 mix-blend-overlay"></div>
                  
                  <div className="p-6 relative z-10">
                    <h3 className="text-xl font-semibold mb-3 text-fuchsia-400">{project.title}</h3>
                    <p className="text-green-400/80 mb-4 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="bg-black border border-cyan-400/50 text-cyan-400 text-xs px-2 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Binary code effect */}
                    <div className="absolute bottom-2 right-2 text-green-400/30 text-xs font-mono">
                      01011
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          {activeTab === 'aiesec' && (
            <motion.div 
              key="aiesec"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full"
            >
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                  rotate: 20,
                  stretch: 0,
                  depth: 200,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="mySwiper w-full py-12"
              >
                {aiesecFlyers.map((flyer, index) => (
                  <SwiperSlide key={index} className="w-3/4 md:w-1/2 lg:w-2/5">
                    <div className="bg-black border-2 border-fuchsia-400/50 rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-400 group relative h-96">
                      {/* Placeholder for flyer image - replace with actual images */}
                      <div className="h-full w-full bg-gradient-to-br from-cyan-900/30 to-fuchsia-900/30 flex items-center justify-center">
                        <span className="text-6xl text-fuchsia-400/70 font-bold">
                          {flyer.title.split(' ').map(word => word[0]).join('')}
                        </span>
                      </div>
                      
                      {/* Glowing hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-fuchsia-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Caption */}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4 border-t border-cyan-400/30">
                        <h3 className="text-xl font-semibold mb-2 text-fuchsia-400">{flyer.title}</h3>
                        <p className="text-green-400/80 text-sm mb-2">{flyer.description}</p>
                        <p className="text-cyan-400 text-xs">{flyer.impact}</p>
                      </div>
                      
                      {/* Digital scan effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 to-transparent opacity-0 group-hover:animate-scan"></div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Info text */}
              <div className="text-center mt-8 text-cyan-400/80">
                <p>Click on a flyer to view details. Swipe or use arrows to navigate.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Add this to your global CSS */}
      <style jsx>{`
        @keyframes scan {
          0% { top: -100%; opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default Projects;