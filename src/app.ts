import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundHandler from "./app/middlewares/notFoundHandler";
import router from "./app/routes";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Travel Buddy Matching server is working fine",
  });
});

app.use("/api", router);

app.use(globalErrorHandler);

app.use(notFoundHandler);

export default app;
