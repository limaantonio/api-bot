import { app } from "./app";

const HOST = "0.0.0.0";
const PORT = 3000;

// const listerner = app.listen(process.env.PORT || 3333, HOST, function () {
//   console.log("Server is running in port: " + listerner.address().port);
// });

app.listen(PORT, HOST);
