import { Link } from "react-router-dom";

export default function Home() {
    return ( 
   
    
        <div className="flex justify-center items-center h-screen flex-col">
            <h1 className="text-7xl font-bold">Scriptly</h1>
            <Link to={'/signup'}>
            <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 mt-7 py-2.5 me-2 mb-2 min-w-64 dark:bg-gray-800  dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Let's Get Started {'\u2192'} </button>
            </Link>
            </div>
            
    );
}