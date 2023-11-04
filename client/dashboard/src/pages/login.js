import React, {useState} from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

export default function Auth() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) =>{
        e.preventDefault();

        const response =await fetch ('/login',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password})
        });
        const data = await response.json();
        console.log(data);
    };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
          <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4"  >
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">ADMIN LOGIN</h2>
                  <div className="mb-3">
                    <Form onSubmit={handleLogin} >
            

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">  Email address </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                      </Form.Group>

                      <div className="d-grid">
                        <Button variant="primary" type="submit">  Login </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                      Already have an account??{" "}
                        <a href="/Signup" className="text-primary fw-bold">  Signup </a>

                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}