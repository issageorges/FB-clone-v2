import { Link } from "react-router-dom";
import { 
  HomeIcon, 
  FilePlusIcon, 
  LogOutIcon, 
  LogInIcon, 
  UserPlusIcon 
} from "lucide-react";
import { useUserContext } from "../context/user-context";

export default function Navbar() {
  const { logoutHandler, user } = useUserContext();

  return (
    <nav className="flex justify-between items-center bg-white shadow p-4">
      <div className="flex items-center gap-4">
        <a
          className="hover:bg-gray-100 px-3 py-2 rounded flex items-center gap-2 text-gray-700"
          href="/"
        >
          <HomeIcon className="w-6 h-6" /> Home
        </a>
        {user && (
          <Link
            className="hover:bg-gray-100 px-3 py-2 rounded flex items-center gap-2 text-gray-700"
            to="/create-blog"
          >
            <FilePlusIcon className="w-6 h-6" /> Create Blog
          </Link>
        )}
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <button
            className="hover:bg-gray-100 px-3 py-2 rounded flex items-center gap-2 text-gray-700"
            onClick={logoutHandler}
          >
            <LogOutIcon className="w-6 h-6" /> Logout
          </button>
        ) : (
          <>
            <Link
              className="hover:bg-gray-100 px-3 py-2 rounded flex items-center gap-2 text-gray-700"
              to="/login"
            >
              <LogInIcon className="w-6 h-6" /> Login
            </Link>
            <Link
              className="hover:bg-gray-100 px-3 py-2 rounded flex items-center gap-2 text-gray-700"
              to="/register"
            >
              <UserPlusIcon className="w-6 h-6" /> Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
