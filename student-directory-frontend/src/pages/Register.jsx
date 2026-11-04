import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                'http://localhost:3000/api/auth/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            setMessage('Account created successfully!');

            setTimeout(() => {
                navigate('/login');
            }, 1500);

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

                <h2>Join Us Today!</h2>

                <p>
                    Create your account and get access to your
                    student directory. Keep your academic
                    information organized in one place.
                </p>
            </div>

            <div className="auth-form-section">
                <h1>Create Account</h1>

                <p className="auth-subtitle">
                    Fill in your details to get started.
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
                        placeholder="Password (minimum 8 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={8}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                {error && (
                    <p style={{ color: 'red', marginTop: '15px' }}>
                        {error}
                    </p>
                )}

                {message && (
                    <p style={{ color: 'green', marginTop: '15px' }}>
                        {message}
                    </p>
                )}

                <p className="auth-footer">
                    Already have an account?{' '}
                    <Link to="/login">Sign In</Link>
                </p>
            </div>

        </div>
    );
}

export default Register;