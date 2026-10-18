
import React, { useMemo, useState } from "react";
import "./Apps.css";

const initialStocks = [
  { symbol: "RELIANCE", name: "Reliance Industries", price: 1425.50, change: 1.25 },
  { symbol: "TCS", name: "Tata Consultancy Services", price: 3250.75, change: -0.65 },
  { symbol: "INFY", name: "Infosys Limited", price: 1580.20, change: 0.82 },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1720.40, change: 0.45 },
  { symbol: "ONGC", name: "Oil and Natural Gas Corporation", price: 265.80, change: -1.10 },
  { symbol: "ITC", name: "ITC Limited", price: 438.60, change: 0.72 },
  { symbol: "SBIN", name: "State Bank of India", price: 785.25, change: -0.32 },
  { symbol: "WIPRO", name: "Wipro Limited", price: 285.10, change: 1.05 },
];

const Apps = () => {
  const [stocks, setStocks] = useState(initialStocks);
  const [watchlist, setWatchlist] = useState([
    "RELIANCE",
    "TCS",
    "INFY",
    "HDFCBANK",
  ]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const filteredStocks = useMemo(() => {
    return stocks.filter((stock) => {
      const matchesSearch =
        stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
        stock.name.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "ALL" ||
        (filter === "WATCHLIST" && watchlist.includes(stock.symbol)) ||
        (filter === "GAINERS" && stock.change > 0) ||
        (filter === "LOSERS" && stock.change < 0);

      return matchesSearch && matchesFilter;
    });
  }, [stocks, search, filter, watchlist]);

  const toggleWatchlist = (symbol) => {
    setWatchlist((previous) =>
      previous.includes(symbol)
        ? previous.filter((item) => item !== symbol)
        : [...previous, symbol]
    );
  };

  const totalWatchlist = stocks.filter((stock) =>
    watchlist.includes(stock.symbol)
  );

  const gainers = stocks.filter((stock) => stock.change > 0).length;
  const losers = stocks.filter((stock) => stock.change < 0).length;

  const formatPrice = (price) =>
    price.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    });

  return (
    <div className="apps-page">
      <div className="apps-heading">
        <div>
          <p className="apps-eyebrow">YOUR MARKETPLACE</p>
          <h1>Market Watch</h1>
          <p className="apps-subtitle">
            Track stocks and build your personal watchlist.
          </p>
        </div>
        <div className="market-status">
          <span className="status-dot" />
          Demo Market
        </div>
      </div>

      <div className="apps-stats">
        <div className="apps-stat-card">
          <span>Available stocks</span>
          <strong>{stocks.length}</strong>
          <small>Stocks to explore</small>
        </div>

        <div className="apps-stat-card">
          <span>My watchlist</span>
          <strong>{watchlist.length}</strong>
          <small>Stocks tracked</small>
        </div>

        <div className="apps-stat-card">
          <span>Gainers</span>
          <strong className="positive">{gainers}</strong>
          <small>Demo daily change above 0%</small>
        </div>

        <div className="apps-stat-card">
          <span>Losers</span>
          <strong className="negative">{losers}</strong>
          <small>Demo daily change below 0%</small>
        </div>
      </div>

      <div className="apps-toolbar">
        <div className="apps-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Search company or symbol..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search stocks"
          />
        </div>

        <button
          className="apps-reset-button"
          onClick={() => {
            setSearch("");
            setFilter("ALL");
          }}
        >
          Reset filters
        </button>
      </div>

      <div className="apps-filters">
        {[
          ["ALL", "All stocks"],
          ["WATCHLIST", "My watchlist"],
          ["GAINERS", "Gainers"],
          ["LOSERS", "Losers"],
        ].map(([value, label]) => (
          <button
            key={value}
            className={`apps-filter ${filter === value ? "selected" : ""}`}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="apps-table-card">
        <div className="apps-table-heading">
          <div>
            <h2>Stocks</h2>
            <p>{filteredStocks.length} stocks found</p>
          </div>
          <span className="demo-label">DEMO DATA</span>
        </div>

        <div className="apps-table-scroll">
          <table className="apps-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Symbol</th>
                <th>Demo price</th>
                <th>Daily change</th>
                <th>Watchlist</th>
              </tr>
            </thead>

            <tbody>
              {filteredStocks.map((stock) => {
                const isAdded = watchlist.includes(stock.symbol);

                return (
                  <tr key={stock.symbol}>
                    <td>
                      <div className="apps-company">
                        <div className="apps-stock-avatar">
                          {stock.symbol.slice(0, 2)}
                        </div>
                        <span>{stock.name}</span>
                      </div>
                    </td>
                    <td>
                      <strong>{stock.symbol}</strong>
                    </td>
                    <td>{formatPrice(stock.price)}</td>
                    <td>
                      <span
                        className={
                          stock.change >= 0
                            ? "apps-change positive"
                            : "apps-change negative"
                        }
                      >
                        {stock.change > 0 ? "+" : ""}
                        {stock.change.toFixed(2)}%
                      </span>
                    </td>
                    <td>
                      <button
                        className={`apps-watch-button ${
                          isAdded ? "added" : ""
                        }`}
                        onClick={() => toggleWatchlist(stock.symbol)}
                      >
                        {isAdded ? "✓ Added" : "+ Add"}
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredStocks.length === 0 && (
                <tr>
                  <td colSpan="5" className="apps-empty">
                    No stocks match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="apps-footer">
          Showing {filteredStocks.length} of {stocks.length} demo stocks
        </div>
      </div>

      <div className="apps-info">
        <span aria-hidden="true">ⓘ</span>
        <p>
          This page uses sample prices and percentage changes for demonstration.
          Prices do not update live and must not be used for trading decisions.
        </p>
      </div>
    </div>
  );
};

export default Apps;
