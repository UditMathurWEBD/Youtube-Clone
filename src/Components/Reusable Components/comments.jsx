import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function Comment(props){
    return <div className="flex gap-4 mt-10 items-start">
        <div className="flex gap-4">
         <div className="w-auto">
            <img className="h-[40px] w-[140px] lg:w-[60px]"  src="/avatar.png"></img>
        </div>
        <div>
            <h1 className="font-semibold text-sm text-white">@uditmathur6 <span className="font-light text-xs ml-2">6 Days ago</span></h1>
            <p className="text-white text-sm mt-2">"Bad people do bad things, but they blame others and go on to live in peace.
                Good people on the other hand beat themselves up about the smallest things."This is so true!</p>
        </div>
        </div>
     
         <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-black px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ">
               <EllipsisVerticalIcon className="h-[20px] lg:h-[20px]" color="white"></EllipsisVerticalIcon>
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <p className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
           Edit
            </p>
          </MenuItem>
          <MenuItem>
            <p className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
            Delete
            </p>
          </MenuItem>
       
       
        </div>
      </MenuItems>
    </Menu>
    </div>
}


export default Comment;