import React, { useEffect, useState } from "react";
import { Table, Row, Container, Col, Button } from "react-bootstrap";
import "../App.css";

import { Link } from "react-router-dom";

function UsersList(props) {
  // Array with order options
  const orderArray = [null, "asc", "desc"];
  const [currentOrderColumn, setCurrentOrderColumn] = useState(null);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);

  //Array for the table header
  const tableHeader = [
    {
      label: "ID",
      key: "id",
      onClick: () => sortBy("id"),
    },
    {
      label: "First Name",
      key: "name",
      onClick: () => sortBy("name"),
    },
    {
      label: "Username",
      key: "username",
      onClick: () => sortBy("username"),
    },
    {
      label: "Website",
      key: "website",
      onClick: () => sortBy("website"),
    },
  ];

  function sortBy(sortByColumn) {
    if (currentOrderColumn === sortByColumn) {
      if (currentOrderIndex === orderArray.length - 1) {
        setCurrentOrderIndex(0);
      } else {
        setCurrentOrderIndex(currentOrderIndex + 1);
      }
    } else {
      setCurrentOrderColumn(sortByColumn);
      setCurrentOrderIndex(1);
    }
    props.getUsers(currentOrderColumn, currentOrderIndex);
  }

  if (props.error) {
    return <div>Error: {props.error.message}</div>;
  } else if (!props.setLoadingUsers) {
    return <div>Loading</div>;
  } else {
    return (
      <Container>
        <Row className="mt-4 mb-4">
          <Col className="text-right">
            <Link to="/create">
              <Button>Create new user</Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Table>
            <thead>
              <tr>
                {tableHeader.map((header) => (
                  <th key={header.key}>
                    <button onClick={header.onClick}>
                      {header.label} --{" "}
                      {header.key === currentOrderColumn
                        ? orderArray[currentOrderIndex]
                        : ""}
                    </button>
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {props.users.map((user) => (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.website}</td>
                  <td>
                    <div>
                      <Link to={`/details/${user.id}`}>
                        <Button
                          variant="info"
                          onClick={props.handleDetails}
                          className="mr-2"
                        >
                          Details
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => props.handleDelete(user.id)}
                      >
                        {user.isLoadingDelete ? "Loading" : "Delete"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>
    );
  }
}

export default UsersList;
