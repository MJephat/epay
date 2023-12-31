import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Table } from 'react-bootstrap';
import Header from "../../components/Header";



function Contacts() {
    const [tenants, setTenants] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch("/tenants")
          .then(response => response.json())
          .then(json => setTenants(json))
          .finally(() => {
            setLoading(false)
          })
    }, []);


  return (
    <div className="APP">
        {loading ? (
            <div>loading...</div>
        ):(
            <>
            <Header title="Contact Information" />

            <div className='p-5'>  
            <Table striped bordered hover size='sm'> 
                <thead>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>House_No</th>
                    <th>Zip_code</th>
                </thead>
                <tbody>
                {tenants.map(tenant =>(
                    <tr key={tenant.id}>
                        <td>{tenant.your_names}</td>
                        <td>{tenant.phone}</td>
                        <td>{tenant.house_no}</td>
                        <td>{tenant.zip_code}</td>

                    </tr>
                ))}
                </tbody>
            </Table>
            </div>
            </>
        )}
    </div>
  )
}

export default Contacts