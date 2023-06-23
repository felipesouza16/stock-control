import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export const useVerifyLogin = () => {
  const cookie = new Cookies();
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const hasAccessToken = cookie.get("accessToken");
    if (hasAccessToken) {
      setIsLogged(true);
      return;
    }
    setIsLogged(false);
  }, []);
  return { isLogged };
};
