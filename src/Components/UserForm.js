import React from "react";
import { useFormik } from "formik";
import { Form, Button, Container } from "react-bootstrap";
import "../UserForm.css";

export default function UserForm(props) {
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: (values, { resetForm }) => {
      props.handleSubmit(values);
      resetForm({ values: "" });
    },
  });

  return (
    <Container className="form-container">
      {props.status === "create" ? (
        <h1 className="text-center mb-4">Create new user</h1>
      ) : (
        <h1 className="text-center mb-4">Edit user</h1>
      )}
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label>Enter Name</Form.Label>
          <Form.Control
            id="firstName"
            name="name"
            type="text"
            placeholder="Name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Enter Username</Form.Label>
          <Form.Control
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Enter Email</Form.Label>
          <Form.Control
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Enter Website</Form.Label>
          <Form.Control
            id="website"
            name="website"
            type="text"
            placeholder="Website"
            onChange={formik.handleChange}
            value={formik.values.website}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Enter Phone number</Form.Label>
          <Form.Control
            id="phone"
            name="phone"
            type="text"
            placeholder="Phone Number"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
        </Form.Group>

        <Button type="submit" variant="success" className="btn-block">
          {props.isLoading ? "Loding..." : "Submit"}
        </Button>
        <Button
          variant="warning"
          type="submit"
          onClick={props.handleCancel}
          className="btn-block"
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
}
