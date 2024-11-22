import { createLazyFileRoute } from "@tanstack/react-router";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
export const Route = createLazyFileRoute("/login")({
    component: Login,
});
function Login() {
    return (
    <Row className="mt-5">
            <Col className="offset-md-3">
                <Card className="text-center">
                    <Card.Header>Login</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formPlaintextEmail"
                            >
                                <Form.Label column sm="2">
                                    Email
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        required
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formPlaintextPassword"
                            >
                                <Form.Label column sm="2">
                                    Password
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        required
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                        <div className="d-grid gap-2">
                            <Button variant="primary">Login</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3}></Col>
        </Row>
    );
}