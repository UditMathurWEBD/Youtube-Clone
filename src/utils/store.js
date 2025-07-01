import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authDataReducer.js";



const youtubeStore = configureStore({
    reducer : {
        auth : authReducer
    }

})


export default youtubeStore;