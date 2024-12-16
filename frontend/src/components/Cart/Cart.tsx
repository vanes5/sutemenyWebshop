import { Button, Card } from "react-bootstrap";
import { useCart } from "./CartContext";
import "./style.css";

export default function Cart(){
    const { sutemenyek, eltavolitSutemeny, torliKosarat } = useCart();

  return (
    <div className="kosar-container">
      {sutemenyek.length === 0 ? (
        <p></p>
      ) : (
        <>
          {sutemenyek.map((sutemeny) => (
            <Card key={sutemeny.id} style={{ margin: "1rem" }}>
              <Card.Body>
                <Card.Title>{sutemeny.name}</Card.Title>
                <Card.Text>
                  <strong>Ár:</strong> {sutemeny.price} Ft
                </Card.Text>
                <Card.Text>
                  <strong>Leírás:</strong> {sutemeny.description}
                </Card.Text>
                <Card.Text>
                  <strong>Mennyiség:</strong> {sutemeny.quantity}
                </Card.Text>
                <Button variant="danger" onClick={() => eltavolitSutemeny(sutemeny.id)}>
                  Sütemény eltávolítása
                </Button>
              </Card.Body>
            </Card>
          ))}
          <Button variant="secondary" onClick={torliKosarat} style={{ marginTop: "1rem" }}>
            Kosár törlése
          </Button>
        </>
      )}
    </div>
  );
}