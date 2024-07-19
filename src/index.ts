import express from "express";
import "dotenv/config";
import routes from "./routes";
import cookieParser from "cookie-parser";
import morgan from "morgan";

export const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use("/", routes());

app.get("/health", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.listen(port, () => {
  console.log(`[server]: server is listening at http://localhost:${port}/`);
  // swaggerDocs(app, port as number);
});
