import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import {
  deleteCategory,
  getCategories,
  updateCategory,
} from "./helper/adminapicall";
import UpdateCategory from "./UpdateCategory";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  const { user, token } = isAutheticated();

  const preload = () => {
    getCategories()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);
          setCategories(data);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThiscategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setMessage(data.message);
          preload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">{message}</h2>
          {categories.map((category, index) => {
            return (
              <div className="row text-center mb-2 " key={index}>
                <div className="col-4">
                  <h3 className="text-white text-left">{category.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/category/update/${category._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
           
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThiscategory(category._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
