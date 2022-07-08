import useAuth from "Hooks/useAuth";
import PropTypes from "prop-types";
import { FC, ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = (props) => {
  const navigate = useNavigate();
  const { children } = props;
  const auth = useAuth() as any;
  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      if (location.pathname !== requestedLocation) {
        setRequestedLocation(location.pathname);
      }

      navigate("/authentication/login");
      return;
    }
  }, []);

  // This is done so that in case the route changes by any chance through other
  // means between the moment of request and the render we navigate to the initially
  // requested route.
  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
