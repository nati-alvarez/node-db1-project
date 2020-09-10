const server = require("./api/server.js");

//routes
const accountRoutes = require("./accounts/accountRoutes");

const PORT = process.env.PORT || 5000;

server.use("/api/accounts", accountRoutes);

server.use((err, req, res, next)=>{
  res.status(500).json({
    message: "A server error occurred",
    error: err
  });
})

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});