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

const router = createBrowserRouter(
  
  createRoutesFromElements(

    <Route path="/" element={<App />}>

      <Route path="" element={<RedirectingRoute />}>{/* redirecting to dashboard when user Logged In */}


        <Route index={true} path="/" element={<Homepage />} />
        <Route path="/login" element={<UserLoginScreen />} />
        <Route path="/register" element={<UserRegisterScreen />} />
      </Route>

    
      <Route path="" element={<PrivateRoutes />}>  {/* private Routes */}

      
        <Route path="/dashboard" element={<Userdashboard />} />

        <Route path="/profile" element={<UserProfileScreen />} />
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
