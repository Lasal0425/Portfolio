// components/Skills.js
import React from 'react';

function Skills() {
  const frontendSkills = [
    { name: "HTML5", icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: "CSS3", icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: "JavaScript", icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: "React", icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: "TypeScript", icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: "Tailwind", icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg'}
  ];
  
  const backendSkills = [
    { name: "Python", icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: "Java", icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: "Spring boot", icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    { name: "MySQL", icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' }
  ];
  
  const tools = [
    { name: "Figma", icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: "Canva", icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' },
    { name: "Notion", icon: '/images/notion-icon.svg' },
    { name: "Photoshop", icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
    { name: "After Effects", icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg' }
  ];
  
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 cyberpunk-text">MY SKILLS</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Frontend Section */}
          <div className="bg-black border border-purple-500/30 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-6 text-center text-purple-500">FRONTEND</h3>
            <div className="grid grid-cols-3 gap-6">
              {frontendSkills.map((skill, index) => (
                <div 
                  key={index} 
                  className="group relative flex flex-col items-center justify-center"
                >
                  <div className="relative p-4 bg-gray-900/50 rounded-lg border border-gray-700 transition-all duration-300 
                    group-hover:border-cyan-500 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center justify-center">
                    <img 
                      src={skill.icon} 
                      alt={`${skill.name} logo`} 
                      className="w-12 h-12 transition-all duration-300 group-hover:scale-110" 
                    />
                    {/* Glow overlay on hover */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 
                      bg-gradient-to-br from-cyan-500/20 to-purple-500/20 transition-opacity duration-300"></div>
                  </div>
                  <span className="mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                    text-cyan-400 font-bold">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Backend Section */}
          <div className="bg-black border border-blue-500/30 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-6 text-center text-blue-500">BACKEND & DATABASE</h3>
            <div className="grid grid-cols-2 gap-6">
              {backendSkills.map((skill, index) => (
                <div 
                  key={index} 
                  className="group relative flex flex-col items-center justify-center"
                >
                  <div className="relative p-4 bg-gray-900/50 rounded-lg border border-gray-700 transition-all duration-300 
                    group-hover:border-green-500 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] flex items-center justify-center">
                    <img 
                      src={skill.icon} 
                      alt={`${skill.name} logo`} 
                      className="w-12 h-12 transition-all duration-300 group-hover:scale-110" 
                    />
                    {/* Glow overlay on hover */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 
                      bg-gradient-to-br from-green-500/20 to-blue-500/20 transition-opacity duration-300"></div>
                  </div>
                  <span className="mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                    text-green-400 font-bold">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Tools Section */}
        <div className="mt-8 max-w-6xl mx-auto">
          <div className="bg-black border border-fuchsia-500/30 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-6 text-center text-fuchsia-500">TOOLS & TECHNOLOGIES</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
              {tools.map((skill, index) => (
                <div 
                  key={index} 
                  className="group relative flex flex-col items-center justify-center"
                >
                  <div className="relative p-4 bg-gray-900/50 rounded-lg border border-gray-700 transition-all duration-300 
                    group-hover:border-fuchsia-500 group-hover:shadow-[0_0_15px_rgba(192,38,211,0.5)] flex items-center justify-center">
                    <img 
                      src={skill.icon} 
                      alt={`${skill.name} logo`} 
                      className="w-10 h-10 transition-all duration-300 group-hover:scale-110" 
                    />
                    {/* Glow overlay on hover */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 
                      bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 transition-opacity duration-300"></div>
                  </div>
                  <span className="mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                    text-fuchsia-400 font-bold">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Certifications Section */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-black border border-pink-500/30 p-6 rounded-lg relative overflow-hidden">
            {/* Matrix-like decoration in background */}
            <div className="absolute inset-0 opacity-10 select-none pointer-events-none overflow-hidden">
              <div className="matrix-code text-green-500 text-xs">
                01001100 01010010 01001100 01010010 01001100 01010010
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-6 text-center text-pink-500">CERTIFICATIONS</h3>
            <div className="flex justify-center">
              <div className="group bg-gray-900/50 border border-gray-700 transition-all duration-300 
                hover:border-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] px-4 py-3 rounded-lg relative flex items-center">
                {/* Postman Logo with background */}
                <div className="bg-gray-800 rounded-full p-1.5 flex items-center justify-center mr-3
                  group-hover:bg-pink-500">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" 
                    alt="Postman logo" 
                    className="w-5 h-5" 
                  />
                </div>
                <div>
                  <p className="font-bold group-hover:text-pink-400">Postman API Fundamentals Student Expert</p>
                  <p className="text-sm text-gray-400 group-hover:text-pink-300">Issued in Dec 2024</p>
                </div>
                {/* Pink pulsing dot, only visible on hover */}
                <div className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-pink-500 
                  opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
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
        
        @keyframes glitch {
          0% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 255, 0.75),
                        -0.05em -0.025em 0 rgba(0, 255, 255, 0.75);
          }
          14% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 255, 0.75),
                        -0.05em -0.025em 0 rgba(0, 255, 255, 0.75);
          }
          15% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 255, 0.75),
                        0.025em 0.025em 0 rgba(0, 255, 255, 0.75);
          }
          49% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 255, 0.75),
                        0.025em 0.025em 0 rgba(0, 255, 255, 0.75);
          }
          50% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 255, 0.75),
                        0.05em 0 0 rgba(0, 255, 255, 0.75);
          }
          99% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 255, 0.75),
                        0.05em 0 0 rgba(0, 255, 255, 0.75);
          }
          100% {
            text-shadow: -0.025em 0 0 rgba(255, 0, 255, 0.75),
                        -0.025em -0.025em 0 rgba(0, 255, 255, 0.75);
          }
        }
        
        h3 {
          animation: glitch 2s infinite;
        }
        
        .cyberpunk-text {
          color: #00FFFF;
          text-shadow: 
            0 0 10px rgba(0, 255, 255, 0.7),
            0 0 20px rgba(0, 255, 255, 0.5),
            0 0 30px rgba(0, 255, 255, 0.3),
            0 0 40px rgba(0, 255, 255, 0.1);
        }
      `}</style>
    </section>
  );
}

export default Skills;