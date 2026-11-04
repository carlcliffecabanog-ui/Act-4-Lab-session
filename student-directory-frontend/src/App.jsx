
import { Navigate, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

import Login from './pages/Login';
import Register from './pages/Register';
import Students from './pages/Students';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();

    return isAuthenticated
        ? children
        : <Navigate to="/login" replace />;
}

function App() {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Navigate
                        to={isAuthenticated ? '/students' : '/login'}
                        replace
                    />
                }
            />

            <Route
                path="/login"
                element={
                    isAuthenticated
                        ? <Navigate to="/students" replace />
                        : <Login />
                }
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/students"
                element={
                    <ProtectedRoute>
                        <Students />
                    </ProtectedRoute>
                }
            />

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    );
}

export default App;
