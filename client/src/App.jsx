import React, { Suspense, startTransition } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MessagesComponent from "./components/MessagesComponent";

// Lazy load components
const SignUp = React.lazy(() => import("./pages/SignUp"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const Home = React.lazy(() => import("./pages/Home"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Profile = React.lazy(() => import("./pages/Profile"));
const About = React.lazy(() => import("./pages/About"));
const ReportEmergency = React.lazy(() => import("./pages/ReportEmergency"));
const Notification = React.lazy(() => import("./pages/Notification"));
const Volunteer = React.lazy(() => import("./pages/Volunteer"));
const MyReports = React.lazy(() => import("./pages/MyReports"));
const VolunteerNetwork = React.lazy(() => import("./pages/VolunteerNetwork"));
const Error = React.lazy(() => import("./pages/Error"));
const EmergencyDetails = React.lazy(() => import("./pages/EmergencyDetails"));
const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoutes"));
const AdminRoute = React.lazy(() => import("./components/AdminRoutes"));

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Home />
        </Suspense>
      ),
      errorElement: (
        <Suspense fallback={<div>Loading...</div>}>
          <Error />
        </Suspense>
      ),
    },
    {
      path: "/register",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <SignUp />
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <SignIn />
        </Suspense>
      ),
    },
    {
      path: "/about",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <About />
        </Suspense>
      ),
    },
    {
      path: "/report-emergency",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ProtectedRoute>
            <ReportEmergency />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/notifications",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ProtectedRoute>
            <Notification />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/volunteer/apply",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ProtectedRoute>
            <Volunteer />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/volunteer-network",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ProtectedRoute>
            <VolunteerNetwork />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/emergency/details/:id",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ProtectedRoute>
            <EmergencyDetails />
          </ProtectedRoute>
        </Suspense>
      ),
    },

    {
      path: "/dashboard",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </Suspense>
      ),
      children: [
        {
          path: "profile",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>
          ),
        },
        {
          path: "messages",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <MessagesComponent />
            </Suspense>
          ),
        },

        {
          path: "reports",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <MyReports />
            </Suspense>
          ),
        },

        {
          path: "volunteer-dashboard",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AdminRoute></AdminRoute>
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={routes} />
      </Suspense>
      <ToastContainer />
    </div>
  );
}
