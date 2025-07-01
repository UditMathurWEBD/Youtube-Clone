import {registerUser,loginUser, createChannel, getUserData, verifyJwtToken, getChannelData} from "../Controller/userController.js";

export function userRoutes(app){
    app.post("/getUserData", getUserData)
    app.post("/register", registerUser);
    app.post("/login", loginUser);
    app.post("/createChannel",verifyJwtToken, createChannel);
    app.get("/channel/:channelUsername", getChannelData);
}


