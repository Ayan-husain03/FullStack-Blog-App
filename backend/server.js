import app from "./src/app.js";

app.get("/", (req, res) => {
  res.send("hello world");
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
