import React, { useEffect, useState } from "react";
import classes from "./ProductsList.module.css";
import { Link } from "react-router-dom";

const ProductsList = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  console.log(allProducts);

  const searchHandler = (e) => {
    e.preventDefault();
    setSearchValue(e.target.search.value);
  };

  const deleteHandler = async (e) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const token = localStorage.getItem("appleToken");
      const response = await fetch(
        `https://tranledong-applestore-backend.onrender.com/admin/delete/${e.target.dataset.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const result = await response.json();
      if (response.status === 200) {
        window.location.reload();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("appleToken");

      const response = await fetch(
        `https://tranledong-applestore-backend.onrender.com/products?search=${searchValue}`,
        {
          headers: {
            Authorization: "Bearer" + token,
          },
        }
      );
      const result = await response.json();
      setAllProducts(result);
    };
    fetchProducts().catch((err) => console.log(err));
  }, [searchValue]);

  return (
    <section className={classes.productsSection}>
      <h4>Products</h4>
      <form onSubmit={searchHandler} className={classes.searchForm}>
        <input
          type="text"
          placeholder="Enter Search!"
          id="search"
          name="search"
        />
        <button>Search</button>
      </form>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Category</th>
            <th>Count</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allProducts?.map((product) => {
            return (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString()} VND</td>
                <td>
                  <img src={product.images[0]} alt={product.name} />
                </td>
                <td>{product.category}</td>
                <td>{product.count}</td>
                <td className={classes.actionCol}>
                  <Link to={`/products/edit/${product._id}`}>Edit</Link>
                  <button data-id={product._id} onClick={deleteHandler}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default ProductsList;
