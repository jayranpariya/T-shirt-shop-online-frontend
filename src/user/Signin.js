import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { isAutheticated, authenticate, signin } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "jayranpariya2002@gmail.com",
    password: "123456789",
    error: "",
    location: false,
    didRedirect: false,
  });

  const { email, password, error, location, didRedirect } = values;

  const { user } = isAutheticated();

  const handChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loaded: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loaded: false });
        } else {
          //next -> callback function
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
  };

  const proformRedirect = () => {
    //todo de a redirect
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect  to="/admin/dashboard"/>;
      } else {
        return  <Redirect  to="/user/dashboard"/>;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
      // return <p> redirect to Home</p>;
    }
  };

  const loadingMessage = () => {
    return (
      location && (
        <div className="alert alert-info">
          <h2>Location....</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3  text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3  text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handChange("email")}
                value={email}
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                value={password}
                onChange={handChange("password")}
                type="password"
              />
            </div>

            <button
              style={{ marginTop: "20px" }}
              type="button"
              className="btn btn-success w-100"
              onClick={onSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="Signin page" description="a page for user to sign in ">
      {errorMessage()}
      {loadingMessage()}
      {signInForm()}
      {proformRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
