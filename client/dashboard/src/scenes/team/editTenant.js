import React, {useState } from 'react';


function EditTenant({ tenant, onEdit }) {
    // useState variables.
  const [your_names, setYour_names] = useState(tenant.your_names);
  const [phone, setPhone] = useState(tenant.phone);
  const [address, setAddress] = useState(tenant.address);
  const [city, setCity] = useState(tenant.city)
  const [house_no, setHouse_no] = useState(tenant.house_no);
  const [rent, setRent] = useState(tenant.rent)
  const [zip_code, setZip_code] = useState(tenant.zip_code)

  function handleSubmit(e) {
    e.preventDefault();
    const updatedTenant= {
    
      ...tenant,
      your_names,
      phone,
      address,
      city,
      house_no,
      rent,
      zip_code,

    };
    onEdit(updatedTenant);
  }

  return (
    <form onSubmit={handleSubmit}>
        <input type='text' value={your_names} onChange={(e)=>setYour_names(e.target.value)}/>
        <input type='text' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
        <input type='text' value={address} onChange={(e)=>setAddress(e.target.value)}/>
        <input type='text' value={city} onChange={(e)=>setCity(e.target.value)}/>
        <input type='text' value={house_no} onChange={(e)=>setHouse_no(e.target.value)}/>
        <input type='text' value={rent} onChange={(e)=>setRent(e.target.value)}/>
        <input type='text' value={zip_code} onChange={(e)=>setZip_code(e.target.value)}/>
        <button type='submit' id="submit">submit</button>
        
    </form>
    )
  }

  export default EditTenant