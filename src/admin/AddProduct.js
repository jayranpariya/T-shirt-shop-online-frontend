import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Route, Redirect } from "react-router-dom";
import { getCategories, createaProduct } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";

const AddProduct = () => {
  const { user, token } = isAutheticated();

  const [values, setvalues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createProduct,
    getaRedirect,
    formData,
  } = values;

  const preload = () => {
    getCategories().then((data) => {
      console.log(data);
      if (data.error) {
        setvalues({ ...values, error: data.error });
      } else {
        setvalues({ ...values, categories: data, formData: new FormData() });
        //bug
        console.log(categories);
        console.log(values);
      }
    });
  };


  // change data run in the reload
  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setvalues({ ...values, error: "", loading: true });
    createaProduct(user._id, token, formData)
      .then((data) => {
        console.log(data);
        if (data.error) {
          setvalues({ ...values, error: data.error });
        }
        else {
          setvalues({
            ...values,
            name: "",
            description: "",
            price: "",
            phone: "",
            stock: "",
            loading: false,
            createProduct: data.name,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // todo: implement
  const loadingManager = () => {
    return loading ? (
      <Route>
        <Redirect to="/admin/dashboard" />
      </Route>
    ) : (
      <h1>Loading</h1>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{
          display: createProduct ? "" : "none",
        }}
      >
        <h4>{createProduct} created successfully</h4>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h4>{error}</h4>
      </div>
    );
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setvalues({ ...values, [name]: value });
  };

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group mb-3">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group mb-3">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group mb-3">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group mb-3">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group mb-3">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group mb-3">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a Product here!"
      description="Welcome to create a new product"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row text-white bg-dark rounded">
        <div className="col-md-8 offset-md-2">
          {errorMessage()}
          {successMessage()}
          {createProductForm()}
          {/* //todo */}
          {/* {loadingManager()} */}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
