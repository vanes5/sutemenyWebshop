import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import {  useNavigate } from "react-router";
import { logout, profile, updateProfile } from "../api";
import "./LoginRegister/style.css"

export default function Profile(){
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });


  const handleSave = async () => {
    try {
      const updatedUser = await updateProfile(newUsername, newPassword);
      console.log(updatedUser);
      setUserData(updatedUser);
      fetchUserProfile();
      setEdit(false);

    } catch (error) {
      setError('Failed to update profile');
      console.error('Failed to update profile:', error);
    }
  };
  

  const handleLogout = async () => {
    try {
        await logout();
        localStorage.removeItem('auth_token');
        navigate('/login');
      } catch (error) {
        console.error("Logout error:", error);
        alert("Logout failed. Please try again.");
      }
  };

    const [edit, setEdit] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchUserProfile = async () => {
      try {
        const response = await profile();
        if (response && response.user) {
          setUserData({ username: response.user.username, password: response.user.password });
          setNewUsername(response.user.username);
          setNewPassword(response.user.password);
        }
      } catch (error) {
        setError('Failed to fetch user data');
      }
    };
    useEffect(() => {
      fetchUserProfile();
    }, []);

    return <>
    <div className="centered-container">
        <Card style={{ width: '18rem', margin: '1rem' }}>
            <Card.Header><h2>Profil</h2></Card.Header>
            <Card.Body>
            {edit ? (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Új felhasználónév</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter new username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Új jelszó</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
            </>
          ) : (
            <>
              <h3>Felhasználónév</h3>
              <p>{userData.username}</p>
            </>
          )}
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">
          {edit ? (
            <>
              <Button variant="success" onClick={handleSave}>
                Mentés
              </Button>
              <Button variant="secondary" onClick={() => setEdit(false)}>
                Mégse
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={() => setEdit(true)}>
              Adatok módosítása
            </Button>
          )}
          <button className="btn btn-danger" onClick={()=> handleLogout()}>Kijelentkezés</button>
        </Card.Footer>
        </Card>
        </div>
    </>
}