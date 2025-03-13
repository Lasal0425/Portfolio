// App.js
import React, { useState } from 'react';
import Header from './components/Header';
import About from './components/About';
// import Skills from './components/Skills';
// import Projects from './components/Projects.jsx';
// import Contact from './components/Contact';
// import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('about');
  
  const renderPage = () => {
    switch(currentPage) {
      case 'about':
        return <About />;
      case 'skills':
        return <Skills />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      default:
        return <About />;
    }
  };

  return (
    <div className="App">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;

