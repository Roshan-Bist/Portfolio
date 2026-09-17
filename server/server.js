const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const path = require("path");
const app = express();
const connectDB = require("./Database/connectDb");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const articleRoutes = require("./routes/articleRoutes");
const cors = require('cors');

app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/articles", articleRoutes);

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.use(cors({
    origin: "https://your-frontend.vercel.app" // add this after step 4
  }));

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});