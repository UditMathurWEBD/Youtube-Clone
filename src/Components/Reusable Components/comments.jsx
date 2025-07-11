import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import apiRoutes from "../../utils/apiRoutes";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import EditCommentModal from "./editCommentModal";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { logout } from "../../utils/authDataReducer";


function Comment(props){
  const {user,token} = useSelector((state)=> state.auth)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);
 async function deleteComment(){
   try{
    const response = await fetch(apiRoutes.deleteComment,{
      method : "POST",
      headers: {
        "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
      body : JSON.stringify({
        videoId : props.videoId,
        commentId : props.data._id,
        userId : user._id
      })
    })
       const data = await response.json();

             if (response.status === 401) {
      toast.error(data.message || "Session expired. Please login again.");
      navigate("/login");
      // Remove token from storage
      localStorage.removeItem("user");

      // Dispatch logout
      dispatch(logout());
      
      return;
    }
    if (!response.ok) {
      toast.error(data.message || "Delete was not possible at the moment");
      return;
    }

    if (props.onDelete) {
        props.onDelete(props.data._id);
      }
 
    toast.success(data.message || "Deleted");

   }catch(err){
    toast.error(err);
    console.error(err);
   }
  }
    return <>
<div className="flex gap-4 mt-10 items-start justify-between">
        <div className="flex gap-4">
         <div className="w-auto">
            <img className="h-[40px] w-[40px] lg:w-[40px] rounded-full"  src={props.data.userId?.avatar || "/avatar.png"}></img>
        </div>
        <div>
<h1 className="font-semibold text-sm text-white">
  {props.data.userId?.username || "Unknown User"}
  <span className="font-light text-xs ml-2">{props.data.timestamp}</span>
</h1>

            <p className="text-white text-sm mt-2">{props.data.comment}</p>
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
            <p onClick={openModal} className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
           Edit
            </p>
          </MenuItem>
          <MenuItem>
            <p onClick={deleteComment} className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
            Delete
            </p>
          </MenuItem>
       
       
        </div>
      </MenuItems>
    </Menu>
    </div>
  <EditCommentModal
  open={isModalOpen}
  onClose={closeModal}
  data={props.data}
  videoId={props.videoId}
  onEdit={props.onEdit}
/>

        </>
}


export default Comment;