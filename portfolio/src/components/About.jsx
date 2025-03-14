// components/About.js
import React from 'react';
import { motion } from "framer-motion";

function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }} 
          className="text-center"
        >
          <h2 className="text-5xl font-bold mb-2">Hello, I'm</h2>
          <h1 className="text-7xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-400 inline-block text-transparent bg-clip-text mb-6">
            Lasal Rathnayake!
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-12">
            Inspire with Innovation, Empower with Execution
          </p>

          {/* Social Icons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }} 
            className="flex justify-center space-x-6"
          >
            <a href="mailto:lasalrathnayake@gmail.com" className="h-12 w-12 rounded-full flex items-center justify-center border border-green-400/30 hover:bg-green-400/10 transition-all duration-300">
              {/* Email Icon */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/lasal-rathnayake" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full flex items-center justify-center border border-green-400/30 hover:bg-green-400/10 transition-all duration-300">
              {/* LinkedIn Icon */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://github.com/Lasal0425" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full flex items-center justify-center border border-green-400/30 hover:bg-green-400/10 transition-all duration-300">
              {/* GitHub Icon */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 animate-bounce cursor-pointer"
          onClick={() =>{
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            });
          }}
          >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-20 bg-black text-green-400 border-t border-cyan-400/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-fuchsia-400">About Me</h3>
                <p className="text-green-400 mb-6">
                  A passionate and proactive IT professional with hands-on experience in software engineering, 
                  IT security, Data mining, Machine Learning and full-stack development. Driven to excel in 
                  dynamic environments, I aim to contribute to impactful projects while expanding my technical 
                  expertise.
                </p>
                <p className="text-green-400">
                  Committed to innovation and continuous learning, I bring a valuable mix of skills 
                  and adaptability to any team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;