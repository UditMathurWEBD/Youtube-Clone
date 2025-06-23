
import { useParams } from "react-router-dom";
import SideVideoCard from "./Reusable Components/sideVideoCard";
import videoData from "../utils/videoData";
import { useEffect, useState } from "react";
import { ArrowDownTrayIcon, HandThumbDownIcon, HandThumbUpIcon, ShareIcon } from "@heroicons/react/16/solid";
import CommentArea from "./Reusable Components/commentArea";

function VideoPlayerPage() {
const [vidData, setVideoData] = useState(null);
const { videoId } = useParams();
const [isLiked, setIsLiked]  = useState(false);
const [isDisiked, setIsDisliked]  = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const fullText = `It’s time to play the final games. Squid Game 3 premieres June 27, only on Netflix.
From Season 1 to Season 3, Gi-hun’s been fighting until the very end. Will he beat the deadly Squid Game? Or will the Front Man continue to be one step ahead?
More info on Squid Game Season 3: A failed rebellion, the death of a friend, and a secret betrayal. Picking up in the aftermath of Season 2’s bloody cliffhanger, the third and final season of Netflix’s most popular series finds Gi-hun, a.k.a. Player 456, at his lowest point yet. But the Squid Game stops for no one, so Gi-hun will be forced to make some important choices in the face of overwhelming despair as he and the surviving players are thrust into deadlier games that test everyone’s resolve. With each round, their choices lead to increasingly grave consequences. Meanwhile, In-ho resumes his role as Front Man to welcome the mysterious VIPs, and his brother Jun-ho continues his search for the elusive island, unaware there’s a traitor in their midst. Will Gi-hun make the right decisions, or will Front Man finally break his spirit?
Director Hwang Dong-hyuk, who made history at the 74th Primetime Emmys®, becoming the first Asian to win Outstanding Directing for a Drama Series, once again helms the series as director, writer, and producer. Season 3 stars Lee Jung-jae, Lee Byung-hun, Yim Si-wan, Kang Ha-neul, Wi Ha-jun, Park Gyu-young, Park Sung-hoon, Yang Dong-geun, Kang Ae-sim, Jo Yu-ri, Chae Kuk-hee, Lee David, Roh Jae-won, and Jun Suk-ho, with special appearance by Park Hee-soon.`;

  const previewText = fullText.slice(0, 250);

useEffect(() => {
const data = videoData.find((video) => video.videoId === videoId);
setVideoData(data);
}, [videoId]);

// ✅ Early return if data isn't ready
if (!vidData) {
return <div className="text-white text-center mt-10">Loading video...</div>;
}

function handleLike(){
  setIsLiked(!isLiked);

   setIsDisliked(()=>{
 if(isDisiked == true){
  setIsDisliked(false);
 }
   } );
  
 
}
function handleDislike(){
  setIsDisliked(!isDisiked);
     setIsLiked(()=>{
 if(isLiked == true){
  setIsLiked(false);
 }
   } );
  
}



return (
<div className="flex flex-wrap mt-6 top-[60px] relative w-full justify-center p-2 lg:p-8">
<div className="w-full lg:w-[65%] p-4">
<video className="w-full rounded-lg" controls>
<source src={vidData.videoUrl} type="video/mp4" />
Your browser does not support the video tag.
</video>
<div className="flex flex-col mt-2">
<h1 className="text-white text-xl font-bold">{vidData.title}</h1>


<div className="flex gap-4 mt-2 items-center justify-between flex-wrap">
<div className="flex gap-4 mt-2 items-center justify-between w-[-webkit-fill-available] lg:w-auto ">
<div className="flex gap-2 items-center">
<img className="w-[40px] h-[40px]" src={vidData.channelImageUrl}/>
<div>
<p className="text-gray-200 font-bold text-sm mt-1">{vidData.uploader}</p>
<p className="text-gray-400 text-xs mt-1">30M Subscribers</p>
</div>
</div>
<button className="px-4 py-2 bg-white text-black font-medium text-sm rounded-4xl">Subscribe</button>
</div>

<div className="flex gap-2 justify-center items-center max-w-[100%]">
<div className="bg-[#272727] px-4 py-2 rounded-full flex gap-4 justify-center items-center">
  <button onClick={handleLike} className="flex gap-2 text-white cursor-pointer text-sm"><HandThumbUpIcon height={20} color={isLiked ? "white" : "gray"}></HandThumbUpIcon> 267K</button>
  <div className="h-5 bg-gray-300 w-[0.1px]"></div>
    <button onClick={handleDislike} className="flex gap-2 text-white cursor-pointer"><HandThumbDownIcon height={20} color={isDisiked ? "white" : "gray"}></HandThumbDownIcon> </button>
</div>
<button className="bg-[#272727] px-4 py-2 flex rounded-full items-center text-white text-sm gap-2"><ShareIcon height={20} color="white"></ShareIcon> Share</button>
<button className="bg-[#272727] px-4 py-2 flex rounded-full items-center text-white text-sm gap-2"><ArrowDownTrayIcon height={20} color="white"></ArrowDownTrayIcon > Download</button>
</div>
</div>


 <div className="w-auto mt-6 text-white bg-[#272727] p-4 border border-gray-800 rounded-2xl">
      <h1 className="font-bold text-md">9,794,464 views · Jun 14, 2025</h1>
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

    <CommentArea></CommentArea>

</div>
</div>

<div className="w-full lg:w-[35%] p-4 flex flex-col gap-4">
<h1 className="text-white font-bold">Recommended Videos</h1>
{videoData.map((video) => (
<SideVideoCard key={video.videoId} data={video} />
))}
</div>
</div>
);
}

export default VideoPlayerPage;
