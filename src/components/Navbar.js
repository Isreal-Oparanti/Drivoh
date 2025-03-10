import Link from "next/link";
import getAuthUser from "../app/lib/getAuthUser";
import { logout } from "../actions/auth";

export default async function Navbar() {
  const authUser = await getAuthUser();

  console.log(authUser);

  return (
    <nav className="border border-orange-500 text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-black">{authUser?.aud}</p>
        {authUser ? (
          <div className="flex items-center gap-2">
            <form action={logout} className="ml-auto">
              <button className="text-black hover:text-gray-600">Logout</button>
            </form>
            <Link href="/dashboard" className="text-black hover:text-gray-600">
              Dashboard
            </Link>
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
