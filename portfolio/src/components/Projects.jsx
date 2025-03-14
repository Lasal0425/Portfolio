// components/Projects.js
import React from 'react';

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
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">My Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;