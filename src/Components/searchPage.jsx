import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchVideoCard from "./Reusable Components/searchVideoCard";
import apiRoutes from "../utils/apiRoutes";

function SearchPage() {
  const { searchString } = useParams();
  const [videos, setVideos] = useState([]);
  const [searchedVideos, setSearchVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Start loading each time searchString changes
      try {
        const response = await fetch(apiRoutes.videoData);
        if (!response.ok) {
          console.log("Error fetching data");
          return;
        }
        const data = await response.json();
        const videoList = data.data;
        setVideos(videoList);

        const filteredVideos = videoList.filter((video) =>
          video.title.toLowerCase().includes(searchString.toLowerCase())
        );
        setSearchVideos(filteredVideos);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [searchString]);

  return (
    <div className="flex flex-col relative top-[90px]">
      {loading ? (
        <p className="text-white text-center mt-10">Loading...</p>
      ) : (
        <>
          <h1 className="text-white mb-4 ml-6">
            Search has produced {searchedVideos.length} results.
          </h1>
          {/* {searchedVideos.length === 0 && (
            <p className="text-gray-400 text-center">No videos matched your search.</p>
          )} */}
          <div className="flex flex-col gap-10">
            {searchedVideos.map((video) => (
              <SearchVideoCard key={video._id} data={video} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SearchPage;
