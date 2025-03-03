"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiHome, FiCalendar, FiUser, FiCreditCard, FiBell } from "react-icons/fi";

export default function Dashboard() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar for larger screens */}
      {!isMobile && (
        <aside className="w-64 bg-white shadow-md p-4 hidden md:flex flex-col">
          <h2 className="text-xl font-bold mb-6">CampusRide</h2>
          <nav className="space-y-2">
            <Link href="/dashboard" className="block p-2 rounded hover:bg-gray-100">Dashboard</Link>
            <Link href="/bookings" className="block p-2 rounded hover:bg-gray-100">My Bookings</Link>
            <Link href="/current" className="block p-2 rounded hover:bg-gray-100">Current Route</Link>
            <Link href="/wallet" className="block p-2 rounded hover:bg-gray-100">Wallet</Link>
            <Link href="/profile" className="block p-2 rounded hover:bg-gray-100">Profile</Link>
          </nav>
        </aside>
      )}
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        
        {/* Upcoming Rides */}
        <section className="bg-white p-4 rounded shadow mb-4">
          <h2 className="text-lg font-semibold mb-2">Upcoming Ride</h2>
          <p className="text-gray-600">No scheduled rides. Book a ride now!</p>
          <Link href="/bookings" className="btn btn-primary mt-2">Book a Ride</Link>
        </section>
        
        {/* Ride History */}
        <section className="bg-white p-4 rounded shadow mb-4">
          <h2 className="text-lg font-semibold mb-2">Ride History</h2>
          <p className="text-gray-600">No completed rides yet.</p>
        </section>
        
        {/* Wallet Balance */}
        <section className="bg-white p-4 rounded shadow mb-4">
          <h2 className="text-lg font-semibold mb-2">Wallet Balance</h2>
          <p className="text-gray-600">₦0.00</p>
        </section>
      </main>
      
      {/* Bottom Navigation for mobile */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around p-3 md:hidden">
          <Link href="/dashboard" className="flex flex-col items-center text-gray-600">
            <FiHome size={20} />
            <span className="text-sm">Home</span>
          </Link>
          <Link href="/bookings" className="flex flex-col items-center text-gray-600">
            <FiCalendar size={20} />
            <span className="text-sm">Bookings</span>
          </Link>
          <Link href="/wallet" className="flex flex-col items-center text-gray-600">
            <FiCreditCard size={20} />
            <span className="text-sm">Wallet</span>
          </Link>
          <Link href="/notifications" className="flex flex-col items-center text-gray-600">
            <FiBell size={20} />
            <span className="text-sm">Alerts</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center text-gray-600">
            <FiUser size={20} />
            <span className="text-sm">Profile</span>
          </Link>
        </nav>
      )}
    </div>
  );
}
// export default function Dashboard() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-indigo-700 to-indigo-500 text-white flex flex-col justify-between">
//       {/* Hero Section */}
//       <div className="text-center py-24 px-4">
//         <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
//           Welcome to Your Dashboard
//         </h1>
//         <p className="mt-6 text-2xl font-light">
//           A world of seamless management for your bookings and rides, all in one
//           place.
//         </p>
//         <button className="btn btn-primary mt-8 px-8 py-4 text-lg font-semibold rounded-lg shadow-xl hover:bg-yellow-500 transition-all">
//           Get Started
//         </button>
//         <button className="btn btn-primary mt-8 px-8 py-4 text-lg font-semibold rounded-lg shadow-xl hover:bg-yellow-500 transition-all mr-[20px]">
//           Log out
//         </button>
//       </div>

//       {/* Stats Panel Section */}
//       <div className="py-16 px-4 bg-base-200">
//         <h2 className="text-4xl font-semibold text-center text-gray-800">
//           Your Ride Statistics
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
//           {/* Stats Cards */}
//           <div className="card bg-white shadow-xl p-6 rounded-xl flex items-center justify-between">
//             <div>
//               <h3 className="text-xl font-semibold text-gray-700">
//                 Total Bookings
//               </h3>
//               <p className="text-4xl font-bold text-indigo-700">12</p>
//             </div>
//             <div className="w-16 h-16 bg-indigo-700 text-white flex items-center justify-center rounded-full">
//               <i className="fas fa-bookmark text-2xl"></i>
//             </div>
//           </div>

//           <div className="card bg-white shadow-xl p-6 rounded-xl flex items-center justify-between">
//             <div>
//               <h3 className="text-xl font-semibold text-gray-700">
//                 Upcoming Rides
//               </h3>
//               <p className="text-4xl font-bold text-yellow-500">3</p>
//             </div>
//             <div className="w-16 h-16 bg-yellow-500 text-white flex items-center justify-center rounded-full">
//               <i className="fas fa-calendar-check text-2xl"></i>
//             </div>
//           </div>

//           <div className="card bg-white shadow-xl p-6 rounded-xl flex items-center justify-between">
//             <div>
//               <h3 className="text-xl font-semibold text-gray-700">
//                 Completed Rides
//               </h3>
//               <p className="text-4xl font-bold text-green-600">9</p>
//             </div>
//             <div className="w-16 h-16 bg-green-600 text-white flex items-center justify-center rounded-full">
//               <i className="fas fa-check-circle text-2xl"></i>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Feature Cards Section */}
//       <div className="py-16 bg-gradient-to-r from-indigo-800 to-indigo-600 text-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-4xl font-semibold text-center">Quick Actions</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
//             <div className="card bg-white shadow-xl p-6 rounded-lg hover:bg-indigo-100 transition-all duration-300">
//               <h3 className="text-2xl font-semibold text-indigo-600">
//                 Manage Bookings
//               </h3>
//               <p className="text-gray-700 mt-2">
//                 Easily view, modify, and track your ride bookings.
//               </p>
//               <button className="btn btn-outline btn-indigo mt-4">
//                 Go to Bookings
//               </button>
//             </div>

//             <div className="card bg-white shadow-xl p-6 rounded-lg hover:bg-indigo-100 transition-all duration-300">
//               <h3 className="text-2xl font-semibold text-indigo-600">
//                 Profile Settings
//               </h3>
//               <p className="text-gray-700 mt-2">
//                 Update your profile, payment details, and preferences.
//               </p>
//               <button className="btn btn-outline btn-indigo mt-4">
//                 Edit Profile
//               </button>
//             </div>

//             <div className="card bg-white shadow-xl p-6 rounded-lg hover:bg-indigo-100 transition-all duration-300">
//               <h3 className="text-2xl font-semibold text-indigo-600">
//                 Contact Support
//               </h3>
//               <p className="text-gray-700 mt-2">
//                 Need help? Reach out to our support team for assistance.
//               </p>
//               <button className="btn btn-outline btn-indigo mt-4">
//                 Get Help
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Section */}
//       <footer className="bg-indigo-800 text-white py-8">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <p className="text-lg">© 2025 Campus Ride. All rights reserved.</p>
//           <div className="mt-6">
//             <a href="#" className="mx-4 text-indigo-200 hover:text-white">
//               Privacy Policy
//             </a>
//             <a href="#" className="mx-4 text-indigo-200 hover:text-white">
//               Terms of Service
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
