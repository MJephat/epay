import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Table } from 'react-bootstrap'; 
import Header from "../../components/Header";



const Team=()=> {
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
          .catch(error => console.error('Error fetching tenants:', error));

    }, []);

    // const handleDeleteTenant = async (tenant_id) => {
    //     try {
    //       const response = await fetch(`/tenants/tenant_id`, {
    //         method: 'DELETE',
    //       });
    //       if (!response.ok) {
    //         throw new Error('Failed to delete the tenant.');
    //       }
    //       const updatedTenants = tenants.filter(tenant => tenant.id !== tenant_id);
    //       setTenants(updatedTenants);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

   
    const handleEditField = async (tenant_id, field, value) => {
        try {
          const response = await fetch("/tenants/tenant_id", {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ [field]: value }),
          });
          if (!response.ok) {
            throw new Error(`Failed to update ${field}.`);
          }
          const updatedTenants = tenants.map(tenant => {
            if (tenant.id === tenant_id) {
              return { ...tenant, [field]: value };
            }
            return tenant;
          });
          setTenants(updatedTenants);
        } catch (error) {
          console.error(error);
        }
      };

    

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
                        <td><span onClick={() => handleEditField(tenant.id, 'your_names', prompt('Enter new names:', tenant.your_names))}>{tenant.your_names}</span></td>
                        <td><span onClick={() => handleEditField(tenant.id, 'phone', prompt('Enter new Phone number:', tenant.phone))}>{tenant.phone}</span></td>
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