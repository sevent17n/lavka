import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HOME_ROUTE,
  AUTH_ROUTE,
  SETTINGS_ROUTE,
  ADMIN_ROUTE,
  ORDER_ROUTE,
} from "./config";
import {
  HOME_PAGE,
  AUTH_PAGE,
  SETTINGS_PAGE,
  ADMIN_PAGE,
  ORDER_PAGE,
} from "./pages";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./Layout";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: HOME_ROUTE,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HOME_PAGE />,
      },
    ],
  },
  {
    path: AUTH_ROUTE,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <AUTH_PAGE />,
      },
    ],
  },
  {
    path: ADMIN_ROUTE,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ADMIN_PAGE />,
      },
    ],
  },
  {
    path: SETTINGS_ROUTE,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <SETTINGS_PAGE />,
      },
    ],
  },
  {
    path: ORDER_ROUTE,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ORDER_PAGE />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
