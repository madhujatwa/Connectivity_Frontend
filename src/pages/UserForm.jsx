import React, { useEffect, useState } from "react";

const API = "http://localhost:8080/api/users";

function UserForm() {

  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    department: ""
  });

  // READ - Fetch all users
  const fetchUsers = async () => {
    const res = await fetch(`${API}/all`);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // CREATE & UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.id) {
      // UPDATE
      await fetch(`${API}/update/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      // CREATE
      await fetch(`${API}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }

    setFormData({
      id: "",
      username: "",
      email: "",
      password: "",
      phone: "",
      department: ""
    });

    fetchUsers();
  };

  // DELETE
  const deleteUser = async (id) => {
    await fetch(`${API}/delete/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  // EDIT
  const editUser = (user) => {
    setFormData(user);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        /><br /><br />

        <input
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        /><br /><br />

        <input
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
        /><br /><br />

        <input
          placeholder="Department"
          value={formData.department}
          onChange={(e) =>
            setFormData({ ...formData, department: e.target.value })
          }
        /><br /><br />

        <button type="submit">
          {formData.id ? "Update User" : "Add User"}
        </button>
      </form>

      <hr />

      <h2>User List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.department}</td>
              <td>
                <button onClick={() => editUser(u)}>Edit</button>
                <button onClick={() => deleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default UserForm;
