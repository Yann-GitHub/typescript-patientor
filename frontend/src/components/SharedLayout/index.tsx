import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

function SharedLayout() {
  return (
    <div className="sharedLayout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default SharedLayout;
