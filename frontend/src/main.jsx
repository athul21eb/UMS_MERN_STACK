import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import PrivateRoutes from "./components/USER/PrivateRoutes/PrivateRoutes.jsx";
import Homepage from "./Screens/USER/Home/HomeScreen.jsx";
import UserLoginScreen from "./Screens/USER/UserLoginScreen/LoginScreen.jsx";
import UserRegisterScreen from "./Screens/USER/UserRegister/UserRegisterScreen.jsx";
import Userdashboard from "./Screens/USER/Dashboard/Userdashboard.jsx";
import UserProfileScreen from "./Screens/USER/Profile/UserProfileScreen.jsx";
import RedirectingRoute from "./components/USER/RedirectingRoutes/RedirectionRoute.jsx";
import AdminLoginPage from "./Screens/admin/adminLogin/adminLoginpage.jsx";
import Admin from "./components/Admin/adminRouteWrapper/Admin.jsx";
import AdminDashboard from "./Screens/admin/adminDashboard/adminDashboard.jsx";
import AdminAddUserPage from "./Screens/admin/adminAddUserPage/AdminAddUserPage.jsx";
import AdminEditUserPage from "./Screens/admin/adminEditUserPage/AdminEditPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<RedirectingRoute />}>
        <Route index element={<Homepage />} />
        <Route path="login" element={<UserLoginScreen />} />
        <Route path="register" element={<UserRegisterScreen />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route path="dashboard" element={<Userdashboard />} />
        <Route path="profile" element={<UserProfileScreen />} />
      </Route>
      <Route path="admin" element={<Admin />}>
        <Route index element={<AdminLoginPage />} />
        <Route path="dashboard" element={<AdminDashboard/>} />
        <Route path="addUser" element={<AdminAddUserPage/>} />
        <Route path = "editUser/:id" element={<AdminEditUserPage/>} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
