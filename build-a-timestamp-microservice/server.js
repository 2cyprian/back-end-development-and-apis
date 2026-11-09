import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Handle bare /api (no date) → current time
app.get('/api', (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString(),
  });
});

// Handle /api/:date
app.get('/api/:date', (req, res) => {
  const { date } = req.params;

  let parsedDate;

  // If the string is purely digits, treat as a Unix timestamp (ms)
  if (/^\d+$/.test(date)) {
    parsedDate = new Date(parseInt(date, 10));
  } else {
    parsedDate = new Date(date);
  }

  // Invalid date check
  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});
// Do not change code above this line

// Do not change code below this line


const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
