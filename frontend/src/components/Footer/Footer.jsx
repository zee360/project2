import React from 'react';
// import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="copyright text-center mt-24">
      <p> Copyright {new Date().getFullYear()} &copy;</p>
      {/* <div className="flex justify-center mt-2">
        <Link
          to="/adminpanel"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold uppercase rounded"
        >
          Admin Panel
        </Link>
      </div> */}
    </div>
  );
}

export default Footer;
