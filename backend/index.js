
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UserModel } = require("./model/UserModel");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const authenticateToken = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

// ---------------- SignUp ----------------
app.post("/auth/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (
      typeof fullName !== "string" ||
      !fullName.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        message: "Name, email, and password are required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must contain at least 8 characters.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await UserModel.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await UserModel.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Account created successfully. Please log in.",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    console.error("Signup error:", error.message);

    return res.status(500).json({
      message: "Unable to create account.",
    });
  }
});

// ---------------- Login ----------------
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured.");
    }

    const user = await UserModel.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      message: "Unable to log in.",
    });
  }
});

// ---------------- Holdings ----------------
app.get("/allHoldings", authenticateToken, async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({
      userId: req.userId,
    });

    return res.json(allHoldings);
  } catch (error) {
    console.error("Holdings error:", error.message);

    return res.status(500).json({
      message: "Unable to fetch holdings.",
    });
  }
});

// ---------------- Positions ----------------

app.get("/allPositions", authenticateToken, async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({
      userId: req.userId,
    });

    return res.json(allPositions);
  } catch (error) {
    console.error("Positions error:", error.message);

    return res.status(500).json({
      message: "Unable to fetch positions.",
    });
  }
});

// ---------------- Orders ----------------
app.get("/allOrders", authenticateToken, async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    return res.json(allOrders);
  } catch (error) {
    console.error("Orders error:", error.message);

    return res.status(500).json({
      message: "Unable to fetch orders.",
    });
  }
});

// ---------------- Create but order + Update holdings ----------------
app.post("/newOrder", authenticateToken, async (req, res) => {
  const { name, qty, price, mode } = req.body;

  const stockName =
    typeof name === "string" ? name.trim().toUpperCase() : "";

  const quantity = Number(qty);
  const purchasePrice = Number(price);

  if (
    !stockName ||
    !Number.isSafeInteger(quantity) ||
    quantity <= 0 ||
    !Number.isFinite(purchasePrice) ||
    purchasePrice <= 0 ||
    mode !== "BUY"
  ) {
    return res.status(400).json({
      message:
        "Invalid order details. Only valid BUY orders are supported currently.",
    });
  }

  let session;

  try {
    session = await mongoose.startSession();

    let createdOrder;

    await session.withTransaction(async () => {
    
      const holding = await HoldingsModel.findOne({
        userId: req.userId,
        name: stockName,
      }).session(session);

      if (holding) {
        const oldQty = holding.qty;
        const newQty = oldQty + quantity;

        holding.avg =
          (oldQty * holding.avg +
            quantity * purchasePrice) /
          newQty;

        holding.qty = newQty;
        holding.price = purchasePrice;

        await holding.save({ session });
      } else {
        await HoldingsModel.create(
          [
            {
              userId: req.userId,
              name: stockName,
              qty: quantity,
              avg: purchasePrice,
              price: purchasePrice,
              net: "0.00%",
              day: "0.00%",
            },
          ],
          { session }
        );
      }

      
      console.log("Creating/updating position:", {
  userId: req.userId,
  stockName,
  quantity,
  purchasePrice,
});
      const position = await PositionsModel.findOne({
        userId: req.userId,
        name: stockName,
      }).session(session);

      if (position) {
        const oldQty = position.qty;
        const newQty = oldQty + quantity;

        
        position.avg =
          (oldQty * position.avg +
            quantity * purchasePrice) /
          newQty;

        position.qty = newQty;

       
        position.price = purchasePrice;
        position.product = "CNC";
        position.net = "0.00%";
        position.day = "0.00%";
        position.isLoss = false;

        await position.save({ session });
        console.log("Existing position updated");
      } else {
        await PositionsModel.create(
          [
            {
              userId: req.userId,
              product: "CNC",
              name: stockName,
              qty: quantity,
              avg: purchasePrice,
              price: purchasePrice,
              net: "0.00%",
              day: "0.00%",
              isLoss: false,
            },
          ],
          { session }
        );
        console.log("New position created");
      }

   
      const orders = await OrdersModel.create(
        [
          {
            userId: req.userId,
            name: stockName,
            qty: quantity,
            price: purchasePrice,
            mode: "BUY",
          },
        ],
        { session }
      );

      createdOrder = orders[0];
    });

    return res.status(201).json({
      message:
        "Buy order placed. Holdings, positions, and orders updated successfully.",
      order: createdOrder,
    });
  } catch (error) {
    console.error("Create buy order error:", error);

    return res.status(500).json({
      message:
        "Unable to place buy order and update records. Please try again.",
    });
  } finally {
    if (session) {
      await session.endSession();
    }
  }
});


// ---------------- Run server ----------------
async function startServer() {
  try {
    if (!uri) {
      throw new Error("MONGO_URL is missing from the .env file.");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing from the .env file.");
    }

    await mongoose.connect(uri);

    console.log("MongoDB connected successfully.");

    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
