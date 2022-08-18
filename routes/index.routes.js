const app = require("express")();

const adminRoutes = require("./admin/index");
const product = require("./product/index");
const store = require("./store/index");
const subscription = require("./subscription/index");
const purchase = require("./purchase/index");

app.use("/admin", adminRoutes);
app.use("/product", product);
app.use("/store", store);
app.use("/subscription", subscription);
app.use("/purchase", purchase);

module.exports = app;
