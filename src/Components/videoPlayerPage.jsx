import { useNavigate, useParams } from "react-router-dom";
import SideVideoCard from "./Reusable Components/sideVideoCard";
import { useEffect, useState } from "react";
import {
  ArrowDownTrayIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/16/solid";
import CommentArea from "./Reusable Components/commentArea";
import apiRoutes from "../utils/apiRoutes";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../utils/authDataReducer";

function VideoPlayerPage() {
  const { videoId } = useParams();
 const { user, token,isAuthenticated } = useSelector((state) => state.auth);
  const [vidData, setVideoData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [likes,setLikes] = useState(0);
  const [dislikes,setDislikes] = useState(0);
  const [isLiked, setIsLiked] = useState();
  const [isDisliked, setIsDisliked] = useState();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploader, setUploader] = useState(null);
  const dispatch = useDispatch();

  const userId = user?._id ?? null;
const navigate = useNavigate();

  console.log(user,isAuthenticated);
  // Fetch current video
useEffect(() => {
  if (user === undefined) return; // still loading

  async function getData() {
    setIsLoading(true);
    try {
      const response = await fetch(apiRoutes.getVideoData, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId: videoId,
          userId: user?._id ?? null
        }),
      });

      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.message || "Something went wrong");
      }

      setIsLiked(resJson.hasLiked);
      setIsDisliked(resJson.hasDisliked);
      setLikes(resJson.data.likes);
      setDislikes(resJson.data.dislikes);
      setVideoData(resJson.data);
      setUploader(resJson.uploader);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  getData();
}, [videoId, user]);



  // Fetch all videos for recommended list
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiRoutes.videoData);
        const resJson = await response.json();

        if (!response.ok) {
          throw new Error(resJson.message || "Error Fetching Data");
        }

        const videoList = resJson.data;
        setVideos(videoList);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  // Like/Dislike Handlers
 async function handleLike() {
if (!isAuthenticated) {
  navigate("/login");
  return;
}
    try{
      const response = await fetch(apiRoutes.addLike,{
          method: "POST",
           headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}` },
          body: JSON.stringify({ videoId : videoId, userId : user._id }),
        
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
      if(!response.ok){
          throw new Error(data.message || "Error Fetching Data");
      }

      toast.success(data.message);
      setIsLiked(data.hasLiked);
setIsDisliked(data.hasDisliked);
setLikes(data.likes);
setDislikes(data.dislikes);

    }catch(err){
      console.error(err);
toast.error(err.message || "Something went wrong");
    }

  }

 async function handleDislike() {
  if (!isAuthenticated) {
  navigate("/login");
  return;
}
        try{
      const response = await fetch(apiRoutes.addDislike,{
          method: "POST",
              headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}` },
          body: JSON.stringify({ videoId : videoId, userId : user._id }),
        
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
            if(!response.ok){
             throw new Error(data.message || "Error Fetching Data");
      }
      toast.success(data.message);
      setIsLiked(data.hasLiked);
setIsDisliked(data.hasDisliked);
setLikes(data.likes);
setDislikes(data.dislikes);
    }catch(err){
      console.error(err);
toast.error(err.message || "Something went wrong");
    }


  }

  // Video description preview
  const fullText = vidData?.description || "";
  const previewText = fullText.slice(0, 250);

  // Loader
if (isLoading || !vidData || user === undefined) {
  return <p>Loading...</p>;
}

  return (
    <div className="flex flex-wrap mt-6 top-[60px] relative w-full justify-center p-2 lg:p-8">
      {/* Main Video Section */}
      <div className="w-full lg:w-[65%] p-4">
        {/* <video className="w-full rounded-lg" controls>
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        
<iframe className="w-[-webkit-fill-available] h-[400px] mb-10" src={vidData.videoUrl || "https://www.youtube.com/embed/JlwJn3DdUak?si=XZmrVQUITaD0HT7h"} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <div className="flex flex-col mt-2">
          <h1 className="text-white text-xl font-bold">{vidData.title}</h1>

          <div className="flex gap-4 mt-2 items-center justify-between flex-wrap">
            <div className="flex gap-4 mt-2 items-center justify-between w-full lg:w-auto">
              <div className="flex gap-2 items-center">
                <img
                  className="w-[40px] h-[40px] rounded-full object-cover"
                  src={vidData.channelImageUrl || "/avatar.png"}
                />
                <div>
                  <p className="text-gray-200 font-bold text-sm mt-1">{uploader?.channels[0].channelName}</p>
                  <p className="text-gray-400 text-xs mt-1">30M Subscribers</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white text-black font-medium text-sm rounded-4xl">
                Subscribe
              </button>
            </div>

            <div className="flex gap-2 justify-center items-center max-w-full">
              <div className="bg-[#272727] px-4 py-2 rounded-full flex gap-4 justify-center items-center">
                <button onClick={handleLike} className="flex gap-2 text-white text-sm">
                  <HandThumbUpIcon height={20} color={isLiked ? "white" : "gray"} /> {likes}
                </button>
                <div className="h-5 bg-gray-300 w-[0.1px]"></div>
                <button onClick={handleDislike} className="flex gap-2 text-white">
                  <HandThumbDownIcon height={20} color={isDisliked ? "white" : "gray"}  />{dislikes}
                </button>
              </div>
              <button className="bg-[#272727] px-4 py-2 flex rounded-full items-center text-white text-sm gap-2">
                <ShareIcon height={20} color="white" /> Share
              </button>
              <button className="bg-[#272727] px-4 py-2 flex rounded-full items-center text-white text-sm gap-2">
                <ArrowDownTrayIcon height={20} color="white" /> Download
              </button>
            </div>
          </div>

          <div className="w-auto mt-6 text-white bg-[#272727] p-4 border border-gray-800 rounded-2xl">
            <h1 className="font-bold text-md">
              {vidData.views.toLocaleString()} views ·{" "}
              {new Date(vidData.uploadDate).toLocaleDateString()}
            </h1>
            <p className="font-normal text-sm mt-4 whitespace-pre-line">
              {isExpanded ? fullText : previewText + "..."}
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-400 text-sm mt-2 hover:underline"
            >
              {isExpanded ? "Read less" : "Read more"}
            </button>
          </div>

          <CommentArea comments={vidData.comments} videoId={vidData._id} />
        </div>
      </div>

      {/* Recommended Section */}
      <div className="w-full lg:w-[35%] p-4 flex flex-col gap-4">
        <h1 className="text-white font-bold">Recommended Videos</h1>
        {videos
          .filter((video) => video._id !== videoId)
          .map((video) => (
            <SideVideoCard key={video._id} data={video} />
          ))}
      </div>
    </div>
  );
}

export default VideoPlayerPage;
