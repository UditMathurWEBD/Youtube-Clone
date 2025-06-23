import { Outlet } from "react-router-dom";
import Header from "./Components/Reusable Components/header";
import Sidebar from "./Components/Reusable Components/sidebar";
import { useState } from "react";

function App() {
  const [valueSidebar, setValueSidebar] = useState(true);
  console.log(valueSidebar)

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
