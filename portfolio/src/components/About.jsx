import React from 'react';
import { FaGraduationCap, FaLaptopCode, FaUserTie, FaMedal } from 'react-icons/fa';

function About() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-blue-100 transform hover:scale-[1.01] transition-transform duration-300">
          <div className="flex flex-col md:flex-row items-center mb-10 gap-8">
            <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                LR
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-3xl font-bold mb-2 text-gray-800">Lasal Rathnayake</h3>
              <p className="text-xl text-indigo-600 font-medium mb-4">Computer Science Undergraduate</p>
              <p className="text-gray-700 text-lg leading-relaxed">
                A passionate and proactive IT professional with hands-on experience in software engineering, 
                IT security, Data mining, Machine Learning and full-stack development. Driven to excel in 
                dynamic environments, I aim to contribute to impactful projects while expanding my technical 
                expertise. Committed to innovation and continuous learning, I bring a valuable mix of skills 
                and adaptability to any team.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <FaGraduationCap className="text-3xl text-blue-600 mr-3" />
                <h4 className="text-2xl font-bold text-gray-800">Education</h4>
              </div>
              <div className="mb-4 pl-2 border-l-4 border-blue-400 pl-4">
                <p className="font-bold text-indigo-700">Informatics Institute of Technology</p>
                <p className="text-gray-700 font-medium">B.Sc.(Hons) Computer Science</p>
                <p className="text-gray-600 italic">2023 - Present</p>
                <p className="text-sm text-gray-600 mt-2">
                  Key Modules: Mathematics for Computing, Software Development, Web Design and Development, 
                  Database Systems, Information Technology Security, Object Oriented Programming, 
                  Client Server Architecture, Machine Learning and Data mining
                </p>
              </div>
              <div className="pl-2 border-l-4 border-blue-400 pl-4">
                <p className="font-bold text-indigo-700">Nalanda College, Colombo 10</p>
                <p className="text-gray-700">Primary and Higher Education</p>
                <p className="text-gray-600 italic">2009 - 2022</p>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <FaLaptopCode className="text-3xl text-indigo-600 mr-3" />
                <h4 className="text-2xl font-bold text-gray-800">Skills</h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['Software Engineering', 'IT Security', 'Data Mining', 'Machine Learning', 
                  'Full-Stack Development', 'Database Systems', 'Problem Solving', 'Team Collaboration'].map((skill) => (
                  <div key={skill} className="bg-white rounded-lg p-2 shadow-sm flex items-center">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></div>
                    <span className="text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <FaMedal className="text-3xl text-indigo-600 mr-3" />
                <h4 className="text-2xl font-bold text-gray-800">Leadership & Activities</h4>
              </div>
              <ul className="space-y-3">
                {[
                  'Digital Experience Vice President for the term 25.26 of AIESEC in IIT',
                  'Member of the IEEE student branch of IIT',
                  'Committee member of the Science and Research society Nalanda College 2021-2022'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="min-w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs mr-3 mt-1">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <FaUserTie className="text-3xl text-blue-600 mr-3" />
                <h4 className="text-2xl font-bold text-gray-800">Work Experience</h4>
              </div>
              <div className="pl-2 border-l-4 border-blue-400 pl-4">
                <p className="font-bold text-indigo-700">Service Crew Member</p>
                <p className="text-gray-700 font-medium">Soo Ceylon Pvt Ltd. - Cafe</p>
                <p className="text-gray-600 italic">2023 - 2024</p>
                <p className="text-sm text-gray-600 mt-2">
                  Gained experience in handling orders, cash transactions, and inventory management while ensuring 
                  quality service. Developed teamwork, problem-solving, and adaptability skills by assisting diverse 
                  customers in a fast-paced airport environment.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;