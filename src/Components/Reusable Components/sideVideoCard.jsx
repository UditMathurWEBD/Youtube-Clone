import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiRoutes from "../../utils/apiRoutes";

function SideVideoCard(props) {

  return (
    <div className="flex gap-2">
      <Link to={`/video/${props.data._id}`} className="flex gap-2 w-full">
        <div className="w-[45%] aspect-video rounded-md overflow-hidden">
          <img
            src={props.data.thumbnailUrl}
            alt={props.data.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-[55%]">
          <h1 className="text-white font-semibold text-sm mb-1 line-clamp-2">
            {props.data.title}
          </h1>
          <p className="text-gray-400 font-medium text-xs">
            {props.data.uploaderId.username || "Loading..."}
          </p>
          <p className="text-gray-400 text-xs mt-1">
            {props.data.views} Views | 3 Days ago
          </p>
        </div>
      </Link>
      <EllipsisVerticalIcon height={20} color="white" />
    </div>
  );
}

export default SideVideoCard;
