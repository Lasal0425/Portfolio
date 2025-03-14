// components/Projects.js
import React from 'react';
import { motion } from "framer-motion";

function Projects() {
  const projects = [
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
  
  return (
    <section className="py-20 bg-black text-green-400 border-t border-cyan-400/20 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-400 inline-block text-transparent bg-clip-text mb-4">
            My Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-400 mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
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
        </div>
      </div>
    </section>
  );
}

export default Projects;