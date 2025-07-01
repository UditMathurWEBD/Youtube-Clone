import { MagnifyingGlassCircleIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import CreateChannelModal from "../createChannelPage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../utils/authDataReducer";
import toast from "react-hot-toast";

function Header(props) {
const navigate = useNavigate();
const dispatch = useDispatch();
const {isAuthenticated } = useSelector(state => state.auth);
const [isSearchOn, setIsSearchOn] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);
const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);
const [searchInput,setSearchInput] = useState("");

function handleInput(e){
  setSearchInput(e.target.value)
}

function handleDiv() {
setIsSearchOn(!isSearchOn);
}

function handleSearch() {
  if(searchInput.length > 2){
    navigate(`/searchPage/${searchInput.trim().toLowerCase()}`);
  }else{
    toast.error("Add More words")
  }


}

function handleSidebar() {
props.value(prev => !prev); 

}

return isSearchOn ? (
<SearchDiv isSearchOn={setIsSearchOn} handleInput={handleInput} handleSearch={handleSearch} />
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
<div className="hidden sm:w-sm sm:block lg:w-lg md:flex">
<input
onChange={handleInput}
className="px-4 py-2 text-white border border-white rounded-4xl w-[-webkit-fill-available]"
type="text"
placeholder="Search Videos"
/>
<MagnifyingGlassCircleIcon onClick={handleSearch} className="relative right-[40px]" color="white" width={40}></MagnifyingGlassCircleIcon>
</div>
{isAuthenticated ?<SignedInMenu openModal={openModal} navigate={navigate} dispatch={dispatch}></SignedInMenu>   : 
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


function SearchDiv({ isSearchOn, handleInput, handleSearch }) {
  return (
    <div className="flex justify-between items-center px-4 py-4 gap-4">
      <div
        className="bg-red-600 p-2 rounded-4xl"
        onClick={() => isSearchOn(false)}
      >
        {/* back arrow */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
        </svg>
      </div>
      <div className="w-2xl flex gap-2">
        <input
          onChange={handleInput}
          className="px-4 py-2 text-white border border-white rounded-4xl w-full"
          type="text"
          placeholder="Search Videos"
        />
        <MagnifyingGlassCircleIcon onClick={handleSearch} className="shrink-0" color="white" width={40} />
      </div>
    </div>
  );
}


export default Header;

function SignedInMenu({ openModal , navigate, dispatch}) {
const { user } = useSelector((state) => state.auth);


function logoutHandler() {
// Remove token from storage
localStorage.removeItem("user");

// Dispatch logout
dispatch(logout());


// Redirect
navigate("/login");
}

return (
<Menu as="div" className="relative inline-block text-left">
<MenuButton className="inline-flex justify-center items-center gap-2 bg-black px-3 py-2 font-semibold text-sm text-white">
<img className="h-[30px] w-[30px] lg:w-[30px] rounded-full" src={user?.avatar || "https://www.w3schools.com/w3images/avatar5.png"} /> <span>{user?.username || "User"}</span>
</MenuButton>

<MenuItems className="absolute right-0 z-10 mt-2 w-36 rounded-md bg-white shadow-lg ring-1 ring-black/5">
<div className="py-1">

{user?.channels && user.channels.length > 0 ? (
  <MenuItem>
    <Link to={`/viewChannel/${user.channels[0].channelUsername}`}>
      <p className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900">
        View Channel
      </p>
    </Link>
  </MenuItem>
) : (
  <MenuItem>
    <p
      onClick={openModal}
      className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900"
    >
      Create Channel
    </p>
  </MenuItem>
)}


<MenuItem>
<p className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900">
Settings
</p>
</MenuItem>
<MenuItem onClick={logoutHandler}>
<p className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900">
Logout
</p>
</MenuItem>
</div>
</MenuItems>
</Menu>
);
}
