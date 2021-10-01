import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import { getCategoryById, updateThisCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAutheticated();
  console.log(user);

  const goBack = () => {
    return (
      <div className="mt-2">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );
  };

  const preload = (categoryId) => {
    getCategoryById(categoryId).then((data) => {
      console.log(data);
      setName(data.name);
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    setError("");
    setName(event.target.value);
  };

  const onsubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
 

    updateThisCategory(match.params.categoryId, user._id, token, { name })
      .then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data.error);
        } else {
          setName(data.name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };
  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to create category</h4>;
    }
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group ">
          <p className="lead">Enter a category</p>
          <input
            type="text"
            className="form-control my-3"
            autoFocus
            required
            placeholder="For Ex. summer"
            onChange={handleChange}
            value={name}
          />
          <button onClick={onsubmit} className="btn btn-outline-info mb-3">
            Update Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create a category here"
      description="add a new category for new tshirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
