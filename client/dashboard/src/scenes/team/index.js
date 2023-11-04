import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Table } from 'react-bootstrap'; 
import Header from "../../components/Header";



function Team() {
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
            <Header title="Tenants"/>

            <div className='p-5'>  
            <Table striped bordered hover size='sm'> 
                <thead>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>House_No</th>
                    <th>Rent</th>
                    <th>Members</th>
                    <th>Zip_code</th>
                </thead>
                <tbody>
                {tenants.map(tenant =>(
                    <tr key={tenant.id}>
                        <td>{tenant.your_names}</td>
                        <td>{tenant.phone}</td>
                        <td>{tenant.address}</td>
                        <td>{tenant.city}</td>
                        <td>{tenant.house_no}</td>
                        <td>{tenant.rent}</td>
                        <td>{tenant.members}</td>
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

export default Team