import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import express from "express";
import cookieParser from "cookie-parser";

export const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(
  cors({
    origin: process.env.FRONT_END_APP,
    credentials: true,
  })
);

app.use("/", routes());

app.get("/health", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.listen(port, () => {
  console.log(`[server]: server is listening at http://localhost:${port}/`);
  // swaggerDocs(app, port as number);
});
