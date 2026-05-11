  import express from "express";
  import cors from "cors";
  import dotenv from "dotenv";

  dotenv.config();

  import router from "./Routes/router.js";

  const app = express();
  const PORT = process.env.PORT || 5000;

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Backend Running");
  });

  app.get("/test", (req, res) => {
    res.json({
      message: "Backend working",
      tokenExists: Boolean(process.env.TMDB_TOKEN),
    });
  });

  app.use("/", router);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });