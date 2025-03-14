// components/About.js
import React from 'react';

function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white px-4">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-2">Hello, I'm</h2>
          <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 inline-block text-transparent bg-clip-text mb-6">
            Lasal Rathnayake!
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-12">
            Crafting immersive digital experiences with creativity & precision.
          </p>
          
          {/* Social Icons */}
          <div className="flex justify-center space-x-6">
            <a href="mailto:lasalrathnayake@gmail.com" className="h-12 w-12 rounded-full flex items-center justify-center border border-white/30 hover:bg-white/10 transition-all duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/lasal-rathnayake" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full flex items-center justify-center border border-white/30 hover:bg-white/10 transition-all duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://github.com/Lasal0425" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full flex items-center justify-center border border-white/30 hover:bg-white/10 transition-all duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-purple-400">About Me</h3>
                <p className="text-gray-300 mb-6">
                  A passionate and proactive IT professional with hands-on experience in software engineering, 
                  IT security, Data mining, Machine Learning and full-stack development. Driven to excel in 
                  dynamic environments, I aim to contribute to impactful projects while expanding my technical 
                  expertise.
                </p>
                <p className="text-gray-300">
                  Committed to innovation and continuous learning, I bring a valuable mix of skills 
                  and adaptability to any team.
                </p>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold mb-6 text-purple-400">Education</h3>
                <div className="mb-6">
                  <h4 className="text-xl font-medium mb-2">Informatics Institute of Technology</h4>
                  <p className="text-blue-300 mb-1">B.Sc.(Hons) Computer Science</p>
                  <p className="text-gray-400 mb-3">2023 - Present</p>
                  <p className="text-sm text-gray-400">
                    Key Modules: Software Development, Web Design and Development, 
                    Database Systems, IT Security, OOP, Client Server Architecture, ML & Data Mining
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-medium">Nalanda College, Colombo 10</h4>
                  <p className="text-gray-400">2009 - 2022</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-purple-400">Leadership</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-purple-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Digital Experience Vice President for the term 25.26 of AIESEC in IIT
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-purple-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Member of the IEEE student branch of IIT
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-purple-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Committee member of the Science and Research society Nalanda College 2021-2022
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold mb-6 text-purple-400">Work Experience</h3>
                <div className="border-l-2 border-purple-400 pl-6">
                  <h4 className="text-xl font-medium mb-1">Service Crew Member</h4>
                  <p className="text-blue-300 mb-1">Soo Ceylon Pvt Ltd. - Cafe</p>
                  <p className="text-gray-400 mb-3">2023 - 2024</p>
                  <p className="text-sm text-gray-300">
                    Gained experience in handling orders, cash transactions, and inventory management while ensuring 
                    quality service. Developed teamwork, problem-solving, and adaptability skills by assisting diverse 
                    customers in a fast-paced airport environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;