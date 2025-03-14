import Link from "next/link";
import {
  FaUsers,
  FaRegCreditCard,
  FaRocket,
  FaHome,
  FaInfoCircle,
  FaList,
} from "react-icons/fa";

import Navbar from "../components/Navbar";

export default function Landing() {
  return (
    <div className="min-h-screen  text-white relative overflow-hidden">
      <div className="absolute mt-10 inset-0 grid grid-cols-8 gap-4 opacity-10 pr-3 pl-3 z-[-10] pointer-events-none">
        {Array.from({ length: 144 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-16 bg-gradient-to-br from-gray-700 to-gray-500 opacity-30 rounded-lg"
          ></div>
        ))}
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="relative flex flex-col justify-center items-center text-center mt-32 "
      >
        <h1 
            className="text-6xl teal font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-900 to-orange-500 drop-shadow-lg"
            style={{backgroundColor: "teal"}}  
          >
            
          Driveoh: Smarter, Faster, Safer
        </h1>
        <p className="text-2xl text-black mt-4 max-w-4xl opacity-80">
          Drivoh is a modern transportation platform designed to make student
          commuting easier, safer, and more efficient. Book your rides
          seamlessly, track in real-time, and enjoy a smooth transportation
          experience tailored for students and faculty.
        </p>

        <Link href="/register" passHref>
          <button 
          className="mt-6 px-8 py-4 text-lg font-bold rounded-lg bg-gradient-to-r   hover:scale-105 transition-all shadow-xl"
          style={{backgroundColor: "teal"}}
          >
            Get Started
          </button>
        </Link>
      </section>
      <div className="flex justify-around mt-[-20px]">
        <img src="/b.gif" className="" alt="CampusRide Logo" />
        <img src="/c.gif" className="" alt="CampusRide Logo" />
      </div>

      {/* About Section */}
      <section
        id="about"
        className="py-28  px-6  relative bg-white rounded-lg m-3 text-white text-center"
      >
        <h2 className="text-4xl font-semibold text-purple-400 drop-shadow-lg"
        style={{color: "teal"}}
        >
          Our Mission
        </h2>
        <p className="mt-4 text-2xl max-w-4xl text-gray-700 mx-auto text-lg">
          CampusRide is built to address the transportation needs of students
          and university staff. It offers an intuitive platform to manage
          bookings, track rides, and ensure secure transactions. Our goal is to
          provide a smart, efficient, and eco-friendly ride-sharing system
          tailored to campuses.
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 relative">
        <h2 className="text-4xl font-semibold text-center text-purple-400 drop-shadow-lg"
         style={{color: "teal"}}
        >
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 text-center"
           
        >
          {[
            {
              icon: <FaUsers />,
              title: "User-Friendly Dashboard",
              desc: "Easily manage bookings and track rides with a clean and intuitive dashboard.",
               
              border: "bg-blue-900",
            },
            {
              icon: <FaRegCreditCard />,
              title: "Secure Payments",
              desc: "Make quick and safe transactions with multiple payment options.",
             
            },
            {
              icon: <FaRocket />,
              title: "Instant Booking",
              desc: "Get a ride in just a few taps with our seamless booking system.",
              
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`${feature.color} p-8 rounded-lg shadow-xl transform hover:scale-105 transition-all`}
              style={{backgroundColor: "teal"}}
            >
              <div className="text-5xl mx-auto text-white flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mt-4">
                {feature.title}
              </h3>
              <p className="text-gray-200 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center relative bg-gradient-to-r from-gray-50 to-white text-white">
        <h2 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r  text-6xl drop-shadow-lg"
        style={{color: "teal"}}
        
        >
          Join Drivoh Today
        </h2>
        <p className="mt-4 text-lg text-gray-800  ">
          Experience a smarter, safer way to travel within your campus.
        </p>
        <Link href="/register" passHref>
          <button className="mt-6 px-8 py-4 text-lg outline-none font-bold rounded-lg hover:scale-105 transition-all shadow-xl"
          style={{backgroundColor: "teal"}}
          >
            Sign Up Now!
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center bg-blue-950 border-t text-gray-600">
        <p>© 2025 Drivoh. All rights reserved.</p>
      </footer>
    </div>
  );
}
