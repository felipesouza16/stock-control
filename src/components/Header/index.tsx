import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../../lib/mutation";
import { GET_ME } from "../../lib/query";
import { Themes } from "../../assets/Themes";

export const Header = () => {
  const [logout] = useMutation(LOGOUT);
  const navigate = useNavigate();
  const { data } = useQuery(GET_ME);
  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52"
          >
            <li onClick={() => navigate("/dashboard")}>
              <a>Dashboard</a>
            </li>
            <li onClick={() => navigate("/register-product")}>
              <a>Register product</a>
            </li>
            <li onClick={() => navigate("/products")}>
              <a>Products</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">Stock Control</a>
      </div>
      <div className="navbar-end text-end lg:gap-x-8">
        <div className="dropdown dropdown-hover dropdown-bottom dropdown-end justify-end">
          <label tabIndex={0} className="normal-case text-base">
            <Themes />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li
              onClick={() => {
                const html = document.getElementById("html-tag") as HTMLElement;
                html.dataset.theme = "dark";
                localStorage.setItem("theme", "dark");
              }}
            >
              <a>Dark (Default)</a>
            </li>
            <li
              onClick={() => {
                const html = document.getElementById("html-tag") as HTMLElement;
                html.dataset.theme = "light";
                localStorage.setItem("theme", "light");
              }}
            >
              <a>Light</a>
            </li>
            <li
              onClick={() => {
                const html = document.getElementById("html-tag") as HTMLElement;
                html.dataset.theme = "halloween";
                localStorage.setItem("theme", "halloween");
              }}
            >
              <a>Halloween</a>
            </li>
            <li
              onClick={() => {
                const html = document.getElementById("html-tag") as HTMLElement;
                html.dataset.theme = "cupcake";
                localStorage.setItem("theme", "cupcake");
              }}
            >
              <a>Cupcake</a>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-hover dropdown-bottom dropdown-end justify-end">
          <label tabIndex={0} className="normal-case text-base">
            Welcome, {data?.me?.first_name}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
