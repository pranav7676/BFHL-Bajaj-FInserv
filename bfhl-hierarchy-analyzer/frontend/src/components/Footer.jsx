import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-saas">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Section A: Project Info */}
          <div className="footer-section">
            <h4 className="footer-heading">Project Info</h4>
            <p className="footer-text">
              BFHL Hierarchy Analyzer is a full-stack application that processes graph relationships, 
              detects cycles, and builds hierarchical structures.
            </p>
          </div>

          {/* Section B: Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><a href="#" className="footer-link">GitHub Repo</a></li>
            </ul>
          </div>

          {/* Section C: Contact Info */}
          <div className="footer-section">
            <h4 className="footer-heading">Contact Info</h4>
            <ul className="footer-list">
              <li className="footer-text">📞 +91 9840896475</li>
              <li className="footer-text">✉️ md6477@srmist.edu.in</li>
              <li className="footer-text">✉️ pranavmani2018@gmail.com</li>
            </ul>
          </div>

          {/* Section D: About Developer */}
          <div className="footer-section">
            <h4 className="footer-heading">About Developer</h4>
            <p className="footer-text font-semibold">Pranav M – Full Stack Developer</p>
            <a 
              href="https://pranavm-portfo.netlify.app/" 
              target="_blank" 
              rel="noreferrer" 
              className="footer-btn mt-3"
            >
              View Portfolio
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Pranav M. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
