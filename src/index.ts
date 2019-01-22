import "reflect-metadata";
import { createConnection } from "typeorm";
import { Request, Response } from "express";
import * as express from "express";
import * as fs from "fs";
import * as https from "https";
import * as http from "http";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes";

require("dotenv").load();
var PORT = process.env.PORT || 8080;

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection()
    .then(async connection => {
        // set up analytics
        var ua = require("universal-analytics");
        var visitor = ua(process.env.GA_TRACKING_ID);
        visitor.pageview("/").send();

        // create express app
        const app = express();
        app.use(bodyParser.json());

        // register all application routes
        AppRoutes.forEach(route => {
            app[route.method](
                route.path,
                (request: Request, response: Response, next: Function) => {
                    route
                        .action(request, response)
                        .then(() => next)
                        .catch(err => next(err));
                }
            );
        });

        app.use("/", express.static("./client"));

        app.listen(PORT, () => {
            console.log(
                `Express application is up and running on http://localhost:${PORT}`
            );
        });

        if (process.env.NODE_ENV) {
            // allow https connections
            const privateKey = fs.readFileSync(
                "/etc/letsencrypt/live/${process.env.HOST_NAME}/privkey.pem",
                "utf8"
            );
            const certificate = fs.readFileSync(
                "/etc/letsencrypt/live/${process.env.HOST_NAME}/cert.pem",
                "utf8"
            );
            const ca = fs.readFileSync(
                "/etc/letsencrypt/live/${process.env.HOST_NAME}/chain.pem",
                "utf8"
            );

            const credentials = {
                key: privateKey,
                cert: certificate,
                ca: ca
            };

            // start both http and https servers
            const httpServer = http.createServer(app);
            const httpsServer = https.createServer(credentials, app);
            httpServer.listen(80, () => {
                console.log("HTTP Server running on port 80");
            });
            httpsServer.listen(443, () => {
                console.log("HTTPS Server running on port 443");
            });
        }
    })
    .catch(error => console.log("TypeORM connection error: ", error));
