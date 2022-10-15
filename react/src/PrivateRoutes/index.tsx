import { Outlet, Navigate } from "react-router-dom";
import Cookie from "js-cookie";

export function PrivateRoutes() {
  const signed = Cookie.get("token");

  return signed ? <Outlet /> : <Navigate to="/login" />;
}
