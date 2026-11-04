
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Students() {
    const { token, logout } = useAuth();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch(
                    'http://localhost:3000/api/students',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.status === 401) {
                    logout();
                    navigate('/login', { replace: true });
                    return;
                }

                if (!response.ok) {
                    throw new Error('Failed to load students.');
                }

                const data = await response.json();
                setStudents(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchStudents();
        }
    }, [token, logout, navigate]);

    if (loading) return <p>Loading students...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1>Student Directory</h1>

            <button onClick={() => {
                logout();
                navigate('/login');
            }}>
                Logout
            </button>

            {students.length === 0 ? (
                <p>No students found.</p>
            ) : (
                <ul>
                    {students.map((student) => (
                        <li key={student._id}>
                            {student.name} - {student.email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Students;
