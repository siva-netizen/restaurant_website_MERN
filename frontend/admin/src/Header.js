import React from 'react';
import { FaBowlFood } from "react-icons/fa6";
import NavBackButton from './NavBackButton';

const Header = ({ title, Headermessage, navigate }) => {
  return (
    <div
      className="header-container bg-cover bg-center bg-no-repeat h-64 w-full"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/bannerRefined.png)`,
      }}
    >
      {/* Top Header Section */}
      <header className="flex justify-between items-center px-8 py-4 gap-6">
        {/* Back Button */}
        <div className="flex-shrink-0 mr-4">
          <NavBackButton />
        </div>

        {/* Logo */}
        <figure className="flex-grow flex justify-center">
          <img
            className="logo w-16 h-16"
            src={`${process.env.PUBLIC_URL}/img/logo-small.png`}
            alt="Logo"
          />
        </figure>

        {/* Order Button */}
        <div className="flex-shrink-0 ml-4">
          <button
            className="flex items-center px-4 py-2 bg-gray-500 hover:bg-green-600 
              text-white font-semibold rounded-full transition duration-300"
            onClick={() => navigate('/Orders')} // Corrected callback
          >
            <FaBowlFood className="text-2xl mr-2" />
            Order
          </button>
        </div>
      </header>

      {/* Title and Message Section */}
      <div className="text-center mt-8">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-2">
          {title}
        </h1>
        <p className="text-lg text-gray-200">{Headermessage}</p>
      </div>
    </div>
  );
};

export default Header;
