import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import apiRoutes from '../utils/apiRoutes';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../utils/authDataReducer';

export default function CreateChannelModal({ open, onClose }) {
const dispatch = useDispatch();
const navigate = useNavigate();
const {user,token} = useSelector((state)=> state.auth)
const [input,setInput] = useState({
channelName : "",
channelUsername : ""
})

function handleInput(e){
const {name,value} = e.target;
setInput({...input,[name]: value});
}


async function handleSubmit() {
  try {
    // 1️⃣ Create Channel
    const response = await fetch(apiRoutes.createChannel, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: user._id,
        channelName: input.channelName,
        channelUsername: input.channelUsername,
      }),
    });

    const data = await response.json();

    if (response.status === 401) {
      toast.error(data.message || "Session expired. Please login again.");
      navigate("/login");
      return;
    }

    if (!response.ok) {
      toast.error(data.message || "Something went wrong");
      return;
    }

    // 2️⃣ Fetching updated user data
    const response2 = await fetch(apiRoutes.getUserData, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user._id }),
    });

    const result = await response2.json();

    if (!response2.ok) {
      toast.error(result.message || "Failed to refresh user data.");
      return;
    }

    // 3️⃣ Updating redux and storage
    dispatch(loginSuccess({ token, user: result.data }));
    localStorage.setItem("user", JSON.stringify({ token, user: result.data }));

    // ✅ Only after all succeeded
    toast.success(data.message || "Channel created successfully");
    onClose();
    navigate(`/viewChannel/${data.channel.channelUsername}`);
  } catch (error) {
    toast.error("An unexpected error occurred.");
    console.error("Error creating channel:", error);
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
className="px-4 py-2  rounded-lg border border-gray-300"
type="text"
placeholder="Enter your channel name"
/>
<input onChange={handleInput}
className="px-4 py-2 rounded-lg border border-gray-300"
type="text"
name='channelUsername'
placeholder="Enter your Channel id"
/>

{/* Submit button */}

<button onClick={handleSubmit} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
Create Channel
</button>


</div>
</DialogPanel>
</div>
</Dialog>
);
}
