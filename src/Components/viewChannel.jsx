import videoData from "../utils/videoData";
import MainCard from "./Reusable Components/mainCard";

function ViewChannel(){
    

    return <div className="flex flex-col relative top-[100px] lg:p-4 ">
       <div className="flex flex-col ">
        <img className="lg:rounded-2xl" src="/banner.png"></img>
        <div className="flex gap-4 items-start flex-wrap p-6 mt-[-60px] lg:mt-[0px]">
   <img className="rounded-2xl w-[100px] lg:w-[160px] mt-6 lg:pl-4" src="/avatar.png"></img>
   <div className="mt-6">
    <h1 className="text-4xl text-white font-bold">Udit Mathur</h1>
    <h1 className="text-white mt-4">@uditmathur9159 • 2 subscribers • 2 videos</h1>
    <p className="text-white mt-4">More information about me...</p>
    <div className="flex gap-2 mt-4">
            <button className="text-white bg-[#272727] py-2 px-4 rounded-full text-sm font-semibold">Customize Channel</button>
            <button className="text-white bg-[#272727] py-2 px-4 rounded-full text-sm font-semibold">Manage Videos</button>
    </div>
   </div>
        </div>
  
    </div>
    <div className="p-6 flex">
        <h1 className="text-white border-b-2 w-max pb-2 px-4 border-b-white">Home</h1>
         <h1 className="text-white border-b-2 w-max pb-2 px-4 border-b-gray-500">Videos</h1>
          <h1 className="text-white border-b-2 w-max pb-2 px-4 border-b-gray-500">Shorts</h1>
            <h1 className="text-white border-b-2 w-max pb-2 px-4 border-b-gray-500">More</h1>
    </div>

              <div className="grid gap-4 p-4 mt-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
  {videoData.map((video) => (
    <MainCard key={video.videoId} data={video} />
  ))}
</div>
    </div>

}

export default ViewChannel;