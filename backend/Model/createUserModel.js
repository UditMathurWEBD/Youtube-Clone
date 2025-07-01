import mongoose from "mongoose";

const createUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: "/avatar.png"
  },
  channels: {
    type: [ 
    {
      channelId : {
        type : String,
       },
      channelName: {
        type: String,
        required: true
      },
      channelUsername: {
        type: String,
        required: true
      },
      subscribers : {
        type: Number,
        default : 0,
      },
      information : {
        type : String,
        default : "New Channel"
      }
    }
        ],
    default: []
  },
  banner: {
    type: String,
    default: "/banner.png"
  }
});

const User = mongoose.model("User", createUserSchema);
export default User;
