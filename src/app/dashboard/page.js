import Link from "next/link";
import {
  FiHome,
  FiCalendar,
  FiUser,
  FiCreditCard,
  FiBell,
} from "react-icons/fi";
import Bookings from "@/src/components/Bookings";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar for larger screens */}
      <aside className="w-64 bg-white shadow-md p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-6">CampusRide</h2>
        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className="block p-2 rounded hover:bg-gray-100"
          >
            Dashboard
          </Link>
          <Link
            href="/bookings"
            className="block p-2 rounded hover:bg-gray-100"
          >
            My Bookings
          </Link>
          <Link href="/current" className="block p-2 rounded hover:bg-gray-100">
            Current Route
          </Link>
          <Link href="/wallet" className="block p-2 rounded hover:bg-gray-100">
            Wallet
          </Link>
          <Link href="/profile" className="block p-2 rounded hover:bg-gray-100">
            Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {/* Upcoming Rides */}
        <section className="bg-white p-4 rounded shadow mb-4">
          <Bookings />
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
      <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around p-3 md:hidden">
        <Link
          href="/dashboard"
          className="flex flex-col items-center text-gray-600"
        >
          <FiHome size={20} />
          <span className="text-sm">Home</span>
        </Link>
        <Link
          href="/bookings"
          className="flex flex-col items-center text-gray-600"
        >
          <FiCalendar size={20} />
          <span className="text-sm">Bookings</span>
        </Link>
        <Link
          href="/wallet"
          className="flex flex-col items-center text-gray-600"
        >
          <FiCreditCard size={20} />
          <span className="text-sm">Wallet</span>
        </Link>
        <Link
          href="/notifications"
          className="flex flex-col items-center text-gray-600"
        >
          <FiBell size={20} />
          <span className="text-sm">Alerts</span>
        </Link>
        <Link
          href="/profile"
          className="flex flex-col items-center text-gray-600"
        >
          <FiUser size={20} />
          <span className="text-sm">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
