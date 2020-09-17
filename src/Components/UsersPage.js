import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import UsersList from "./UsersList";
import { Button, Form } from "react-bootstrap";
import "../App.css";

export default function UsersPage() {
  const [error, setError] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Everytime something changes, similar to ComponentDidMount
  useEffect(() => {
    getUsers();
  }, []);

  // Everytime the current page changes
  useEffect(() => {
    getUsers();
  }, [currentPage]);

  function getUsers(itemsPerPage = usersPerPage, qParam, order, sort) {
    let queryUrlParam; //added parameter for search
    if (qParam) {
      queryUrlParam = `&q=${qParam}`;
    } else {
      queryUrlParam = searchQuery ? `&q=${searchQuery}` : "";
    }

    let orderParam; //added parameters for the sorting
    if (order & sort) {
      orderParam = `&_sort=${sort}&_order=${order}`;
    } else {
      orderParam = "";
    }

    fetch(
      `https://jsonplaceholder.typicode.com/users?_limit=${itemsPerPage}&_page=${currentPage}${queryUrlParam}${orderParam}`
    )
      .then((res) => res.json())
      .then((results) => {
        setUsers(results);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoadingUsers(false));
  }

  //When changing the number of users per page
  function handleUsersPerPageChange(e) {
    setUsersPerPage(e.target.value);
    if (currentPage === 1) {
      return getUsers(e.target.value);
    }
    setCurrentPage(1);
  }

  // For pagination
  function goToPrevPage() {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  }
  function goToNextPage() {
    if (currentPage === Math.ceil(10 / usersPerPage)) {
      return;
    }
    setCurrentPage(currentPage + 1);
  }

  // When clicking the button Details per each user
  function handleDetails(id) {
    const newUsers = users.map((u) => ({ ...u }));
    const index = newUsers.findIndex((user) => user.id === id);
    setCurrentUser(newUsers[index]);
  }

  // When deleting a specific user
  function handleDelete(id) {
    setUsers(isDeletingUser(id, true));
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        getUsers();
      })
      .catch((err) => {
        setUsers(isDeletingUser(id, false));
      });
  }

  function isDeletingUser(id, loadingDelete) {
    const newUsers = users.map((p) => ({ ...p }));
    const index = users.findIndex((user) => user.id === id);
    newUsers[index].isLoadingDelete = loadingDelete;
    return newUsers;
  }

  function handleSearchUsers(e) {
    let value = e.target.value;
    setSearchQuery(value);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
      let timeout = setTimeout(() => {
        getUsers(usersPerPage, value);
      }, 500);

      setSearchTimeout(timeout);
    } else {
      let timeout = setTimeout(() => {
        getUsers(usersPerPage, value);
      }, 500);

      setSearchTimeout(timeout);
    }
    setCurrentPage(1);
  }

  return (
    <>
      <div className="head-logo">
        <h1 className="text-center">My api calls</h1>
        <Form.Control
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchUsers}
        />
      </div>
      <br></br>
      <UsersList
        error={error}
        setError={setError}
        loadingUsers={loadingUsers}
        setLoadingUsers={setLoadingUsers}
        users={users}
        setUsers={setUsers}
        getUsers={getUsers}
        handleDelete={handleDelete}
        isDeletingUser={isDeletingUser}
        handleDetails={handleDetails}
      />
      <div class="container">
        <Button
          className="ml-4 "
          onClick={goToPrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <Button
          className="ml-4 "
          onClick={goToNextPage}
          disabled={currentPage === Math.ceil(10 / usersPerPage)}
        >
          Next
        </Button>
        <select className="ml-4 " onChange={handleUsersPerPageChange}>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
    </>
  );
}
