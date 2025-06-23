import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";


function SideVideoCard(props){
    return <>
    <div className="flex gap-2">
        <div className="w-[45%]">
            <img src={props.data.thumbnailUrl}></img>
        </div>
        <div className="w-[55%]">
            <h1 className="text-white font-semibold text-sm mb-1">{props.data.title}</h1>
            <p className="text-gray-400 font-medium text-xs">{props.data.uploader}</p>
              <p className="text-gray-400 text-xs mt-1">{props.data.views} Views | 3 Days ago</p>

        </div>
         <Link  to=""><EllipsisVerticalIcon height={20} color="white"></EllipsisVerticalIcon></Link>



    </div>        
    </>
}


export default SideVideoCard;