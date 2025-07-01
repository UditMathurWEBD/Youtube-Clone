import Video from "../Model/videoModel.js"
import User from "../Model/createUserModel.js"

export async function createVideo(req,res){
  const {userId} = req.params;
  const {title,thumbnailUrl,videoUrl,description,category} = req.body;

     try{
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
 
        const uploaderId = user._id;
        const channelId = user.channels[0].channelId;
        const newVideo = {
          title : title,
          thumbnailUrl : thumbnailUrl,
          videoUrl : videoUrl,
          description : description,
          uploaderId : uploaderId,
          channelId : channelId,
          category :category || "All"
        }
       const videos =  await Video.create(newVideo);
       res.status(201).json({
  message: "Video Created Successfully",
  videos,
});

        }catch(err){
          res.status(500).json({message : "Error Creating Video"});
        }  

     }

export async function deleteVideo(req, res) {
  const { userId, videoId } = req.params;

  try {
    // Checking if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Finding and deleting video
    const deletedVideo = await Video.findByIdAndDelete(videoId);

    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    return res.status(200).json({
      message: "Video deleted successfully",
      videoId: videoId,
    });
  } catch (err) {
    console.error("Error deleting video:", err);
    return res.status(500).json({ message: "Error deleting video" });
  }
}

export async function editVideo(req, res) {
  const { userId } = req.params;
  const { title, thumbnailUrl, videoUrl, description, category, videoId } = req.body;

  try {
    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find video
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Update fields only if provided
    if (title !== undefined && title.trim() !== "") {
      video.title = title.trim();
    }
    if (thumbnailUrl !== undefined && thumbnailUrl.trim() !== "") {
      video.thumbnailUrl = thumbnailUrl.trim();
    }
    if (videoUrl !== undefined && videoUrl.trim() !== "") {
      video.videoUrl = videoUrl.trim();
    }
    if (description !== undefined && description.trim() !== "") {
      video.description = description.trim();
    }
    if (category !== undefined && category.trim() !== "") {
      video.category = category.trim();
    }

    await video.save();

    return res.status(200).json({
      message: "Video edited successfully",
      video,
    });
  } catch (err) {
    console.error("Error editing video:", err);
    return res.status(500).json({ message: "Error editing video" });
  }
}




