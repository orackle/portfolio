import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Works from "./pages/Works";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "works", element: <Works /> },
      { path: "works/:slug", element: <ProjectDetail /> },
      { path: "about", element: <About /> },
      { path: "experience", element: <Experience /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);
