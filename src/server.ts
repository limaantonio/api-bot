import { app } from "./app";

const listerner = app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running in port: " + listerner.address().port);
});
