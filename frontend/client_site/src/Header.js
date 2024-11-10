import React from 'react';
import { FaBowlFood } from "react-icons/fa6";
import NavBackButton from './Components/NavBackButton';

const Header = ({ title, Headermessage, toggleCart }) => {
  return (
    <div
      className="header-container bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/bannerRefined.png)`,
      }}
    >
      <header className="flex flex-col items-center justify-center p-6">
        <figure>
          <img
            className="logo"
            src={`${process.env.PUBLIC_URL}/img/logo-small.png`}
            alt="Logo"
          />
        </figure>

        <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
        <p className="text-lg text-gray-200 text-center mb-6">
          {Headermessage}
        </p>

        <div className="flex justify-between items-center w-full px-6">
          {/* Back Button */}
          <NavBackButton />

          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className="flex items-center px-4 py-2 bg-grey-500 hover:bg-green-600 text-white font-semibold rounded-full transition duration-300"
          >
            <FaBowlFood className="text-xl mr-2" />
            Cart
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
