import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LoggedInContext } from '../context/LoggedInContext';
import { isTokenValid } from '../utils/auth';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { loggedInUser } = useContext(LoggedInContext);
    const location = useLocation();

    if (!isTokenValid() || !loggedInUser) {
        // Redirect to login page but save the attempted url
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute; 