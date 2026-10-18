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

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Online Account Opening
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Offline Account Opening
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Company, Partnership and HUF Account Opening
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            NRI Account Opening
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Charges at Zerodha
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Zerodha IDFC FIRST Bank 3-in-1 Account
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
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

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Login to Zerodha
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Forgot password
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Profile settings
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Account modification
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
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

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Trading on Kite
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Orders and trades
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Funds and margins
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Intraday trading
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            F&O trading
          </a>
          <br />
        </div>

        {/* Kite */}
        <div className="col-4 p-5 mt-2 mb-2">
          <h4>
            <i className="fa fa-plus-circle" aria-hidden="true"></i>{" "}
            Kite
          </h4>

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Kite login
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Kite user manual
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Charts and indicators
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Marketwatch
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
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

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Add funds
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Withdraw funds
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Fund transfer
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
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

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Coin
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Mutual fund investments
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            SIP
          </a>
          <br />

          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Redemption
          </a>
          <br />
        </div>

      </div>
    </div>
  );
}

export default CreateTicket;