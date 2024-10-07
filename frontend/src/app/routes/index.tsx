/* eslint-disable */
import { ToastContainer } from "react-toastify";
import Providers from "../context";
import ProviderRoutes from "./useRoutes";

const AppRoutes = () => {
  return (
    <Providers>
      <ProviderRoutes />
      <ToastContainer autoClose={5000} />
    </Providers>
  );
};

export default AppRoutes;
