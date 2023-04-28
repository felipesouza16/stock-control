import { useQuery } from "@apollo/client";
import { GET_ME } from "../lib/query";
import { useNavigate } from "react-router-dom";

interface AuthCheckProps {
  children: JSX.Element;
}

export const AuthChecker = ({ children }: AuthCheckProps) => {
  const { data } = useQuery(GET_ME);
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
    return <></>;
  };

  return data === undefined ? handleRedirect() : children;
};
