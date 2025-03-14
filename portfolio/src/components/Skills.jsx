// components/Skills.js
import React from 'react';

function Skills() {
  const programmingLanguages = [
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' }
  ];
  
  const frameworks = [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' }
  ];
  
  const tools = [
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'Canva', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' },
    { name: 'Notion', icon: '/images/notion-icon.svg' }, // You'll need to provide this icon
    { name: 'Adobe Photoshop', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
    { name: 'Adobe AfterEffects', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg' }
  ];
  
  return (
    <section className="py-16 bg-black text-green-400">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-fuchsia-400">My Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-black border border-green-400/30 p-6 rounded-lg shadow-lg shadow-green-400/20">
            <h3 className="text-xl font-semibold mb-4 text-center text-cyan-400">Programming Languages</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {programmingLanguages.map((skill, index) => (
                <div 
                  key={index} 
                  className="bg-black border border-green-400 text-green-400 px-3 py-2 rounded-full text-sm hover:bg-green-400/10 transition-colors duration-300 flex items-center space-x-2"
                >
                  <img 
                    src={skill.icon} 
                    alt={`${skill.name} logo`} 
                    className="w-5 h-5 filter invert opacity-80" 
                  />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-black border border-cyan-400/30 p-6 rounded-lg shadow-lg shadow-cyan-400/20">
            <h3 className="text-xl font-semibold mb-4 text-center text-fuchsia-400">Frameworks & Libraries</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {frameworks.map((skill, index) => (
                <div 
                  key={index} 
                  className="bg-black border border-cyan-400 text-cyan-400 px-3 py-2 rounded-full text-sm hover:bg-cyan-400/10 transition-colors duration-300 flex items-center space-x-2"
                >
                  <img 
                    src={skill.icon} 
                    alt={`${skill.name} logo`} 
                    className="w-5 h-5 filter invert opacity-80" 
                  />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-black border border-fuchsia-400/30 p-6 rounded-lg shadow-lg shadow-fuchsia-400/20">
            <h3 className="text-xl font-semibold mb-4 text-center text-cyan-400">Tools & Technologies</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {tools.map((skill, index) => (
                <div 
                  key={index} 
                  className="bg-black border border-fuchsia-400 text-fuchsia-400 px-3 py-2 rounded-full text-sm hover:bg-fuchsia-400/10 transition-colors duration-300 flex items-center space-x-2"
                >
                  <img 
                    src={skill.icon} 
                    alt={`${skill.name} logo`} 
                    className="w-5 h-5 filter invert opacity-80" 
                  />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-black border border-cyan-400/50 p-6 rounded-lg shadow-lg shadow-cyan-400/20 relative overflow-hidden">
            {/* Matrix-like decoration in background */}
            <div className="absolute inset-0 opacity-5 select-none pointer-events-none overflow-hidden">
              <div className="matrix-code text-green-500 text-xs">
                01001100 01010010 01001100 01010010 01001100 01010010
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-4 text-center text-fuchsia-400">Certifications</h3>
            <div className="flex justify-center">
              <div className="bg-black border-2 border-green-400 text-green-400 px-4 py-2 rounded-lg relative glow-green flex items-center">
                {/* Postman Logo */}
                <img 
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" 
                  alt="Postman logo" 
                  className="w-6 h-6 mr-3 filter invert opacity-80" 
                />
                <div>
                  <p className="font-medium">Postman API Fundamentals Student Expert</p>
                  <p className="text-sm text-green-400/80">Issued in Dec 2024</p>
                </div>
                {/* Small circuit decoration */}
                <div className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-green-400 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add some CSS for the matrix effect and image styling */}
      <style jsx>{`
        .matrix-code {
          font-family: monospace;
          line-height: 1.2;
        }
        
        .glow-green {
          box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
        }
        
        /* Make icon colors work with dark theme */
        .filter.invert {
          filter: brightness(0) invert(1) hue-rotate(85deg);
        }
      `}</style>
    </section>
  );
}

export default Skills;