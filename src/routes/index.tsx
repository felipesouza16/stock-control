import { Routes as RoutesDOM, Route } from "react-router-dom";
import Home from "../pages/index";
import { Dashboard } from "../pages/Dashboard";
import { RegisterProduct } from "../pages/RegisterProduct";
import { AuthChecker } from "./AuthChecker";
import { Products } from "../pages/Products";

const Routes = () => {
  return (
    <RoutesDOM>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <AuthChecker>
            <Dashboard />
          </AuthChecker>
        }
      />
      <Route
        path="/register-product"
        element={
          <AuthChecker>
            <RegisterProduct />
          </AuthChecker>
        }
      />
      <Route
        path="/products"
        element={
          <AuthChecker>
            <Products />
          </AuthChecker>
        }
      />
    </RoutesDOM>
  );
};

export default Routes;
