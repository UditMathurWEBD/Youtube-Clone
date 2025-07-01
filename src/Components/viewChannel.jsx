import { useNavigate, useParams } from "react-router-dom";
import MainCard from "./Reusable Components/mainCard";
import { useEffect, useState } from "react";
import apiRoutes from "../utils/apiRoutes";
import toast from "react-hot-toast";
import { PlusIcon } from "@heroicons/react/16/solid";
import CreateVideoModal from "./createVideo";
import ManageVideosTable from "./manageVideoModal";
import { useSelector } from "react-redux";

export default function ViewChannel() {
  const { channelUsername } = useParams();
 const [data, setData] = useState(null);
 const [allVideos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const { isAuthenticated,token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
  useEffect(()=>{
    if(!isAuthenticated){
      navigate("/login")
    }
  },[isAuthenticated])

    async function getChannelData() {
      try {
        const response = await fetch(`${apiRoutes.getChannelData}${channelUsername}`);
        const result = await response.json();

        if (!response.ok) {
          toast.error(result.message || "Error getting data");
          setLoading(false);
          return;
        }
        setData(result);
        setVideos(result.videos);

      } catch (err) {
        console.error(err);
        toast.error("Something went wrong fetching channel data.");
      } finally {
        setLoading(false);
      }
    }

    getChannelData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-lg">Loading Channel...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-lg">No channel data found.</p>
      </div>
    );
  }

  const { user, channel, videos } = data;

  return (
    <>
      <div className="flex flex-col relative top-[100px] lg:p-4">
        {/* Banner */}
        <div className="flex flex-col">
          <img className="lg:rounded-2xl" src="/banner.png" alt="Channel Banner" />
          <div className="flex gap-4 items-start flex-wrap p-6 mt-[-60px] md:mt-0 lg:mt-[0px]">
            <img
              className="w-[100px] lg:w-[160px] aspect-square rounded-full object-cover mt-6"
              src={user?.avatarUrl || "/avatar.png"}
              alt="Channel Avatar"
            />
            <div className="mt-6">
              <h1 className="text-4xl text-white font-bold">{user?.username}</h1>
              <h1 className="text-white mt-4">
                {channel?.channelUsername} • {channel?.subscribers} subscribers • {videos?.length || 0} videos
              </h1>
              <p className="text-white mt-4">More information about me...</p>
              <div className="flex gap-2 mt-4">
                {!manageOpen && (
                  <>
                    <button
                      onClick={() => setManageOpen(true)}
                      className="text-white bg-[#272727] py-2 px-4 rounded-full text-sm font-semibold"
                    >
                      Manage Videos
                    </button>
                    <button
                      onClick={() => setOpen(true)}
                      className="text-white bg-[#272727] flex gap-1 cursor-pointer py-2 px-4 rounded-full text-sm font-semibold"
                    >
                      <PlusIcon width={20} /> Create Video
                    </button>
                  </>
                )}
                {manageOpen && (
                  <button
                    onClick={() => setManageOpen(false)}
                    className="text-white bg-[#272727] py-2 px-4 rounded-full text-sm font-semibold"
                  >
                    Back to Channel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Conditional Content */}
        {manageOpen ? (
<ManageVideosTable
  open={manageOpen}
  onClose={() => setManageOpen(false)}
  videos={videos}
  refreshVideos={getChannelData}
/>


        ) : (
          <div className="grid gap-4 p-4 mt-0 lg:grid-cols-3">
            {videos && videos.length > 0 ? (
              videos.map((video) => <MainCard key={video._id} data={video} />)
            ) : (
              <p className="text-white">No videos uploaded yet.</p>
            )}
          </div>
        )}
      </div>

   <CreateVideoModal open={open} onClose={() => setOpen(false)} refreshVideos={getChannelData} />

    </>
  );
}

