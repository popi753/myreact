import React, {useContext, useEffect} from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { UserContext } from "../App";




export default function Login() {
      const [err, seterr] = useState("");

      const navigate = useNavigate();

      const [user, setUser] = useContext(UserContext);

    
  return (
    <div id="loginbody">
      <div id="loginbox">
        <Formik
          initialValues={{
            "L-username": "",
            "L-password": "",
          }}
          validationSchema={Yup.object({
            "L-username": Yup.string().required("required"),
            "L-password": Yup.string().required("required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            axios
              .post("http://localhost:5000/login", {
                username: values["L-username"],
                password: values["L-password"],
              })
              .then((response) => {
                console.log(response);
                if (response.data === "incorrect username") {
                    seterr(response.data)
                }else if (response.data === "incorrect password") {
                    seterr(response.data)
                }else{
                  setUser(response.data)
                  window.localStorage.setItem("user", JSON.stringify(response.data))
                  navigate("/");
                }
                
              })
              .catch((err) => {
                console.log(err);
              });
              
            setSubmitting(false);
          }}
        >
          <Form>
            <div id="login">
              <Link id="loginsvg" to={"/"}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z" />
                </svg>
              </Link>
              <h1 style={{ fontFamily: "Lobster" }}>Login</h1>

              <Input
                label="L-label"
                className="loginboxes"
                type="text"
                id="L-username"
                name="L-username"
                placeholder="enter username"
                err={err === "incorrect username" ? err : null}
              />
              <Input
                label="L-label"
                className="loginboxes"
                type="password"
                id="L-password"
                name="L-password"
                placeholder="enter password"
                err={err === "incorrect password" ? err : null}
              />

              <button type="submit">Login</button>
              <Link id="Lregister" to="/register">
                have an account
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
