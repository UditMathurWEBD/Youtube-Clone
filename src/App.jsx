import { Outlet } from "react-router-dom";
import Header from "./Components/Reusable Components/header";
import Sidebar from "./Components/Reusable Components/sidebar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./utils/authDataReducer";
import apiRoutes from "./utils/apiRoutes";

function App() {
  const [valueSidebar, setValueSidebar] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const { token, user } = JSON.parse(savedUser);

  
      dispatch(loginSuccess({ token, user }));


      async function fetchUpdatedUserData() {
        try {
          const response = await fetch(apiRoutes.getUserData, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user._id }),
          });

          if (!response.ok) {
            console.log("Failed to fetch updated user data");
            return;
          }

          const result = await response.json();
          const updatedUser = result.data;


          dispatch(loginSuccess({ token, user: updatedUser }));

          localStorage.setItem("user", JSON.stringify({ token, user: updatedUser }));
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }

      fetchUpdatedUserData();
    }
  }, [dispatch]);

  return (
    <>
      <Header value={setValueSidebar} />
      <div className="flex w-full max-w-full">
        <Sidebar isOpen={valueSidebar} />
        <Outlet />
      </div>
    </>
  );
}

export default App;
