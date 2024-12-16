import { useState } from 'react';
import { register } from '../../api';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await register(username, password);
      navigate('/login');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='centered-container'>
      <form onSubmit={handleSubmit} className='form-group' style={{ width: '18rem', margin: '1rem', textAlign: 'center' }}>
        <h2 className='form-control fw-bolder'>Regisztráció</h2>
        <input className='form-control' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input className='form-control' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/> <br />
        <button className='btn btn-success' type="submit">Regisztráció</button>
      </form>
    </div>
  );
}
