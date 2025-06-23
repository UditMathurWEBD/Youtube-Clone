import { EllipsisVerticalIcon } from "@heroicons/react/16/solid"
import { Link } from "react-router-dom"

function MainCard(props){
 return <div className="rounded-4xl">
        <Link to={`/video/${props.data.videoId}`}>
        <img className="w-full" src={props.data.thumbnailUrl}/>
             </Link>
        <div className="flex justify-between">
        <div  className="flex items-start px-4 py-1 gap-2">
  
        <img
          src={props.data.channelImageUrl}
          alt="Channel Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
     
        <div className="px-2">
            <h1 className="text-white text-sm font-semibold">{props.data.title}</h1>
             <p className="text-gray-400 text-xs mt-1">{props.data.uploader}</p>
            <p className="text-gray-400 text-xs mt-1">{props.data.views} Views | {props.data.uploadDate}</p>
             
        </div>
        </div>
            <Link className="pt-2"  to=""><EllipsisVerticalIcon height={20} color="white"></EllipsisVerticalIcon></Link>
        </div>
      

     
    </div>
   
}



export default MainCard