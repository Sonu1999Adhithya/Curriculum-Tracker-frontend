import React, { useState, useEffect } from "react";
import axios from "axios";

function Listcourse() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  //data
  const fetchData = async () => {
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    setData(result.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    fetchData();
  };

  const handleEdit = async (id, newData) => {
    await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      newData
    );
    fetchData();
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input type="text" placeholder="Search" onChange={handleSearch} />

      <table>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              {/* <td>{item.id}</td> */}
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete </button>
                <button
                  onClick={() =>
                    handleEdit(item.id, {
                      name: "New Name",
                      email: "newemail@example.com",
                    })
                  }
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Listcourse;
