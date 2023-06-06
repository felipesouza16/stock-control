import { useState } from "react";
import { Login } from "../components/Login";
import { SignUp } from "../components/SignUp";
import { HomePage } from "../utils/enums";

const Home = () => {
  const [homePage, setHomePage] = useState(HomePage.LOGIN);

  if (homePage === HomePage.SIGN_UP)
    return <SignUp setHomePage={setHomePage} />;

  return <Login setHomePage={setHomePage} />;
};

export default Home;
