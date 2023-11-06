import React ,{useState} from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";


export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      
      case "email":
        setEmail(value);
        break;
      
      case "password":
        setPassword(value);
        break;

      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Check if the passwords match
    if (password !== confirmPassword) {
      alert("The passwords do not match.");
      return;
    }
  
    // Check if the password is at least 6 characters long
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
  
    // Check if the email contains the '@' symbol
    if (!email.includes("@")) {
      alert("Invalid email format. Please include the '@' symbol.");
      return;
    }

    try {
      // Create a data object with the user information
      const userData = {
        username,
        email,
        password,
      };

            // Send the user data to the backend server
            const response = await fetch("/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            });
      
            // Handle the response from the server
            if (response.ok) {
              const responseData = await response.json();
              alert("User data saved:", responseData);
      
              // Clear the form after successful submission
              setUsername("");
              setEmail("");
              setPassword("");
              setConfirmPassword("");
      
              // You can also redirect the user to a new page or display a success message.
              // For example, if you have a component that shows a success message after signup:
              // setSignupSuccess(true);
            } else {
              // Handle server-side errors or other errors
              console.error("Failed to save user data:", response.statusText);
            }
          } catch (error) {
            // Handle fetch-related errors (e.g., network errors)
            console.error("Error submitting form:", error);
          }
        };

        return (
          <div>
            <Container>
              <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col md={8} lg={6} xs={12}>
                <div className="border border-2 border-primary"></div>
                  <Card className="shadow px-4">
                    <Card.Body>
                      <div className="mb-3 mt-md-4">
                        <h2 className="fw-bold mb-2 text-center text-uppercase ">Admin Signup</h2>
                        <div className="mb-3">
                          <Form onSubmit={handleSubmit} >
                            <Form.Group className="mb-3" controlId="Name">
                              <Form.Label className="text-center">  username  </Form.Label>
                              <Form.Control type="text" placeholder="username" name="username" value={username} onChange={handleChange} />  </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label className="text-center">  Email address  </Form.Label>
                              <Form.Control type="email" name='email' placeholder="Enter email" value={email} onChange={handleChange}/>  </Form.Group>

                            <Form.Group  className="mb-3"  controlId="formBasicPassword">
                              <Form.Label>Password</Form.Label>
                              <Form.Control type="password" placeholder="Password" name='password' value={password} onChange={handleChange}/>  </Form.Group>

                            <Form.Group  className="mb-3"  controlId="formBasicPassword">
                              <Form.Label>Confirm Password</Form.Label>
                              <Form.Control type="password" placeholder="Password"name='confirmPassword'  value={confirmPassword} onChange={handleChange}/>  </Form.Group>

                          
                            <div className="d-grid">
                              <Button variant="primary" type="submit">  Create Account  </Button>
                            </div>
                            <div className="d-grid">
                            </div>
                          </Form>

                          <div className="mt-3">
                            <p className="mb-0  text-center">
                            Already have an account??{" "}
                              <a href="/Auth" className="text-primary fw-bold">  Login  </a>
                              
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