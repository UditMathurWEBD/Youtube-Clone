import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import apiRoutes from '../../utils/apiRoutes';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { logout } from "../../utils/authDataReducer";


export default function EditCommentModal({ open, onClose, data, videoId, onEdit }) {
const [input,setInput] = useState(data.comment)
const {user,token} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();
    const navigate = useNavigate();
function handleInput(e){
setInput(e.target.value);
}

async function handleSubmit() {
  try {
    const response = await fetch(apiRoutes.editComment, {
      method: "POST",
      headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, },
      body: JSON.stringify({
        videoId,
        commentId: data._id,
        comment: input,
        userId: user._id,
      }),
    });

    const resJson = await response.json();
     if (response.status === 401) {
      toast.error(data.message || "Session expired. Please login again.");
      navigate("/login");
      // Remove token from storage
      localStorage.removeItem("user");
      // Dispatch logout
      dispatch(logout());
      
      return;
    }
    if (!response.ok) {
      toast.error(resJson.message || "Edit failed.");
      return;
    }

    toast.success(resJson.message || "Edited");

    // Notify parent to update local state
    if (onEdit) {
      onEdit({ _id: data._id, comment: input });
    }

    // Close modal
    onClose();
  } catch (err) {
    toast.error("An error occurred.");
    console.error(err);
  }
}


return (
<Dialog open={open} onClose={onClose} className="relative z-50">
<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
<div className="fixed inset-0 flex items-center justify-center p-4">
<DialogPanel className="bg-white rounded-lg w-full max-w-2xl p-6">
<DialogTitle className="text-xl font-bold text-gray-900 mb-4">
How You Will Appear
</DialogTitle>

<div className="flex flex-col gap-4">

{/* Name inputs */}
<input onChange={handleInput}
name='channelName'
value={input}
className="px-4 py-2  rounded-lg border border-gray-300"
type="text"
placeholder="Comment Here"
/>


{/* Submit button */}

<button onClick={handleSubmit} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
Edit Comment
</button>


</div>
</DialogPanel>
</div>
</Dialog>
);
}
