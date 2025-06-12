import { useAuth } from "@/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";
export function PrivateOutlet() {
  const { token } = useAuth();
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} />
  );
}
