const AboutPage = () => {
  return (
    <div className="page-container animate-fade-in">
      <div className="about-page-card card">
        <div className="about-header text-center">
          <h1 className="about-name-large">Pranav M</h1>
          <p className="about-role-large">Full Stack Developer</p>
        </div>

        <div className="about-grid">
          {/* Details Section */}
          <div className="about-section">
            <h3 className="about-section-title">Academic Details</h3>
            <ul className="about-list">
              <li><span className="label">Roll No:</span> RA2311003020288</li>
              <li><span className="label">Course:</span> B.Tech CSE Core</li>
              <li><span className="label">College:</span> SRM Institute of Science and Technology, Ramapuram</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="about-section">
            <h3 className="about-section-title">Contact Information</h3>
            <ul className="about-list">
              <li><span className="label">Phone:</span> +91 9840896475</li>
              <li><span className="label">College Email:</span> <a href="mailto:md6477@srmist.edu.in">md6477@srmist.edu.in</a></li>
              <li><span className="label">Personal Email:</span> <a href="mailto:pranavmani2018@gmail.com">pranavmani2018@gmail.com</a></li>
            </ul>
          </div>
        </div>

        <div className="about-footer text-center">
          <a 
            href="https://pranavm-portfo.netlify.app/" 
            target="_blank" 
            rel="noreferrer" 
            className="btn-primary"
          >
            Visit Portfolio
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
