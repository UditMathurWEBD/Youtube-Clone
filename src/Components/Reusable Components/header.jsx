import { UserCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import CreateChannelModal from "../createChannelPage";

function Header(props) {
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
      const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  function handleDiv() {
    setIsSearchOn(!isSearchOn);
  }

  function handleSearch(e) {
    console.log(e.target.value);
  }

  function handleSidebar() {
    props.value(prev => !prev); // directly toggle parent value

  }

  return isSearchOn ? (
    <SearchDiv isSearchOn={setIsSearchOn} />
  ) : (
    <>
    <header className="px-4 py-4.5 flex justify-between items-center fixed w-[-webkit-fill-available] z-20 bg-black">
      <div className="flex items-center">
        <div onClick={handleSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </div>
        <img className="w-[140px] h-[35px]" src="/logo.svg" />

        <div onClick={handleDiv} className="sm:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
      <div className="hidden sm:w-sm sm:block lg:w-lg">
        <input
          onChange={handleSearch}
          className="px-4 py-2 text-white border border-white rounded-4xl w-[-webkit-fill-available]"
          type="text"
          placeholder="Search Videos"
        />
      </div>
{isSignedIn ?<SignedInMenu openModal={openModal}></SignedInMenu>   : 
<div>
        <Link
          to="/login"
          className="text-gray-100 font-light text-sm flex gap-2 items-center px-4 py-2 border border-gray-100 rounded-4xl"
        >
          <UserCircleIcon height={20} /> Sign In
        </Link>
      </div> }
    
    </header>
     <CreateChannelModal open={isModalOpen} onClose={closeModal} />
    </>
    

  );
}


function SearchDiv(props) {
  function handleSearch(e) {
    console.log(e.target.value);
  }
  return (
    <div className="flex justify-between items-center px-4 py-4 gap-4">
      <div
        className="bg-red-600 p-2 rounded-4xl"
        onClick={() => {
          props.isSearchOn(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </div>
      <div className="w-2xl">
        <input
          onChange={handleSearch}
          className="px-4 py-2 text-white border border-white rounded-4xl w-[-webkit-fill-available]"
          type="text"
          placeholder="Search Videos"
        />
      </div>
    </div>
  );
}

export default Header;

function SignedInMenu({ openModal }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex justify-center bg-black px-3 py-2 text-sm text-white">
        <img className="h-[30px] w-[30px] lg:w-[30px]" src="/avatar.png" />
      </MenuButton>

      <MenuItems className="absolute right-0 z-10 mt-2 w-36 rounded-md bg-white shadow-lg ring-1 ring-black/5">
        <div className="py-1">
          <MenuItem>
            <p
              onClick={openModal}
              className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900"
            >
              Create Channel
            </p>
          </MenuItem>
             <MenuItem>
             <Link to="/viewChannel">
               <p className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900">
             View Channel
            </p>
             </Link>
          </MenuItem>

          <MenuItem>
            <p className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900">
              Settings
            </p>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
