import {  useState } from "react";
import Comment from "./comments";
import toast from "react-hot-toast";
import apiRoutes from "../../utils/apiRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/authDataReducer";

function CommentArea(props){
  const {user,token} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input,setInput]= useState("");
  function handleInput(event){
    setInput(event.target.value);
  }
const [comments, setComments] = useState(props.comments || []);

async function handleSubmit(e) {
  e.preventDefault();
  if (input === "") {
    return toast.error("Add a comment");
  }

  try {
    const response = await fetch(apiRoutes.addComment, {
      method: "POST",
    headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        videoId: props.videoId,
        userId: user._id,
        comment: input,
      }),
    });

    const resJson = await response.json();
     if (response.status === 401) {
      toast.error(resJson.message || "Session expired. Please login again.");
      navigate("/login");
      // Remove token from storage
      localStorage.removeItem("user");
      // Dispatch logout
      dispatch(logout());
      
      return;
    }
    if (!response.ok) {
      throw new Error(resJson.message || "Something went wrong");
    }

const newComment = {
  _id: resJson.comment._id,
  userId: {
    _id: user._id,
    username: user.username,
    avatar: user.avatar,
  },
  comment: resJson.comment.comment,
  timestamp: resJson.comment.timestamp,
};

setComments((prev) => [newComment, ...prev]);


    toast.success(resJson.message);
    setInput("");
  } catch (error) {
    console.error("Error adding comment:", error);
    toast.error("Failed to add comment");
  }


}
  function handleCommentDelete(deletedCommentId) {
    setComments((prev) => prev.filter((c) => c._id !== deletedCommentId));
  }

  function handleCommentEdit(editedComment) {
  setComments((prev) =>
    prev.map((c) =>
      c._id === editedComment._id ? { ...c, comment: editedComment.comment } : c
    )
  );
}



    return <>
    <div className="mt-10 mb-20">
<h1 className="text-white font-bold">{comments.length} Comments</h1>
    <form className="mt-6">
    <textarea onChange={handleInput} value={input} className="text-white border-b border-gray-400 w-[-webkit-fill-available] focus-visible:outline-none" placeholder="Enter your Comment"></textarea>
    <div className="text-right">
  <button onClick={handleSubmit} className="text-white px-4 mt-4 py-2 bg-[#272727] rounded-4xl">Comment</button>
    </div>
  </form>
 {comments.map((comment) => (
  <Comment
  key={comment._id}
  data={comment}
  videoId={props.videoId}
  onDelete={handleCommentDelete}
  onEdit={handleCommentEdit} // <-- pass it here
/>

      ))}
    </div>
    </>
}


export default CommentArea;