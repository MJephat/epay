import React, {useState} from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

export default function Tenant() {
    const [your_names, setYour_names] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [house_no, setHouse_no] = useState("");
    const [rent, setRent] = useState("");
    const [members, setMembers] = useState("");
    const [zip_code, setZip_code] = useState("");

    const handleChange = (event) => {
        const {name, value} = event.target;
        switch (name){
            case "your_names":
                setYour_names(value);
                break;

            case "phone":
                setPhone(value);
                break;
            case "address":
                setAddress(value);
                break;
            case "city":
                setCity(value);
                break;
            case "house_no":
                setHouse_no(value);
                break;
            case "rent":
                setRent(value);
                break;
            case "members":
                setMembers(value);
                break;
            case "zip_code":
                setZip_code(value);
                break;
        }
    }
  
    
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      if(house_no.length > 10){
        alert("Please enter house number")
        return;
      }
      try{
        const tenantData = {
            your_names,
            phone,
            address,
            city,
            house_no,
            rent,
            members,
            zip_code,
        };
      
      const response = await fetch('/upload', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tenantData),
      });
    
      if (response.ok){
        const responseData = await response.json();
        alert("Tenant added successfully:", responseData);

        setYour_names("");
        setPhone("");
        setAddress("");
        setCity("");
        setHouse_no("");
        setRent("");
        setMembers("");
        setZip_code("");
      }else{
            console.error("Failed to save tenant information:", response.statusText)
      }
    }catch(error){
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
                      <h5 className="fw-bold mb-2 text-center text-uppercase ">USER ENTRY FORM</h5>
                      <div className="mb-3">
                        <Form onSubmit={handleSubmit} >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-center">  Name  </Form.Label>
                            <Form.Control type="text" name='your_names' placeholder="your_names" value={your_names} onChange={handleChange} />  </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-center">  phone  </Form.Label>
                            <Form.Control type="phone" name='phone' placeholder="phone" value={phone} onChange={handleChange} />  </Form.Group>

                            
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-center">  Address  </Form.Label>
                            <Form.Control type="address" name='address' placeholder="address" value={address} onChange={handleChange} />  </Form.Group>

                          <Form.Group  className="mb-3"  controlId="formBasicPassword">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="city" name='city'  value={city} onChange={handleChange} />  </Form.Group>

                          <Form.Group  className="mb-3"  controlId="formBasicPassword">
                            <Form.Label>House number</Form.Label>
                            <Form.Control type="text" placeholder="house number" name='house_no' value={house_no} onChange={handleChange} />  </Form.Group>

                            <Form.Group  className="mb-3"  controlId="formBasicPassword">
                            <Form.Label>Rent</Form.Label>
                            <Form.Control type="text" placeholder="rent" name='rent' value={rent} onChange={handleChange} />  </Form.Group>

                            <Form.Group  className="mb-3"  controlId="formBasicPassword">
                            <Form.Label>Members</Form.Label>
                            <Form.Control type="text" placeholder="members" name='members' value={members} onChange={handleChange} />  </Form.Group>

                            <Form.Group  className="mb-3"  controlId="formBasicPassword">
                            <Form.Label>Zip_code</Form.Label>
                            <Form.Control type="text" placeholder="zip_code" name='zip_code' value={zip_code} onChange={handleChange} />  </Form.Group>


                          <div className="d-grid">
                            <Button variant="primary" type="submit">  Add New Tenant </Button>
                          </div>
                          <div className="d-grid">
                          </div>
                        </Form>

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
