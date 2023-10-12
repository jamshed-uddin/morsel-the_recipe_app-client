import { useState } from "react";
import HomePage from "../HomePage/HomePage";
import LandingPage from "../LandingPage/LandingPage";

const HomeMain = () => {
  const [user, setUser] = useState(false);

  return <>{user ? <HomePage /> : <LandingPage />}</>;
};

export default HomeMain;
