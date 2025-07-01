import { Field, Label} from '@headlessui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import apiRoutes from '../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../utils/authDataReducer';
import toast from 'react-hot-toast';

export default function Register() {
 const { isAuthenticated,token} = useSelector((state) => state.auth);
const dispatch = useDispatch();
const navigate = useNavigate();
const [input, setInput] =  useState({
name : "",
email : "",
password : "",
});

function handleChange(event){
const {name,value} = event.target;
setInput({...input,[name] : value})
}

function isTokenExpired(token) {
  if (!token) return true;
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}

useEffect(() => {
  if (isAuthenticated && !isTokenExpired(token)) {
    navigate("/");
  }
}, [isAuthenticated, token]);


async function onSubmit(e) {
e.preventDefault();
try {
const response = await fetch(apiRoutes.registerUser, {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
username: input.name,
email: input.email,
password: input.password,
}),
});

const data = await response.json();

if (!response.ok) {
toast.error(data.message)
throw new Error(data.message || "Something went wrong");
}


toast.success("Registration Successfull")

// ✅ Saving to localStorage
localStorage.setItem("user", JSON.stringify({
token: data.token,
user: data.user,
}));
dispatch(loginSuccess({
user: data.user,
token: data.token
}));

navigate("/");


} catch (err) {
toast.error("Registration Failed")
console.error("Registration failed:", err.message);
}
}
return (
<div className="isolate h-[100vh] place-content-center bg-[url('src/assets/bg-login-register.svg')] bg-cover bg-center px-6 py-24 sm:py-32 lg:px-8">

<div className="mx-auto max-w-2xl text-center">
<h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">Welcome to Youtube Clone</h2>
<p className="mt-2 text-lg/8 text-white">Register here to watch your favorite vedios on Youtube clone.</p>
</div>
<form onSubmit={(e)=>{onSubmit(e)}} action="#" method="POST" className="mx-auto mt-12 max-w-sm sm:mt-10">
<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
<div className="sm:col-span-2">
<label htmlFor="company" className="block text-sm/6 font-semibold text-white">
Name
</label>
<div className="mt-2.5">
<input
onChange={handleChange}
id="name"
name="name"
type="text"
autoComplete="name"
className="block w-full rounded-md bg-white px-3.5 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 "
/>
</div>
</div>
<div className="sm:col-span-2">
<label htmlFor="company" className="block text-sm/6 font-semibold text-white">
Email
</label>
<div className="mt-2.5">
<input
onChange={handleChange}
id="email"
name="email"
type="email"
autoComplete="email"
className="block w-full rounded-md bg-white px-3.5 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 "
/>
</div>
</div>
<div className="sm:col-span-2">
<label htmlFor="email" className="block text-sm/6 font-semibold text-white">
Password
</label>
<div className="mt-2.5">
<input
  onChange={handleChange}
  id="password"
  required
  name="password"
  type="password"
  autoComplete="new-password"
  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$"
  title="Password must be at least 8 characters long and include an uppercase letter, lowercase letter, a number, and a special character."
  className="block w-full rounded-md bg-white px-3.5 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2"
/>
</div>
</div>

<Field className="flex gap-x-4 sm:col-span-2">
<Label className="text-sm/6 text-white">
Already Have an account ?{' '}
<Link to="/login" className="font-semibold text-red-200">
Login Here
</Link>
.
</Label>
</Field>
</div>
<div className="mt-10">
<button
type="submit"
className="block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
>Register  Here
</button>
</div>
</form>
</div>
)
}
