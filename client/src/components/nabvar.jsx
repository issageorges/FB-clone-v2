import { Link } from "react-router-dom";
import {
  HomeIcon,
  FilePlusIcon,
  LogOutIcon,
  LogInIcon,
  UserPlusIcon,
  UsersIcon, 
  VideoIcon, 
  ShoppingBagIcon, 
  SearchIcon,
  CircleUserRoundIcon
} from "lucide-react";
import logo from '../assets/logoo.png'
import { useUserContext } from "../context/user-context";

export default function Navbar() {
  const { logoutHandler, user } = useUserContext();

  return (
    <nav className="flex justify-between items-center bg-white shadow p-4">
      
      <div className="flex items-center gap-4">
        
        <div className="flex items-center gap-2">
          <img src={logo}  alt="Logo" className="w-10 h-10" />
          <span className="text-lg font-bold" style={{ color: '#1877F2' }}>facebook</span>
        </div>
      
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            className="pl-10 pr-3 py-1.5 rounded-full bg-gray-200 outline-none text-sm placeholder-gray-500"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

     
      <div className="flex items-center gap-16">
      <Link
              className="text-gray-700 hover:text-blue-600"
              to="/"
            >
                      <HomeIcon className="w-6 h-6 text-gray-700 cursor-pointer hover:text-blue-600" />

            </Link>
        <UsersIcon className="w-6 h-6 text-gray-700 cursor-pointer hover:text-blue-600" />
        <VideoIcon className="w-6 h-6 text-gray-700 cursor-pointer hover:text-blue-600" />
        <ShoppingBagIcon className="w-6 h-6 text-gray-700 cursor-pointer hover:text-blue-600" />
        {user && (
          <FilePlusIcon className="w-6 h-6 text-gray-700 cursor-pointer hover:text-blue-600" />
        )}
      </div>

     
      <div className="flex items-center gap-4">
        
        {user ? (
          <div className="flex items-center gap-2">
            <img src={baseUrl + `user/update-profile`} alt="" />
            <CircleUserRoundIcon/>
            <span className="font-semibold">{user.name}</span>
            <button
              className="text-gray-700 hover:text-blue-600"
              onClick={logoutHandler}
            >
              <LogOutIcon className="w-6 h-6" />
            </button>
          </div>
        ) : (
          <>
            <Link
              className="text-gray-700 hover:text-blue-600"
              to="/login"
            >
              <LogInIcon className="w-6 h-6" />
            </Link>
            <Link
              className="text-gray-700 hover:text-blue-600"
              to="/register"
            >
              <UserPlusIcon className="w-6 h-6" />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
