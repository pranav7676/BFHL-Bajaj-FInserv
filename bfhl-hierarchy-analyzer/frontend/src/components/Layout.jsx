import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Background from './Background';

const Layout = () => {
  return (
    <div className="app-layout">
      <Background />
      <Navbar />
      <div className="main-content-wrapper">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
