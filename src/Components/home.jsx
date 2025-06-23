import MainCard from "./Reusable Components/mainCard";
import videoData from "../utils/videoData";

function Home() {
  const youtubeCategories = [
    "Music",
    "Gaming",
    "Education",
    "News",
    "Sports",
    "Entertainment",
    "Science & Technology",
    "How-to & Style",
    "Comedy",
    "Film & Animation",
    "People & Blogs",
    "Travel & Events",
    "Autos & Vehicles",
    "Pets & Animals",
    "Nonprofits & Activism",
  ];


  return (
    <div className="flex flex-col relative top-[60px] max-w-full lg:w-[87%] lg:top-[0px] m-auto lg:mt-14">

      {/* Categories Area */}
       <div className="overflow-x-auto mt-6">
      <div className="flex gap-2 px-4 py-2 whitespace-nowrap w-max">
        {youtubeCategories.map((item, index) => (
          <button
            key={index}
            className="shrink-0 px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
          >
            {item}
          </button>
        ))}
      </div>
    </div>



{/* Video Showing Area */}

      <div className="grid gap-4 p-4 mt-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
  {videoData.map((video) => (
    <MainCard key={video.videoId} data={video} />
  ))}
</div>

    </div>
  );
}

export default Home;
