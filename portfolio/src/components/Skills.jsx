// components/Skills.js
import React from 'react';

function Skills() {
  const programmingLanguages = ['Java', 'Python', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3'];
  const frameworks = ['React', 'Spring Boot', 'Tailwind CSS'];
  const tools = ['MySQL', 'Figma', 'Canva', 'Notion', 'Adobe Photoshop', 'Adobe AfterEffects'];
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">My Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">Programming Languages</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {programmingLanguages.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">Frameworks & Libraries</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {frameworks.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">Tools & Technologies</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {tools.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">Certifications</h3>
            <div className="flex justify-center">
              <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg">
                <p className="font-medium">Postman API Fundamentals Student Expert</p>
                <p className="text-sm">Issued in Dec 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
