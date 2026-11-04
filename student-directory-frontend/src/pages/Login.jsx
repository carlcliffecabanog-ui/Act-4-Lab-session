import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/students');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-welcome">
                <div className="auth-logo">
                    STUDENT DIRECTORY
                </div>

                <h2>Welcome Back!</h2>

                <p>
                    Your academic information, organized in one place.
                    Sign in to manage and access your student directory
                    easily and securely.
                </p>
            </div>

            <div className="auth-form-section">
                <h1>Sign In</h1>

                <p className="auth-subtitle">
                    Enter your account details to continue.
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Sign In'}
                    </button>
                </form>

                {error && (
                    <p style={{ color: 'red', marginTop: '15px' }}>
                        {error}
                    </p>
                )}

                <p className="auth-footer">
                    Don't have an account?{' '}
                    <Link to="/register">Create Account</Link>
                </p>
            </div>

        </div>
    );
}

export default Login;