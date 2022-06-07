const express = require("express");
const cors = require("cors");
const app = express();
const dbConfig = require("./src/config/db.config");
var ProgramRouter = require("./src/routes/program");
var EventRouter = require("./src/routes/event");
var SessionRouter = require("./src/routes/session");

var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const db = require("./src/models");
const Role = db.role;
if (process.env.NODE_ENV !== "test") {
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});
// routes
require("./src/routes/auth.routes")(app);
require("./src/routes/stat.routes")(app);
require("./src/routes/challenge")(app);
require("./src/routes/coach.routes")(app);
require("./src/routes/competence.routes")(app);
require("./src/routes/place.routes")(app);
//require("./src/routes/event")(app);
require("./src/routes/player.routes")(app);
//require("./src/routes/invite.routes")(app);
require("./src/routes/invite.routes")(app);
app.use(express.json());
app.use("/program", ProgramRouter);
app.use("/event", EventRouter);
app.use("/session", SessionRouter);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
function initial() {
  
} 

module.exports={app}

