import React, { useState } from "react";
import classes from "./NewProductForm.module.css";
import { useLoaderData, useParams } from "react-router-dom";

const NewProductForm = (props) => {
  const loaderData = useLoaderData();
  const [error, setError] = useState(null);
  const params = useParams();

  const productId = params.productId;

  console.log(loaderData);

  const submitHander = async (e) => {
    e.preventDefault();
    setError(null);
    const token = localStorage.getItem("appleToken");

    const data = new FormData();
    data.append("name", e.target.name.value);
    data.append("category", e.target.category.value);
    data.append("price", e.target.price.value);
    data.append("shortdesc", e.target.shortdesc.value);
    data.append("longdesc", e.target.longdesc.value);
    data.append("count", e.target.count.value);

    // Edit mode
    if (props.edit) {
      try {
        const response = await fetch(
          `https://tranledong-applestore-backend.onrender.com/admin/product/edit/${productId}`,
          {
            method: "PUT",
            headers: {
              Authorization: "Bearer " + token,
            },
            body: data,
          }
        );
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message);
        }
        window.location.href = "/products";
      } catch (error) {
        setError(error);
      }

      // Add new mode
    } else {
      for (let i = 0; i < e.target.images.files.length; i++) {
        data.append("images", e.target.images.files[i]);
      }

      try {
        const response = await fetch(
          `https://tranledong-applestore-backend.onrender.com/admin/product/add`,
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
            },
            body: data,
          }
        );
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message);
        }
        window.location.href = "/products";
      } catch (error) {
        setError(error);
      }
    }
  };

  return (
    <div className={classes.newProductSection}>
      {props.edit ? <h2>Update Product</h2> : <h2>Add new Product</h2>}

      {error && (
        <>
          <p className={classes.errorText}>{error.message}</p>
        </>
      )}
      <form onSubmit={submitHander} className={classes.newProductForm}>
        <div className={classes.inputDiv}>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={loaderData?.name}
          />
        </div>
        <div className={classes.inputDiv}>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            defaultValue={loaderData?.category}
          />
        </div>
        <div className={classes.inputDiv}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            defaultValue={loaderData?.price}
          />
        </div>
        <div className={classes.inputDiv}>
          <label htmlFor="count">Count</label>
          <input
            type="number"
            id="count"
            name="count"
            defaultValue={loaderData?.count || 20}
          />
        </div>
        {!props.edit && (
          <div className={classes.inputDiv}>
            <label htmlFor="images">Upload Image</label>
            <input type="file" id="images" name="images" multiple />
          </div>
        )}

        <div className={classes.inputDiv}>
          <label htmlFor="shortdesc">Short Description</label>
          <textarea
            id="shortdesc"
            name="shortdesc"
            defaultValue={loaderData?.short_desc}
          />
        </div>
        <div className={classes.inputDiv}>
          <label htmlFor="longdesc">Long Description</label>
          <textarea
            id="longdesc"
            name="longdesc"
            defaultValue={loaderData?.long_desc}
          />
        </div>

        <button className={classes.sendBtn}>
          {props.edit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default NewProductForm;
