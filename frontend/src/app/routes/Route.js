import { useContext } from "react";
import { Route as RouterRoute, Routes, Navigate } from "react-router-dom";

import { AuthContext } from "../context/Auth/AuthContext";
import BackdropLoading from "../components/BackdropLoading";

// const Route = ({ component: Component, isPrivate = false, ...rest }) => {
//   const { isAuth, loading, user } = useContext(AuthContext);

//   if (!isAuth && isPrivate) {
//     return (
//       <>
//         {loading && <BackdropLoading />}
//         <Navigate to={{ pathname: "/login" }} />
//       </>
//     );
//   }

//   return (
//     <>
//       {loading && <BackdropLoading />}
//       <Routes>
//         <RouterRoute {...rest} Component={Component} />
//       </Routes>
//     </>
//   );
// };
// export default Route;
