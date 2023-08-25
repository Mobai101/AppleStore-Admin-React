import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function DetailHistory(props) {
  const { orderId } = useParams();
  const [cart, setCart] = useState([]);
  const [information, setInformation] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://tranledong-applestore-backend.onrender.com/histories/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("appleToken")}`,
          },
        }
      );
      const result = await response.json();

      console.log(result);

      setCart(result.orders);

      setInformation(result);
    };

    fetchData();
  }, [orderId]);

  return (
    <div className="container">
      <div className="p-5">
        <h1 className="h2 text-uppercase">Order Information</h1>
        <p>User ID: {information.user}</p>
        <p>Full Name: {information.fullName}</p>
        <p>Phone: {information.phoneNumber}</p>
        <p>Address: {information.address}</p>
        <p>
          Total:{" "}
          {information.total?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>

      <div className="table-responsive pt-5 pb-5">
        <table className="table">
          <thead className="bg-light">
            <tr className="text-center">
              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">
                  ID Product
                </strong>
              </th>
              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">Image</strong>
              </th>
              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">Name</strong>
              </th>
              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">Price</strong>
              </th>
              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">Count</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {cart &&
              cart.map((value) => (
                <tr className="text-center" key={value.productId._id}>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">{value.productId._id}</h6>
                  </td>
                  <td className="pl-0 border-0">
                    <div className="media align-items-center justify-content-center">
                      <Link
                        className="reset-anchor d-block animsition-link"
                        to={`/detail/${value.productId._id}`}
                      >
                        <img
                          src={value.productId.images[0]}
                          alt="..."
                          width="200"
                        />
                      </Link>
                    </div>
                  </td>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">{value.productId.name}</h6>
                  </td>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">
                      {value.productId.price.toLocaleString()} VND
                    </h6>
                  </td>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">{value.count}</h6>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailHistory;
