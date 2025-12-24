import React, { useEffect, useState } from "react";

function UserCreate() {

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    department: ""
  });

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;




  const [users, setUsers] = useState([]);


  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/all`);
      
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch(`${BASE_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        alert("User Created Successfully ");

        setUser({
          username: "",
          email: "",
          password: "",
          phone: "",
          department: ""
        });

        fetchUsers();
      } else {
        alert("Failed to create user ");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error ");
    }
  };

  return (
    <div style={{ width: "90%", margin: "30px auto" }}>

      <div style={{ width: "350px", marginBottom: "40px" }}>
        <h2>Create User</h2>

        <form onSubmit={handleSubmit}>
          <input name="username" placeholder="Username" value={user.username} onChange={handleChange} required /><br /><br />
          <input name="email" type="email" placeholder="Email" value={user.email} onChange={handleChange} required /><br /><br />
          <input name="password" type="password" placeholder="Password" value={user.password} onChange={handleChange} required /><br /><br />
          <input name="phone" placeholder="Phone" value={user.phone} onChange={handleChange} /><br /><br />
          <input name="department" placeholder="Department" value={user.department} onChange={handleChange} /><br /><br />
          <button type="submit">Create User</button>
        </form>
      </div>

      {/* 🔹 ALL USERS TABLE */}
      <h2>All Users</h2>

      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" align="center">No users found</td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.department}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserCreate;
