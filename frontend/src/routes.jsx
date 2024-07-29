// routes.js
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
  import React from "react";
  import App from "./App.jsx";
  import PrivateRoutes from "./components/Admin/PrivateRoutes/PrivateRoutes.jsx";
  import Homepage from "./Screens/USER/Home/HomeScreen.jsx";
  import UserLoginScreen from "./Screens/USER/UserLoginScreen/LoginScreen.jsx";
  import UserRegisterScreen from "./Screens/USER/UserRegister/UserRegisterScreen.jsx";
  import Userdashboard from "./Screens/USER/Dashboard/Userdashboard.jsx";
  import UserProfileScreen from "./Screens/USER/Profile/UserProfileScreen.jsx";
  import AdminRedirectingRoute from "./components/Admin/RedirectingRoutes/RedirectionRoute.jsx";
  import AdminLoginPage from "./Screens/admin/adminLogin/adminLoginpage.jsx";
  import Admin from "./components/Admin/adminRouteWrapper/Admin.jsx";
  import AdminDashboard from "./Screens/admin/adminDashboard/adminDashboard.jsx";
  import AdminAddUserPage from "./Screens/admin/adminAddUserPage/AdminAddUserPage.jsx";
  import AdminEditUserPage from "./Screens/admin/adminEditUserPage/AdminEditPage.jsx";
  import Persist from "./components/Persist/Persist.jsx";
  import UserPersistChecking from "./components/Persist/UsersPersist.jsx";
  import UserRedirectingRoute from "./components/Admin/RedirectingRoutes/UserRedirectionRoute.jsx";
  import UserPrivateRoutes from "./components/Admin/PrivateRoutes/UserPrivateRoutes.jsx";
  import NotFound from "./components/NotFound/NotFound.jsx";
  
  const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={<App />}>
      
          <Route element={<AdminRedirectingRoute />}>    {/* Admin Redirection Routes */}
           
            <Route element={<UserRedirectingRoute />}> {/* User Redirection Routes */}
              <Route index element={<Homepage />} />
              <Route path="login" element={<UserLoginScreen />} />
              <Route path="register" element={<UserRegisterScreen />} />
            </Route>
      
          
            <Route element={<UserPrivateRoutes />}>  {/* User Private Routes */}
              <Route element={<UserPersistChecking />}>
                <Route path="dashboard" element={<Userdashboard />} />
                <Route path="profile" element={<UserProfileScreen />} />
              </Route>
            </Route>
          </Route>
      
      
          <Route element={<UserRedirectingRoute />}>
            <Route path="admin" element={<Admin />}>    {/* Admin Routes */}
             
              <Route element={<AdminRedirectingRoute />}> {/* Admin Redirection Routes */}
                <Route index element={<AdminLoginPage />} />
              </Route>
      
              
              <Route element={<PrivateRoutes />}>{/* Admin Private Routes */}
                <Route element={<Persist />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="addUser" element={<AdminAddUserPage />} />
                  <Route path="editUser/:id" element={<AdminEditUserPage />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      
        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </>
      
    )
  );
  
  export default router;
  