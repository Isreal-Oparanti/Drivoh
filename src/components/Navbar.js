import Link from "next/link";
import getAuthUser from "../app/lib/getAuthUser";
import { logout } from "../actions/auth";

export default async function Navbar() {
  const authUser = await getAuthUser();

  console.log(authUser);

  return (
    <nav className="bg-white border border-orange-500 text-black p-4" style={{backgroundColor: "white"}}>
      <div className=" container mx-auto flex justify-between items-center">
      <Link href="/">
          <img
            src="/logo.jpeg"
            width={90}
            alt="Logo"
            className="text-4xl font-bold rounded-lg"
          />
        </Link>
        <p className="text-black">{authUser?.aud}</p>
        {authUser ? (
          <div className="flex items-center gap-2">
            <form action={logout} className="ml-auto">
              <button className="text-black outline-none p-2 pl-4 pr-4 rounded-lg hover:text-gray-600" style={{border: "2px solid teal", color: "teal"}}>Logout</button>
            </form>
            {/* <Link href="/dashboard" className="text-black hover:text-gray-600">
              Dashboard
            </Link> */}
          </div>
        ) : (
          <div className="flex gap-4">
            <a
              href="/login"
              className="outline-none p-2 pl-4 pr-4 rounded-lg hover:text-teal-600 mr-[20px]"
              style={{border: "2px solid teal", color: "teal"}}
            >
              Login
            </a>
            <a
              href="/register"
              className="outline-none  p-2 pl-4 pr-4 rounded-lg border-teal-300 hover:text-gray-600 ml-[20px]"
              style={{border: "2px solid teal", color: "teal"}}
            >
              Register
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
