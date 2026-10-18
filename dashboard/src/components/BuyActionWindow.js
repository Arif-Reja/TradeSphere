
import React, { useState, useContext } from "react";
//import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const { closeBuyWindow } = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [loading, setLoading] = useState(false);

  const handleBuyClick = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const qty = Number(stockQuantity);
    const price = Number(stockPrice);

    if (!token) {
      alert("Please log in again. Authentication token is missing.");
      return;
    }

    if (!Number.isInteger(qty) || qty <= 0 || !Number.isFinite(price) || price <= 0) {
      alert("Please enter a valid quantity and price greater than zero.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3002/newOrder",
        {
          name: uid,
          qty,
          price,
          mode: "BUY",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message || "Buy order placed successfully!");
      closeBuyWindow();
    } catch (error) {
      console.error("Failed to place buy order:", error);
      alert(
        error.response?.data?.message ||
          "Unable to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              step="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              min="0.05"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹{(Number(stockQuantity) * Number(stockPrice)).toFixed(2)}</span>

        <div>
          <button
            type="button"
            className="btn btn-blue"
            onClick={handleBuyClick}
            disabled={loading}
          >
            {loading ? "Placing..." : "Buy"}
          </button>

          <button
            type="button"
            className="btn btn-grey"
            onClick={handleCancelClick}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
