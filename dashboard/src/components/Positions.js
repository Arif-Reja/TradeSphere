
import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please log in to view your positions.");
          return;
        }

        const response = await axios.get(
          "https://trade-sphere-gwxh.vercel.app/allPositions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAllPositions(
          Array.isArray(response.data) ? response.data : []
        );
      } catch (err) {
        console.error("Unable to fetch positions:", err);

        if (err.response?.status === 401) {
          setError("Your session has expired. Please log in again.");
        } else {
          setError("Unable to load positions. Please check the backend.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  if (loading) {
    return <p>Loading positions...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&amp;L</th>
              <th>Chg.</th>
            </tr>
          </thead>

          <tbody>
            {allPositions.map((stock) => {
              const qty = Number(stock.qty || 0);
              const avg = Number(stock.avg || 0);
              const price = Number(stock.price || 0);

      
              const pnl = (price - avg) * qty;
              const profClass = pnl >= 0 ? "profit" : "loss";

              return (
                <tr key={stock._id || stock.name}>
                  <td>{stock.product || "-"}</td>
                  <td>{stock.name}</td>
                  <td>{qty}</td>
                  <td>{avg.toFixed(2)}</td>
                  <td>{price.toFixed(2)}</td>
                  <td className={profClass}>{pnl.toFixed(2)}</td>
                  <td className={profClass}>
                    {stock.day || "0.00%"}
                  </td>
                </tr>
              );
            })}

            {allPositions.length === 0 && (
              <tr>
                <td colSpan="7">
                  No positions found. Your positions will appear here when available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
