import React from "react";

function CreateTicket() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h1 className="fs-2">
          To create a ticket, select a relevant topic
        </h1>

        {/* Account Opening */}
        <div className="col-4 p-5 mt-2 mb-2">
          <h4>
            <i className="fa fa-plus-circle" aria-hidden="true"></i>{" "}
            Account Opening
          </h4>

          <a href="https://zerodha.com/open-account/" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Online Account Opening
          </a>
          <br />

          <a href="https://support.zerodha.com/category/account-opening" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Offline Account Opening
          </a>
          <br />

          <a href="https://support.zerodha.com/category/account-opening" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Company, Partnership and HUF Account Opening
          </a>
          <br />

          <a href="https://zerodha.com/open-account/nri/" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            NRI Account Opening
          </a>
          <br />

          <a href="https://zerodha.com/charges/" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Charges at Zerodha
          </a>
          <br />

          <a href="https://support.zerodha.com/" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Zerodha IDFC FIRST Bank 3-in-1 Account
          </a>
          <br />

          <a href="https://zerodha.com/varsity/" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Getting Started
          </a>
          <br />
        </div>

        {/* Your Account */}
        <div className="col-4 p-5 mt-2 mb-2">
          <h4>
            <i className="fa fa-plus-circle" aria-hidden="true"></i>{" "}
            Your Zerodha Account
          </h4>

          <a href="https://kite.zerodha.com/" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Login to Zerodha
          </a>
          <br />

          <a href="https://kite.zerodha.com/forgot" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Forgot password
          </a>
          <br />

          <a href="https://account.zerodha.com/" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Profile settings
          </a>
          <br />

          <a href="https://support.zerodha.com/category/your-zerodha-account" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Account modification
          </a>
          <br />

          <a href="https://support.zerodha.com/" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Account closure
          </a>
          <br />
        </div>

        {/* Trading */}
        <div className="col-4 p-5 mt-2 mb-2">
          <h4>
            <i className="fa fa-plus-circle" aria-hidden="true"></i>{" "}
            Trading
          </h4>

          <a href="https://kite.trade/docs/kite/" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Trading on Kite
          </a>
          <br />

          <a href="https://kite.trade/docs/kite/orders/" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Orders and trades
          </a>
          <br />

          <a href="https://support.zerodha.com/category/trading-and-markets/margins" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Funds and margins
          </a>
          <br />

          <a href="https://support.zerodha.com/category/trading-and-markets" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Intraday trading
          </a>
          <br />

          <a href="https://support.zerodha.com/category/trading-and-markets" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            F&amp;O trading
          </a>
          <br />
        </div>

        {/* Kite */}
        <div className="col-4 p-5 mt-2 mb-2">
          <h4>
            <i className="fa fa-plus-circle" aria-hidden="true"></i>{" "}
            Kite
          </h4>

          <a href="https://kite.zerodha.com/" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Kite login
          </a>
          <br />

          <a href="https://kite.trade/docs/kite/" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Kite user manual
          </a>
          <br />

          <a href="https://kite.trade/docs/kite/" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Charts and indicators
          </a>
          <br />

          <a href="https://kite.trade/docs/kite/" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Marketwatch
          </a>
          <br />

          <a href="https://console.zerodha.com/" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Console
          </a>
          <br />
        </div>

        {/* Funds */}
        <div className="col-4 p-5 mt-2 mb-2">
          <h4>
            <i className="fa fa-plus-circle" aria-hidden="true"></i>{" "}
            Funds
          </h4>

          <a href="https://console.zerodha.com/funds" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Add funds
          </a>
          <br />

          <a href="https://console.zerodha.com/funds" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Withdraw funds
          </a>
          <br />

          <a href="https://support.zerodha.com/" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Fund transfer
          </a>
          <br />

          <a href="https://support.zerodha.com/" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Payment issues
          </a>
          <br />
        </div>

        {/* Mutual Funds */}
        <div className="col-4 p-5 mt-2 mb-2">
          <h4>
            <i className="fa fa-plus-circle" aria-hidden="true"></i>{" "}
            Mutual Funds
          </h4>

          <a href="https://coin.zerodha.com/" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Coin
          </a>
          <br />

          <a href="https://support.zerodha.com/" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Mutual fund investments
          </a>
          <br />

          <a href="https://support.zerodha.com/" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            SIP
          </a>
          <br />

          <a href="https://support.zerodha.com/" style={{ textDecoration: "none", lineHeight: "2.5" }} target="_blank" rel="noopener noreferrer">
            Redemption
          </a>
          <br />
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;