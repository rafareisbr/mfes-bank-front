import { Outlet } from "react-router-dom";
import Navbar from "../../components/nav/Navbar";

function Index() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Index;
