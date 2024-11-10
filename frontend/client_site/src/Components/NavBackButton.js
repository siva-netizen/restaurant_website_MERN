import { useNavigate } from 'react-router-dom';

const NavBackButton = () => {
    const navigate = useNavigate(); // Hook to access navigation

    return (
        <button
            onClick={() => navigate(-1)}  // Navigate back to the previous page
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center space-x-2"
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M15 19l-7-7 7-7" 
                />
            </svg>
            <span>Back</span>
        </button>
    );
};

export default NavBackButton;
