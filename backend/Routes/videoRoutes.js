import { verifyJwtToken } from "../Controller/userController.js";
import { addComments, createVideo, deleteComment, deleteVideo, dislikeVideo, editComments, editVideo, getVideoData, getVideos, likeVideo } from "../Controller/videoController.js";

export function videoRoutes(app){
    app.get("/getVideos", getVideos);
    app.post("/getVideo/video",getVideoData)
    app.post("/addComments",verifyJwtToken, addComments);
    app.post("/addLike",verifyJwtToken, likeVideo);
    app.post("/addDislike",verifyJwtToken, dislikeVideo);
    app.post("/editComment",verifyJwtToken, editComments);
    app.post("/deleteComment",verifyJwtToken, deleteComment);
    app.post("/createVideo/:userId",verifyJwtToken, createVideo)
    app.put("/editVideo/:userId",verifyJwtToken, editVideo)
    app.post("/deleteVideo/:userId/:videoId",verifyJwtToken, deleteVideo)
}



// add jwt verify in main apis