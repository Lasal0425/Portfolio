// components/Header.js
import React from 'react';

function Header({ currentPage, setCurrentPage }) {
  return (
    <header className="bg-gray-900 text-white py-4 w-full">
      <div className="w-full flex justify-between items-center px-8">
        <h1 className="text-2xl font-bold">Lasal Rathnayake</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <button 
                className={`${currentPage === 'about' ? 'text-blue-400' : 'text-white'} hover:text-blue-300`}
                onClick={() => setCurrentPage('about')}
              >
                About
              </button>
            </li>
            <li>
              <button 
                className={`${currentPage === 'skills' ? 'text-blue-400' : 'text-white'} hover:text-blue-300`}
                onClick={() => setCurrentPage('skills')}
              >
                Skills
              </button>
            </li>
            <li>
              <button 
                className={`${currentPage === 'projects' ? 'text-blue-400' : 'text-white'} hover:text-blue-300`}
                onClick={() => setCurrentPage('projects')}
              >
                Projects
              </button>
            </li>
            <li>
              <button 
                className={`${currentPage === 'contact' ? 'text-blue-400' : 'text-white'} hover:text-blue-300`}
                onClick={() => setCurrentPage('contact')}
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;