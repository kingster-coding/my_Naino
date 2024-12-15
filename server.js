const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Static files serve karne ke liye
app.use(express.static(path.join(__dirname)));

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Server listen karega
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
