import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
  },
  videoUrl : {
       type: String,
       default : "/video.mp4"
  },
  description: {
    type: String
  },
  channelId: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
likedBy: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
],
  dislikes: {
    type: Number,
    default: 0
  },
dislikedBy: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
],

  uploaderId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},
uploadDate : {
     type: Date,
      default: Date.now
},
category : {
  type : String,
  default : "All"
},
comments: [
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }
]

});

const Video = mongoose.model("Video", videoSchema);
export default Video;
