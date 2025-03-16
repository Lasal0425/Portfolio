// components/Contact.js
import React, { useState } from 'react';
import { motion } from "framer-motion";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Send form data to your API endpoint
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'lasalrathnayake@gmail.com',
          subject: `Contact Form Message from ${formData.name}`,
          ...formData
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus({ success: true, message: 'Thank you for your message! I will get back to you soon.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({ success: false, message: data.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus({ success: false, message: 'An error occurred while sending your message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
            Contact Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-400 mx-auto"></div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-black border border-green-400/30 p-6 rounded-lg relative overflow-hidden"
          >
            {/* Digital circuit pattern overlay */}
            <div className="absolute inset-0 bg-circuit-pattern opacity-5 mix-blend-overlay"></div>
            
            <h3 className="text-xl font-semibold mb-6 text-fuchsia-400 relative z-10">Get In Touch</h3>
            
            <div className="mb-6 relative z-10">
              <div className="flex items-center mb-4 hover:text-cyan-400 transition-colors duration-300">
                <div className="h-10 w-10 rounded-full flex items-center justify-center border border-green-400/30 mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                +94 710 792 783
              </div>
              <div className="flex items-center mb-4 hover:text-cyan-400 transition-colors duration-300">
                <div className="h-10 w-10 rounded-full flex items-center justify-center border border-green-400/30 mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                lasalrathnayake@gmail.com
              </div>
              <div className="flex items-center mb-4 hover:text-cyan-400 transition-colors duration-300">
                <div className="h-10 w-10 rounded-full flex items-center justify-center border border-green-400/30 mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                15/39, Weediyawatta, Gampaha, Sri Lanka
              </div>
            </div>
            
            <div className="mt-8 relative z-10">
              <h4 className="text-lg font-medium mb-4 text-cyan-400">Find Me On</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/lasal-rathnayake" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full flex items-center justify-center border border-green-400/30 hover:bg-green-400/10 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://github.com/Lasal0425" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full flex items-center justify-center border border-green-400/30 hover:bg-green-400/10 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Binary code effect */}
            <div className="absolute bottom-2 right-2 text-green-400/30 text-xs font-mono">
              01000011 01101111 01101110 01110100 01100001 01100011 01110100
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-black border border-green-400/30 p-6 rounded-lg relative overflow-hidden"
          >
            {/* Digital circuit pattern overlay */}
            <div className="absolute inset-0 bg-circuit-pattern opacity-5 mix-blend-overlay"></div>
            
            <h3 className="text-xl font-semibold mb-6 text-fuchsia-400 relative z-10">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="relative z-10">
              <div className="mb-4">
                <label htmlFor="name" className="block text-cyan-400 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-black/80 border border-green-400/50 rounded-md focus:outline-none focus:border-cyan-400 text-green-400"
                  required 
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-cyan-400 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-black/80 border border-green-400/50 rounded-md focus:outline-none focus:border-cyan-400 text-green-400"
                  required 
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block text-cyan-400 mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  rows="5" 
                  className="w-full px-4 py-2 bg-black/80 border border-green-400/50 rounded-md focus:outline-none focus:border-cyan-400 text-green-400"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-400/80 to-fuchsia-400/80 hover:from-cyan-400 hover:to-fuchsia-400 text-black font-medium py-2 px-4 rounded-md transition duration-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-white/10 transform -skew-x-12 transition-transform duration-700 ease-out group-hover:translate-x-full"></span>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitStatus && (
                <div className={`mt-4 p-3 rounded-md ${submitStatus.success ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>
                  {submitStatus.message}
                </div>
              )}
            </form>
            
            {/* Binary code effect */}
            <div className="absolute bottom-2 right-2 text-green-400/30 text-xs font-mono">
              01001101 01100101 01110011 01110011 01100001 01100111 01100101
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;