import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./Layout";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Todo from "./pages/Todo.jsx";
import ProtectedRoutes from './components/ProtectedRoutes.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "", 
        element: <Login />, 
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "todo",
        element: < ProtectedRoutes component={<Todo />} />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>Error Occurred</h1>, 
  },
]);


createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
