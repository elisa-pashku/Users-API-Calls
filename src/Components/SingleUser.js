import React, { useLayoutEffect, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";
import "../UserForm.css";
import { useParams, Link, useHistory } from "react-router-dom";
import UserForm from "./UserForm";

export default function SingleUser(props) {
  // Get the id of the specific user
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState();
  const [editing, setEditing] = useState(false);

  const history = useHistory();

  //Call the API
  useLayoutEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((json) => setUser(json))
      .catch((err) => {
        setError(err);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, [id]);

  function handleEdit() {
    setEditing(true);
  }

  function handleSubmitEdit(user) {
    setFormLoading(true);

    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        website: user.website,
        phone: user.phone,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setUser(json);
        setEditing(false);
      })
      .catch((err) => setError(err))
      .finally(() => setFormLoading(false));
  }

  function handleCancel() {
    history.goBack();
    setEditing(false);
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  if (loading) {
    return <div>...Loading...</div>;
  }

  return (
    <Container className="container ">
      <Card className="text-center">
        {editing ? (
          <>
            <Card.Body>
              <UserForm
                initialValues={{
                  id: user.id,
                  name: user.name,
                  username: user.username,
                  email: user.email,
                  website: user.website,
                  phone: user.phone,
                }}
                handleSubmit={handleSubmitEdit}
                isLoading={formLoading}
                status="edit"
                handleCancel={handleCancel}
              />
            </Card.Body>
          </>
        ) : (
          <>
            <Card.Header>I am {user.name}</Card.Header>
            <Card.Body>
              <Card.Title>{user.username}</Card.Title>
              <Card.Text>{user.website}</Card.Text>
              <Card.Text>{user.email}</Card.Text>
              <Card.Footer className="text-muted">{user.phone}</Card.Footer>
              <Button variant="info" onClick={handleEdit}>
                Edit
              </Button>
            </Card.Body>
          </>
        )}
      </Card>
    </Container>
  );
}
