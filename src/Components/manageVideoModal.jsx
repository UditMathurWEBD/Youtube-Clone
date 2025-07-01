
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import apiRoutes from "../utils/apiRoutes.js"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EditVideoModal from "./editVideoModal.jsx";

function ManageVideosTable({ open, onClose, videos, refreshVideos }) {

  const [editOpen, setEditOpen] = useState(false);
const [videoToEdit, setVideoToEdit] = useState(null);
  const [managedvideos,setManagedVideos] = useState(videos)

const {user,isAuthenticated,token} = useSelector((state)=> state.auth)
      const navigate = useNavigate();
    useEffect(()=>{
      if(!isAuthenticated){
        navigate("/login")
      }
    },[isAuthenticated])
  

      async function handleDelete(videoId) {
        try {
          const response = await fetch(`${apiRoutes.deleteVideo}${user._id}/${videoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
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

  
        const filteredVideos = videos.filter(video => video._id !== videoId);
          setManagedVideos(filteredVideos);
        setVideos(filteredVideos);


        } catch (error) {
          toast.error(error.message);
          console.error(error);
        }
    }
  return (


    <div className="w-full overflow-x-auto mt-6">
      {managedvideos && managedvideos.length > 0 ? (
        <>
          <table className=" md:table w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-700">
                <th className="py-2">Title</th>
                <th className="py-2">Uploaded</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {managedvideos.map((video) => (
                <tr key={video._id} className="text-white border-b border-gray-800">
                  <td className="py-2 flex items-center gap-3 pl-6 flex-col md:flex-row">
                    <img
                      src={video.thumbnailUrl || "/placeholder-thumbnail.png"}
                      alt={video.title}
                      className="w-20 h-12 object-cover rounded"
                    />
                    <span>{video.title}</span>
                  </td>
                  <td className="py-2">{new Date(video.uploadDate).toLocaleDateString()}</td>
                  <td className="py-2 flex gap-2">
                
              <button
  onClick={() => {
    setVideoToEdit(video);
    setEditOpen(true);
  }}
  className="flex items-center gap-1 text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
>
  <PencilIcon className="h-4 w-4" />
  Edit
</button>

<EditVideoModal
  open={editOpen}
  onClose={() => setEditOpen(false)}
  videoData={videoToEdit}
  refreshVideos={refreshVideos}
/>

                    <button
                      className="flex items-center gap-1 text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                      onClick={()=>{handleDelete(video._id)}}
                    >
                      <TrashIcon className="h-4 w-4" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </>
      ) : (
        <p className="text-gray-400">No videos to manage.</p>
      )}
    </div>
  );
}

export default ManageVideosTable;
