import { Button, Card } from 'react-bootstrap';
import { Sutemeny } from '../Sutemeny';
import { useCart } from './Cart/CartContext';
import { checkAuthStatus } from '../api';
import { useNavigate } from 'react-router';


interface sutiCardProps{
    suti: Sutemeny;
}


export default function SutiCard({suti}: sutiCardProps){
    const { hozzaadSutemeny } = useCart();
    const navigate = useNavigate();

    async function checkAuth(suti:Sutemeny) {
        try {
          const response = await checkAuthStatus();
          if (response && response.user) {
            hozzaadSutemeny({ ...suti, quantity: 1 });
          }
        } catch (error) {
            alert("Nincsen bejelentkezve")
          navigate('/login')
        }
      return;
    }   
    return <>
        <Card style={{ width: '18rem', margin: '1rem' }}>
            <Card.Body>
                <Card.Title>{suti.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{suti.price} Ft</Card.Subtitle>
                <Card.Text>
                    {suti.description}<br/>
                        <Button
                            className="btn btn-primary"
                            variant="primary"
                            onClick={() => {checkAuth(suti)}}
                        >
                            Add to Cart
                        </Button>
                </Card.Text>
            </Card.Body>
        </Card>
    </>
}