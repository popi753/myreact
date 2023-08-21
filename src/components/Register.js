import React, { useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { UserContext } from "../App";




export default function Register() {
    const [UniqueError, setUniqueError] = useState(false);

    const navigate = useNavigate();

    const [user, setUser] = useContext(UserContext)

    
  return (
    <div id="registerbody">
      <div id="registerbox">
        <Formik
          initialValues={{
            "R-username": "",
            "R-password": "",
          }}
          validationSchema={Yup.object({
            "R-username": Yup.string()
              .min(8, "Username must be at least 8 characters")
              .max(20, "Username must be less than 20 characters")
              .required("required"),
            "R-password": Yup.string()
              .min(8, "password must be at least 8 characters")
              .max(20, "password must be less than 20 characters")
              .required("required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            axios
              .post("http://localhost:5000/register", {
                username: values["R-username"],
                password: values["R-password"],
              })
              .then(
                (response) => {
                    console.log(response)
                  if (response.data === 11000) {
                    console.log("duplicate")
                    setUniqueError(true)
                    setSubmitting(false);
                  } else {
                    setUniqueError(false);
                    setUser(response.data)
                    window.localStorage.setItem("user", JSON.stringify(response.data))
                    navigate("/")
                }
                },
              )
              .catch((error) => {
                console.log(`this is ${error}`);
              });
            setSubmitting(false);
          }}
        >
          <Form>
            <div id="register">
              <Link id="registersvg" to={"/"}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z" />
                </svg>
              </Link>
              <h1 style={{ fontFamily: "Lobster" }}>Registration</h1>

              <Input
                label="R-label"
                className="registerboxes"
                type="text"
                id="R-username"
                name="R-username"
                placeholder="enter username"
                UniqueError={UniqueError}
              />
              <Input
                label="R-label"
                className="registerboxes"
                type="password"
                id="R-password"
                name="R-password"
                placeholder="enter password"
              />

              <button type="submit">Register</button>
              <Link id="Rlogin" to="/login">
                have an account
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
