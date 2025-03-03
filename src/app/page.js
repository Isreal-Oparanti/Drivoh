import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiHome, FiCalendar, FiUser } from "react-icons/fi";

export default function Home() {
  const router = useRouter();
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
            <Link href="/profile" className="block p-2 rounded hover:bg-gray-100">Profile</Link>
          </nav>
        </aside>
      )}
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to CampusRide</h1>
        <p className="text-gray-600 mb-4">Seamless and convenient transport for students.</p>
        <Link href="/bookings" className="btn btn-primary">Book a Ride</Link>
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
          <Link href="/profile" className="flex flex-col items-center text-gray-600">
            <FiUser size={20} />
            <span className="text-sm">Profile</span>
          </Link>
        </nav>
      )}
    </div>
  );
}
