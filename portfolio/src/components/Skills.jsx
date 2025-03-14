// components/Skills.js
import React from 'react';

function Skills() {
  const programmingLanguages = [
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' }
  ];
  
  const frameworks = [
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' }
  ];
  
  const tools = [
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' },
    { icon: '/images/notion-icon.svg' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg' }
  ];
  
  return (
    <section className="py-16 bg-gradient-to-b from-black to-green-900/40 text-green-400">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-fuchsia-400 text-pink">My Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-green-900/20 backdrop-blur-sm border-2 border-green-400 p-6 rounded-lg shadow-lg shadow-green-400/30">
            <h3 className="text-xl font-bold mb-4 text-center text-cyan-400-">Programming Languages</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {programmingLanguages.map((skill, index) => (
                <div 
                  key={index} 
                  className="bg-black/60 border-2 border-green-400 text-green-400 px-3 py-2 rounded-full text-sm hover:bg-green-400/20 transition-colors duration-300 flex items-center space-x-2 shadow-md shadow-green-400/20"
                >
                  <div className="bg-green-400 rounded-full p-3 flex items-center justify-center shadow-lg shadow-green-400/50 hover:scale-110 transition-transform duration-300">
                    <img 
                      src={skill.icon} 
                      alt={`${skill.name} logo`} 
                      className="w-10 h-10" 
                    />
                  </div>
                  <span className="font-semibold">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-cyan-900/20 backdrop-blur-sm border-2 border-cyan-400 p-6 rounded-lg shadow-lg shadow-cyan-400/30">
            <h3 className="text-xl font-bold mb-4 text-center text-fuchsia-400 text-pink">Frameworks & Libraries</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {frameworks.map((skill, index) => (
                <div 
                  key={index} 
                  className="bg-black/60 border-2 border-cyan-400 text-cyan-400 px-3 py-2 rounded-full text-sm hover:bg-cyan-400/20 transition-colors duration-300 flex items-center space-x-2 shadow-md shadow-cyan-400/20"
                >
                  <div className="bg-cyan-400 rounded-full p-1 flex items-center justify-center">
                    <img 
                      src={skill.icon} 
                      alt={`${skill.name} logo`} 
                      className="w-10 h-10" 
                    />
                  </div>
                  <span className="font-semibold">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-fuchsia-900/20 backdrop-blur-sm border-2 border-fuchsia-400 p-6 rounded-lg shadow-lg shadow-fuchsia-400/30">
            <h3 className="text-xl font-bold mb-4 text-center text-cyan-400 text-blue">Tools & Technologies</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {tools.map((skill, index) => (
                <div 
                  key={index} 
                  className="bg-black/60 border-2 border-fuchsia-400 text-fuchsia-400 px-3 py-2 rounded-full text-sm hover:bg-fuchsia-400/20 transition-colors duration-300 flex items-center space-x-2 shadow-md shadow-fuchsia-400/20"
                >
                  <div className="bg-fuchsia-400 rounded-full p-1 flex items-center justify-center">
                    <img 
                      src={skill.icon} 
                      alt={`${skill.name} logo`} 
                      className="w-10 h-10" 
                    />
                  </div>
                  <span className="font-semibold">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-cyan-900/20 backdrop-blur-sm border-2 border-cyan-400 p-6 rounded-lg shadow-lg shadow-cyan-400/30 relative overflow-hidden">
            {/* Matrix-like decoration in background */}
            <div className="absolute inset-0 opacity-20 select-none pointer-events-none overflow-hidden">
              <div className="matrix-code text-green-500 text-xs">
                01001100 01010010 01001100 01010010 01001100 01010010
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-4 text-center text-fuchsia-400 text-pink">Certifications</h3>
            <div className="flex justify-center">
              <div className="bg-black/60 border-2 border-green-400 text-green-400 px-4 py-3 rounded-lg relative glow-green flex items-center">
                {/* Postman Logo with background */}
                <div className="bg-green-400 rounded-full p-1.5 flex items-center justify-center mr-3">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" 
                    alt="Postman logo" 
                    className="w-5 h-5" 
                  />
                </div>
                <div>
                  <p className="font-bold">Postman API Fundamentals Student Expert</p>
                  <p className="text-sm text-green-400/90">Issued in Dec 2024</p>
                </div>
                {/* Green pulsing dot */}
                <div className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-green-400 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add CSS for the effects */}
      <style jsx>{`
        .matrix-code {
          font-family: monospace;
          line-height: 1.2;
        }
        
        .glow-green {
          box-shadow: 0 0 15px rgba(0, 255, 65, 0.4);
        }
        
        .glow-text-blue {
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.7);
        }
        
        .glow-text-pink {
          text-shadow: 0 0 10px rgba(255, 0, 255, 0.7);
        }
      `}</style>
    </section>
  );
}

export default Skills;