export async function getVideos(req, res) {
  try {
    const totalVideos = await Video.find({}).populate("uploaderId", "username avatar");

    if (totalVideos.length === 0) {
      return res.status(404).json({ message: "No Videos Found" });
    }

    res.status(200).json({
      message: "Videos found successfully",
      data: totalVideos,
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getVideoData(req, res) {
  const { videoId,userId } = req.body;

  // 1. Validate videoId presence
  if (!videoId) {
    return res.status(400).json({ message: "videoId is required" });
  }

  try {
    const videoData = await Video.findById(videoId).populate({
      path: "comments.userId",
      select: "username avatar"
    });


    if (!videoData) {
      return res.status(404).json({ message: "No video found" });
    }

 const hasLiked = userId ? videoData.likedBy.some((id) => id.equals(userId)) : false;
const hasDisliked = userId ? videoData.dislikedBy.some((id) => id.equals(userId)) : false;


    const uploader = await User.findById(videoData.uploaderId);
    

    if (!uploader) {
      return res.status(404).json({ message: "Uploader not found" });
    }

return res.status(200).json({
  message: "Video found successfully",
  data: videoData,
  uploader: uploader,
  hasLiked,
  hasDisliked,
});

  } catch (err) {
    console.error("Error fetching video data:", err);
    return res.status(500).json({ message: "Server error" });
  }
}



export async function likeVideo(req, res) {
  const { videoId, userId } = req.body;

  try {
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

const hasLiked = video.likedBy.some((id) => id.equals(userId));
const hasDisliked = video.dislikedBy.some((id) => id.equals(userId));


    if (!hasLiked) {
      // Add like
      video.likes += 1;
      video.likedBy.push(userId);

      // If previously disliked, remove dislike
      if (hasDisliked) {
        video.dislikes -= 1;
        video.dislikedBy = video.dislikedBy.filter((id) => !id.equals(userId));
      }

      await video.save();
return res.status(200).json({
  message: "Video liked",
  likes: video.likes,
  dislikes: video.dislikes,
  hasLiked: true,
  hasDisliked: false
});

    } else {
      // Remove like
      video.likes -= 1;
    video.likedBy = video.likedBy.filter((id) => !id.equals(userId));


      await video.save();
return res.status(200).json({
  message: "Like Removed",
  likes: video.likes,
  dislikes: video.dislikes,
  hasLiked: false,
  hasDisliked: false
});

    }
  } catch (err) {
    console.error("Error in likeVideo:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function dislikeVideo(req, res) {
  const { videoId, userId } = req.body;

  try {
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

const hasLiked = video.likedBy.some((id) => id.equals(userId));
const hasDisliked = video.dislikedBy.some((id) => id.equals(userId));

    if (!hasDisliked) {
      // Add dislike
      video.dislikes += 1;
      video.dislikedBy.push(userId);

      // If previously liked, remove like
      if (hasLiked) {
        video.likes -= 1;
          video.likedBy = video.likedBy.filter((id) => !id.equals(userId));
      }

      await video.save();
return res.status(200).json({
  message: "Video Disliked",
  likes: video.likes,
  dislikes: video.dislikes,
  hasLiked: false,
  hasDisliked: true
});

    } else {
      // Remove dislike
      video.dislikes -= 1;
    video.dislikedBy = video.dislikedBy.filter((id) => !id.equals(userId));

      await video.save();
  return res.status(200).json({
  message: "Dislike removed",
  likes: video.likes,
  dislikes: video.dislikes,
  hasLiked: false,
  hasDisliked: false
});

    }
  } catch (err) {
    console.error("Error in dislikeVideo:", err);
    res.status(500).json({ message: "Server error" });
  }
}


export async function addComments(req, res) {
  const { videoId, userId, comment } = req.body;

  try {
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found. Comment not added." });
    }

    const newComment = {
      userId,
      comment,
      timestamp: new Date(),
    };

    video.comments.push(newComment);
    await video.save();

    // Get the last added comment (_id auto-generated)
    const addedComment = video.comments[video.comments.length - 1];

    // ✅ Fetch the user's username
    const user = await User.findById(userId).select("username");
    const username = user ? user.username : "Unknown User";

    res.status(200).json({
      message: "Comment added successfully",
      comment: {
        ...addedComment.toObject(),
        username, // Attach the username for immediate frontend use
      },
    });
  } catch (err) {
    console.error("Error Adding Comments:", err);
    res.status(500).json({ message: "Server error" });
  }
}





export async function editComments(req, res) {
  const { videoId, commentId, comment , userId } = req.body;

  try {
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }

const oldComment = video.comments.find((c) => c._id.equals(commentId));
const oldCommentIndex = video.comments.findIndex((c) => c._id.equals(commentId));

    if (!oldComment) {
      return res.status(404).json({ message: "Comment not found." });
    }
    if (video.comments[oldCommentIndex].userId.toString() !== userId) {
  return res.status(403).json({ message: "Not authorized to edit this comment" });
    }


    oldComment.comment = comment;
    await video.save(); 

    res.status(200).json({
      message: "Comment edited successfully",
      comment: oldComment.comment,
    });

  } catch (err) {
    console.error("Error editing comment:", err);
    res.status(500).json({ message: "Server error" });
  }
}



export async function deleteComment(req, res) {
  const { videoId, commentId, userId } = req.body;

  try {
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }

 const deletedCommentIndex = video.comments.findIndex(
  (c) => c._id.equals(commentId)
);

if (video.comments[deletedCommentIndex].userId.toString() !== userId) {
  return res.status(403).json({ message: "Not authorized to delete this comment" });
}



    if (deletedCommentIndex === -1) {
      return res.status(404).json({ message: "Comment not found." });
    }

    video.comments.splice(deletedCommentIndex, 1);
    await video.save();

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

