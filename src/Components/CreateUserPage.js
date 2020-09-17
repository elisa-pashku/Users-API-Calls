import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import UserForm from "./UserForm";

export default function CreateUserPage() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  //When canceling from editing
  function handleCancel() {
    history.goBack();
  }

  function handleCreation(data) {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        username: data.username,
        email: data.email,
        website: data.website,
        phone: data.phone,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
      });
  }
  return (
    <UserForm
      initialValues={{
        name: "",
        username: "",
        email: "",
        website: "",
        phone: "",
      }}
      handleSubmit={handleCreation}
      isLoading={loading}
      status="create"
      editing="false"
    />
  );
}
