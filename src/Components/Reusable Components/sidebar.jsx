import {
  HomeIcon,
  VideoCameraIcon,
  ClockIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const menuItems = [
  { label: "Home", icon: <HomeIcon className="h-6 w-6" /> ,route: "/" },
  { label: "Subscriptions", icon: <VideoCameraIcon className="h-6 w-6" /> },
  { label: "Watch Later", icon: <ClockIcon className="h-6 w-6" /> },
  { label: "Settings", icon: <Cog6ToothIcon className="h-6 w-6" /> },
  { label: "Home", icon: <HomeIcon className="h-6 w-6" /> },
  { label: "Subscriptions", icon: <VideoCameraIcon className="h-6 w-6" /> },
  { label: "Watch Later", icon: <ClockIcon className="h-6 w-6" /> },
  { label: "Settings", icon: <Cog6ToothIcon className="h-6 w-6" /> },
  { label: "Subscriptions", icon: <VideoCameraIcon className="h-6 w-6" /> },
  { label: "Watch Later", icon: <ClockIcon className="h-6 w-6" /> },
  { label: "Settings", icon: <Cog6ToothIcon className="h-6 w-6" /> },
];


function Sidebar({ isOpen }) {
  return (
    <div
      className={`${
        isOpen ? "w-auto" : "w-auto"
      } ${
        isOpen ? "block" : "hidden"
      } lg:flex fixed lg:relative sm:top-[70px] left-0 z-50 h-screen bg-black text-white transition-all duration-300 p-4 lg:z-auto top-[70px] `}
    >
      <nav className="flex flex-col gap-4">
        {menuItems.map((item, index) => (
          <Link      key={index} to={item.route}>

  
          <div
       
            className="flex items-center gap-4 hover:bg-[#4a4a4a] p-2 rounded-md cursor-pointer"
          >
            {item.icon}
            {isOpen && <span className="text-sm">{item.label}</span>}
          </div>
                  </Link>
        ))}
      </nav>
    </div>
  );
}



export default Sidebar;











// function Sidebar({ isOpen }) {
//   return (
//     <div
//       className={`${
//         isOpen ? "w-70" : "w-20"
//       } bg-black text-white h-screen transition-all duration-300 p-4 flex flex-col absolute z-10 lg:relative`}
//     >
//       <nav className="flex flex-col gap-4">
//         {menuItems.map((item, index) => (
//           <div
//             key={index}
//             className="flex items-center gap-4 hover:bg-[#4a4a4a] p-2 rounded-md cursor-pointer"
//           >
//             {item.icon}
//             {isOpen && <span className="text-sm">{item.label}</span>}
//           </div>
//         ))}
//       </nav>
//     </div>
//   );
// }
