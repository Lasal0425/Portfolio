// components/About.js
import React from 'react';

function About() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row items-center mb-6">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold mb-2">Lasal Rathnayake</h3>
              <p className="text-gray-600 mb-4">Computer Science Undergraduate</p>
              <p className="text-gray-800 mb-6">
                A passionate and proactive IT professional with hands-on experience in software engineering, 
                IT security, Data mining, Machine Learning and full-stack development. Driven to excel in 
                dynamic environments, I aim to contribute to impactful projects while expanding my technical 
                expertise. Committed to innovation and continuous learning, I bring a valuable mix of skills 
                and adaptability to any team.
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-2">Education</h4>
            <div className="mb-4">
              <p className="font-medium">Informatics Institute of Technology affiliated with the University of Westminster</p>
              <p>B.Sc.(Hons) Computer Science (2023 - Present)</p>
              <p className="text-sm text-gray-600 mt-1">
                Key Modules: Mathematics for Computing, Software Development, Web Design and Development, 
                Database Systems, Information Technology Security, Object Oriented Programming, 
                Client Server Architecture, Machine Learning and Data mining
              </p>
            </div>
            <div>
              <p className="font-medium">Nalanda College, Colombo 10</p>
              <p>Primary and Higher Education (2009 - 2022)</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-2">Leadership & Activities</h4>
            <ul className="list-disc pl-5">
              <li>Digital Experience Vice President for the term 25.26 of AIESEC in IIT</li>
              <li>Member of the IEEE student branch of IIT</li>
              <li>Committee member of the Science and Research society Nalanda College 2021-2022</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-2">Work Experience</h4>
            <div>
              <p className="font-medium">Service Crew Member | Soo Ceylon Pvt Ltd. - Cafe (2023 - 2024)</p>
              <p className="text-sm text-gray-600">
                Gained experience in handling orders, cash transactions, and inventory management while ensuring 
                quality service. Developed teamwork, problem-solving, and adaptability skills by assisting diverse 
                customers in a fast-paced airport environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;