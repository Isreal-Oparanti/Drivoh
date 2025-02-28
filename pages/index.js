import { FaUsers, FaRegCreditCard, FaRocket, FaHome, FaInfoCircle, FaList } from 'react-icons/fa';
import Logo from '../public/logo.jpeg';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid grid-cols-12 gap-4 opacity-10">
        {Array.from({ length: 144 }).map((_, i) => (
          <div key={i} className="w-full h-16 bg-gradient-to-br from-gray-100 to-white opacity-30 rounded-lg"></div>
        ))}
      </div>
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-gray-800 bg-opacity-90 shadow-lg flex justify-between items-center p-4 z-50">
        <img src="../public/file.svg" alt="CampusRide Logo" className="h-12" />
        <div className="flex gap-6 mr-20">
          <a href="#home" className="hover:text-purple-400 transition-all"><FaHome className="inline mr-2"/> Home</a>
          <a href="#about" className="hover:text-purple-400 transition-all"><FaInfoCircle className="inline mr-2"/> About</a>
          <a href="#features" className="hover:text-purple-400 transition-all"><FaList className="inline mr-2"/> Features</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative flex flex-col justify-center items-center text-center min-h-screen p-10">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray100 drop-shadow-lg">
          CampusRide: Smarter, Faster, Safer
        </h1>
        <p className="text-xl mt-4 max-w-2xl opacity-80">
          CampusRide is a modern transportation platform designed to make student commuting easier, safer, and more efficient. Book your rides seamlessly, track in real-time, and enjoy a smooth transportation experience tailored for students and faculty.
        </p>
        <button className="mt-6 px-8 py-4 text-lg font-bold rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition-all shadow-xl">
          Get Started
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 relative bg-gray-800 text-white text-center">
        <h2 className="text-4xl font-semibold text-purple-400 drop-shadow-lg">About CampusRide</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg">
          CampusRide is built to address the transportation needs of students and university staff. It offers an intuitive platform to manage bookings, track rides, and ensure secure transactions. Our goal is to provide a smart, efficient, and eco-friendly ride-sharing system tailored to campuses.
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 relative">
        <h2 className="text-4xl font-semibold text-center text-purple-400 drop-shadow-lg">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {[
            { icon: <FaUsers />, title: "User-Friendly Dashboard", desc: "Easily manage bookings and track rides with a clean and intuitive dashboard.", color: "bg-blue-600" },
            { icon: <FaRegCreditCard />, title: "Secure Payments", desc: "Make quick and safe transactions with multiple payment options.", color: "bg-purple-600" },
            { icon: <FaRocket />, title: "Instant Booking", desc: "Get a ride in just a few taps with our seamless booking system.", color: "bg-teal-600" },
          ].map((feature, index) => (
            <div key={index} className={`${feature.color} p-8 rounded-lg shadow-xl transform hover:scale-105 transition-all`}> 
              <div className="text-5xl mx-auto text-white flex justify-center">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mt-4">{feature.title}</h3>
              <p className="text-gray-200 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center relative bg-gradient-to-r from-purple-600 to-blue-500 text-white">
        <h2 className="text-4xl font-semibold">Join CampusRide Today</h2>
        <p className="mt-4 text-lg">Experience a smarter, safer way to travel within your campus.</p>
        <button className="mt-6 px-8 py-4 text-lg font-bold bg-gray-900 rounded-lg hover:bg-gray-800 transition-all shadow-lg">
          Sign Up Now
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center bg-gray-800 text-gray-400">
        <p>© 2025 CampusRide. All rights reserved.</p>
      </footer>
    </div>
  );
}