import MainCard from "./Reusable Components/mainCard";
import { useEffect, useState } from "react";
import apiRoutes from "../utils/apiRoutes";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(new Set());
  const [filteredVideo, setFilteredVideo] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiRoutes.videoData);
        if (!response.ok) {
          console.log("Error Fetching Data");
          return;
        }
        const data = await response.json();
        const videoList = data.data;

        // Extract unique categories and add "All"
        const categorySet = new Set(videoList.map((video) => video.category));
        setCategories(new Set(["All", ...categorySet]));

        setVideos(videoList);
        setFilteredVideo(videoList); // Initially show all videos
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

function handleFilter(e) {
    const category = e.target.name;
    if (category === "All") {
      setFilteredVideo(videos);
    } else {
      setFilteredVideo(
        videos.filter(
          (video) => video.category.toLowerCase() === category.toLowerCase()
        )
      );
    }
  }

  return (
    
    <div className="flex flex-col relative top-[60px] max-w-full lg:w-[87%] lg:top-[0px] m-auto lg:mt-14">

      {/* Categories Area */}
       <div className="overflow-x-auto mt-6">
      <div className="flex gap-2 px-4 py-2 whitespace-nowrap w-max">
        {Array.from(categories).map((item, index) => (
          <button name={item}
          onClick={handleFilter}
            key={index}
            className="shrink-0 px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
          >

            {item}
          </button>
        ))}
      </div>
    </div>



{/* Video Showing Area */}
<div
  className="grid gap-4 p-4 mt-6 grid-cols-1 lg:grid-cols-3"

>
  {filteredVideo.map((video) => (
    <MainCard key={video._id} data={video} />
  ))}
</div>



    </div>
  );
}

export default Home;
