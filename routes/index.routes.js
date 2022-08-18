const app = require("express")();

const adminRoutes = require("./admin/index");
const product = require("./product/index");
const store = require("./store/index");
const subscription = require("./subscription/index");

app.use("/admin", adminRoutes);
app.use("/product", product);
app.use("/store", store);
app.use("/subscription", subscription);

module.exports = app;
