import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthContext";


interface ProviderProp {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProp) => {
  return (
    <BrowserRouter>
      <AuthProvider>
            {children}
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Providers;
