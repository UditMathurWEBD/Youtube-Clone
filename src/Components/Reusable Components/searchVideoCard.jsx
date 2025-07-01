import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

function SearchVideoCard(props){
  console.log(props.data);
    return <div className="flex flex-wrap ">
    <div className="lg:w-[40%] p-4">
    <Link to={`/video/${props.data._id}`}>
    <div className="w-full aspect-video overflow-hidden rounded-2xl">
     <img
    src={props.data.thumbnailUrl}
    alt={props.data.title}
    className="w-full h-full object-cover"
  />
    </div>
    </Link>
    </div>
    <div className="flex justify-between items-start w-[-webkit-fill-available] lg:w-[60%] px-6">
    <div>
            <h1 className="text-white text-xl font-semibold">{props.data.title}</h1>
            <p className="text-gray-400 text-md mt-1">{props.data.views} Views | {props.data.uploadDate}</p>
            <div className="hidden lg:flex mt-4  gap-4">
                    <img
          src={props.data.uploaderId.avatar || "/avatar.png"}
          alt="Channel Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
          <p className="text-gray-400 text-md mt-1">{props.data.uploaderId.username}</p>

            </div>
            <div>
              <p className="hidden lg:block text-sm font-medium mt-6 text-white">{props.data.description}</p>
            </div>
    </div>
  <Link className="pt-2"  to=""><EllipsisVerticalIcon height={20} color="white"></EllipsisVerticalIcon></Link>
    </div>
        
    </div>
}

export default SearchVideoCard;