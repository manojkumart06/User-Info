import React, { useState, useEffect } from 'react';
import './App.css'; 

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = (page) => {
    fetch(`https://reqres.in/api/users?page=${page}`)
      .then(response => response.json())
      .then(data => {
        setUsers(data.data);
        setTotalPages(data.total_pages);
      })
      .catch(error => console.error('Error fetching users:', error));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePaginationClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <div className="user-directory-container">
        <h1>User Info</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="users">
          {filteredUsers.map(user => (
            <div key={user.id} className="user">
              <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
              <p className="name">{user.first_name} {user.last_name}</p>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => handlePaginationClick(currentPage - 1)}>Previous</button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index + 1} onClick={() => handlePaginationClick(index + 1)}>{index + 1}</button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => handlePaginationClick(currentPage + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default App;
