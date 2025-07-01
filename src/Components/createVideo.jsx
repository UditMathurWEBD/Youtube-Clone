import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useSelector } from 'react-redux'
import apiRoutes from '../utils/apiRoutes';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function CreateVideoModal({ open, onClose, refreshVideos }) {
const {user,token} = useSelector((state)=> state.auth)
const [input,setInput] = useState({
          title : "",
          thumbnailUrl : "",
          videoUrl : "",
          description : "",
          category : "",
})
const navigate = useNavigate();

function handleInput(e){
    const {name,value} = e.target;
    setInput({...input,[name]: value})
}

async function handleCreateVideo(){
    try{
    const response = await fetch(`${apiRoutes.createVideo}${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
          title : input.title,
          thumbnailUrl : input.thumbnailUrl,
          videoUrl : input.videoUrl,
          description : input.description,
          category : input.category
      }),  
    });
    const data = await response.json();


    if (response.status === 401) {
      toast.error(data.message || "Session expired. Please login again.");
      navigate("/login");
      return;
    }

    if (!response.ok) {
      toast.error(data.message || "Something went wrong");
      return;
    }


    toast.success(data.message);
    await refreshVideos();
    onClose();

    }catch(err){
        toast.error(err.message);
    }

}


  return (
    <div>
      <Dialog open={open} onClose={onClose} className="relative z-90">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-bold text-gray-900">Create Video</DialogTitle>
               
                    </div>
                    <div className='flex flex-col'>
                    <div className='mt-4 flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-600'>Video Title</label>
                        <input name='title' onChange={handleInput} required className='border border-gray-200 p-2 rounded-lg' type='text' placeholder='Enter Video Title'></input>
                    </div>
                     <div className='mt-4 flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-600'>Video Url</label>
                        <input name='videoUrl' onChange={handleInput} required className='border border-gray-200 p-2 rounded-lg' type='text' placeholder='Enter Embedded Video Url'></input>
                    </div>
                     <div className='mt-4 flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-600'>Video Thumbnail Url</label>
                        <input name='thumbnailUrl' onChange={handleInput} required className='border border-gray-200 p-2 rounded-lg' type='text' placeholder='Enter Video Thumbnail Url'></input>
                    </div>
                    <div className='mt-4 flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-600'>Category</label>
                        <input name='category' onChange={handleInput} className='border border-gray-200 p-2 rounded-lg' type='text' placeholder='Enter Your Video Category'></input>
                    </div>
                     <div className='mt-4 flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-600'>Video Description</label>
                        <textarea name='description' onChange={handleInput} className='border border-gray-200 p-2 rounded-lg' type='text' rows={7} placeholder='Enter Video Description' />
                    </div>

                    </div>
                
                      
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Video Information</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">All the urls should be working</p>
                    <div className="mt-6">
                      <p
                 onClick={handleCreateVideo}
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                      >
                    Create Video
                      </p>
                    </div>
             
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
