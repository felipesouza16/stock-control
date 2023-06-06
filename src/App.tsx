import { gql } from "@apollo/client/core";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  const theme = localStorage.getItem("theme");

  if (theme !== null) {
    const html = document.getElementById("html-tag") as HTMLElement;
    html.dataset.theme = theme;
  }

  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
