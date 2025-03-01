import Link from "next/link";
import getAuthUser from "../app/lib/getAuthUser";
import { logout } from "../actions/auth";

export default async function Navbar() {
  const authUser = await getAuthUser();

  console.log(authUser);

  return (
    <nav className="border border-orange-500 text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <img
            src="/logo.jpeg"
            width={60}
            alt="Logo"
            className="text-2xl font-bold"
          />
        </Link>

        {authUser ? (
          <div className="lg:flex lg:items-center w-full lg:w-auto">
            <form
              action={logout}
              className="flex flex-col lg:flex-row lg:space-x-6 mt-4 lg:mt-0"
            >
              <button className="text-black hover:text-gray-600">Logout</button>
            </form>
          </div>
        ) : (
          <div className="flex gap-4">
            <a
              href="/login"
              className="text-black hover:text-gray-600 mr-[20px]"
            >
              Login
            </a>
            <a
              href="/register"
              className="text-black hover:text-gray-600 ml-[20px]"
            >
              Register
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
