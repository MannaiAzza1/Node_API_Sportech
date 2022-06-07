



require("./src/routes/auth.routes")(app);
require("./src/routes/stat.routes")(app);
require("./src/routes/challenge")(app);
require("./src/routes/coach.routes")(app);
require("./src/routes/competence.routes")(app);
require("./src/routes/place.routes")(app);
require("./src/routes/player.routes")(app);


const createServer = ()=>{
    const app = express();

    app.use(express.json());

    app.use (cookieParse())

    if (process.env.MODE_ENV === "developement"){
        app.use(morgan("dev"))

        app.use(cors())

        require("./src/routes/place.routes")(app);
        app.use(errorHandler)
        return app

}
}

module.exports={createServer}