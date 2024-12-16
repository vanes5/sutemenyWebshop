import { Button, Card } from "react-bootstrap";
import './style.css'
import { useNavigate } from "react-router";

export default function LoginRegister(){
    const navigate = useNavigate();

    return <>
    <div className="centered-container">
        <Card style={{ width: '18rem', margin: '1rem', textAlign: 'center' }}>
            <Card.Header>
                <h2>Bejelentkezés</h2>
            </Card.Header>
            <Card.Body>
                <Button className="btn btn-secondary" onClick={() => {{navigate('/login')}}}>Van már fiókom</Button> <br /> <br />
                <Button className="btn btn-secondary" onClick={() => {{navigate('/register')}}}>Regisztráció</Button>
            </Card.Body>
        </Card>
    </div>
    </>
}