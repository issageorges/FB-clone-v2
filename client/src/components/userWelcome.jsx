import React from "react";
import UserImg from "./userImg";

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const UserWelcome = ({ user }) => {
  return (
    <div className="fixed left-0 top-20 p-4 bg-white shadow">
      <UserImg />
      <p className="text-sm font-medium text-gray-500 mt-2">
        Welcome {capitalizeFirstLetter(user.name)}!
      </p>
    </div>
  );
};

export default UserWelcome;
