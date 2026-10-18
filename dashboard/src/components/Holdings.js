
import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please log in to view your holdings.");
          return;
        }

        const response = await axios.get(
          "http://localhost:3002/allHoldings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

       
        setAllHoldings(
          Array.isArray(response.data) ? response.data : []
        );
      } catch (err) {
        console.error("Unable to fetch holdings:", err);

        if (err.response?.status === 401) {
          setError("Your session has expired. Please log in again.");
        } else {
          setError("Unable to load holdings. Please check the backend.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, []);

  const totalInvestment = allHoldings.reduce(
    (total, stock) =>
      total + Number(stock.avg || 0) * Number(stock.qty || 0),
    0
  );

  const currentValue = allHoldings.reduce(
    (total, stock) =>
      total + Number(stock.price || 0) * Number(stock.qty || 0),
    0
  );

  const profitLoss = currentValue - totalInvestment;

  const profitLossPercent =
    totalInvestment > 0
      ? (profitLoss / totalInvestment) * 100
      : 0;

  
  const data = {
    labels: allHoldings.map((stock) => stock.name),
    datasets: [
      {
        label: "Current Holding Value",
        data: allHoldings.map(
          (stock) =>
            Number(stock.price || 0) * Number(stock.qty || 0)
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return <p>Loading holdings...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((stock) => {
              const qty = Number(stock.qty || 0);
              const avg = Number(stock.avg || 0);
              const price = Number(stock.price || 0);

              const curValue = price * qty;
              const pnl = curValue - avg * qty;
              const profClass = pnl >= 0 ? "profit" : "loss";

              return (
                <tr key={stock._id || stock.name}>
                  <td>{stock.name}</td>
                  <td>{qty}</td>
                  <td>{avg.toFixed(2)}</td>
                  <td>{price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>{pnl.toFixed(2)}</td>
                  <td className={profClass}>
                    {stock.net || "0.00%"}
                  </td>
                  <td className={profClass}>
                    {stock.day || "0.00%"}
                  </td>
                </tr>
              );
            })}

            {allHoldings.length === 0 && (
              <tr>
                <td colSpan="8">No holdings found. Buy a stock to get started.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>{totalInvestment.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}</h5>
          <p>Total investment</p>
        </div>

        <div className="col">
          <h5>{currentValue.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}</h5>
          <p>Current value</p>
        </div>

        <div className="col">
          <h5 className={profitLoss >= 0 ? "profit" : "loss"}>
            {profitLoss.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            ({profitLossPercent.toFixed(2)}%)
          </h5>
          <p>P&amp;L</p>
        </div>
      </div>

      {allHoldings.length > 0 && <VerticalGraph data={data} />}
    </>
  );
};

export default Holdings;
