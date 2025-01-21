import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import React, { useState } from "react";
import { MdOutlineClose, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiCurrencyFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import useStore from "../store/index.js";
import ThemeSwitch from "./wrappers/switch.jsx";
import TransitionWrapper from "./wrappers/transition-wrapper.jsx";

const links = [
  { label: "Dashboard", link: "/overview" },
  { label: "Transactions", link: "/transactions" },
  { label: "Accounts", link: "/accounts" },
  { label: "Settings", link: "/settings" },
];

const UserMenu = () => {
  const { user, setCredentials } = useStore((state) => state);
  const navigate = useNavigate();

  const handleSignout = async () => {
    localStorage.removeItem("user");
    setCredentials(null);
    navigate("/sign-in");
  };

  return (
    <Menu as="div" className="relative z-50">
      <MenuButton>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 text-white bg-violet-700 rounded-full cursor-pointer 2xl:w-12 2xl:h-12">
            <p className="text-2xl font-bold">{user?.firstname?.charAt(0)}</p>
          </div>
          <MdOutlineKeyboardArrowDown className="hidden text-2xl text-gray-600 cursor-pointer md:block dark:text-gray-300" />
        </div>
      </MenuButton>

      <TransitionWrapper>
        <MenuItems className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center w-10 h-10 text-white bg-violet-700 rounded-full">
                <p className="text-2xl font-bold">
                  {user?.firstname?.charAt(0)}
                </p>
              </div>
              <div className="w-full">
                <p className="text-violet-700">{user?.firstname}</p>
                <span className="text-xs text-gray-500">{user?.country}</span>
              </div>
            </div>

            <MenuItem>
              {({ active }) => (
                <Link to="/settings">
                  <button
                    className={`${
                      active ? "bg-gray-100" : ""
                    } text-gray-900 dark:text-gray-300 mb-4 flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Profile
                  </button>
                </Link>
              )}
            </MenuItem>

            <MenuItem>
              {({ active }) => (
                <button
                  onClick={handleSignout}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } text-gray-900 dark:text-gray-300 flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Sign Out
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </TransitionWrapper>
    </Menu>
  );
};

const MobileSidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    // Close the sidebar after navigating
    setIsOpen(false);
  };

  return (
    <Popover className="relative md:hidden">
      {/* Only show on smaller screens */}
      <>
        <PopoverButton
          className="p-2"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <MdOutlineClose size={26} /> : <IoIosMenu size={26} />}
        </PopoverButton>

        <TransitionWrapper>
          {isOpen && (
            <PopoverPanel className="absolute z-50 w-screen max-w-sm px-4 py-6 mt-3 bg-white shadow-lg">
              <div className="flex flex-col space-y-2">
                {links.map(({ label, link }, index) => (
                  <Link to={link} key={index} onClick={handleLinkClick}>
                    <button
                      className={`block px-4 py-2 rounded-md text-sm ${
                        location.pathname === link
                          ? "bg-violet-700 text-white"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {label}
                    </button>
                  </Link>
                ))}
              </div>
            </PopoverPanel>
          )}
        </TransitionWrapper>
      </>
    </Popover>
  );
};

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-4 bg-white shadow-md dark:bg-gray-900">
      <div className="flex items-center gap-2">
        <RiCurrencyFill className="text-violet-700 text-3xl" />
        <span className="text-xl font-bold text-gray-900 dark:text-white">
          MyFinance
        </span>
      </div>
      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6">
        {links.map(({ label, link }, index) => (
          <Link
            to={link}
            key={index}
            className="text-gray-700 dark:text-gray-300 hover:underline"
          >
            {label}
          </Link>
        ))}
      </div>
      {/* Hamburger menu for mobile */}
      <div className="flex items-center gap-6">
        <ThemeSwitch />
        <UserMenu />
        <MobileSidebar />
      </div>
    </div>
  );
};

export default Navbar;
