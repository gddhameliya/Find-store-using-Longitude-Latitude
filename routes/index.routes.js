const app = require("express")();

const adminRoutes = require("./admin/index");
const product = require("./product/index");
const store = require("./store/index");

app.use("/admin", adminRoutes);
app.use("/product", product);
app.use("/store", store);

module.exports = app;
