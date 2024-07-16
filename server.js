const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const XLSX = require("xlsx");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

app.post("/submit", (req, res) => {
  const { name, mobile, email, message } = req.body;

  const filePath = "data.xlsx";

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    // Create a new workbook and worksheet if the file doesn't exist
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([], {
      header: ["Name", "Mobile Number", "Email Address", "Message"],
    });
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, filePath);
  }

  // Read the existing file
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  // Convert worksheet to JSON
  const data = XLSX.utils.sheet_to_json(worksheet);

  // Append new data
  data.push({
    Name: name,
    "Mobile Number": mobile,
    "Email Address": email,
    Message: message,
  });

  // Convert JSON back to worksheet with headers
  const newWorksheet = XLSX.utils.json_to_sheet(data, {
    header: ["Name", "Mobile Number", "Email Address", "Message"],
  });

  // Replace old worksheet with new one
  workbook.Sheets[workbook.SheetNames[0]] = newWorksheet;

  // Write the updated workbook to file
  XLSX.writeFile(workbook, filePath);

  res.send('Form submitted successfully!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
