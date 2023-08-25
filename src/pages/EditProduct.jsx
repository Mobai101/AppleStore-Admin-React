import React from "react";
import NewProductForm from "../components/newProduct/NewProductForm";

const EditProduct = (props) => {
  return (
    <>
      <NewProductForm edit={true} />
    </>
  );
};

export default EditProduct;

export const editProductLoader = async ({ params }) => {
  const token = localStorage.getItem("appleToken");

  try {
    const response = await fetch(
      `https://tranledong-applestore-backend.onrender.com/products/${params.productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Could not fetch data");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
