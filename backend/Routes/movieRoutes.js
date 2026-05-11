import express from "express";
import axios from "axios";

const router = express.Router();

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

const getTmdbConfig = () => ({
  headers: {
    Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
  },
});

const handleError = (res, error, message) => {

  console.log("ERROR NAME:", error.name);
  console.log("ERROR CODE:", error.code);
  console.log("ERROR MESSAGE:", error.message);
  console.log("ERROR RESPONSE:", error.response?.data);
  console.log("ERROR CAUSE:", error.cause);

  return res.status(500).json({
    message,
    error: {
      name: error.name || null,
      code: error.code || null,
      message: error.message || null,
      response: error.response?.data || null,
      cause: error.cause?.message || null,
    },
  });
};


router.get("/trending/all/day", async (req, res) => {
  try {
    const { page = 1 } = req.query;

    const response = await tmdbApi.get(
      "/trending/all/day",
      {
        ...getTmdbConfig(),
        params: { page },
      }
    );

    res.json(response.data);

  } catch (error) {
    handleError(res, error, "Failed to fetch trending movies");
  }
});


router.get("/search/multi", async (req, res) => {
  try {

    const { query, page = 1 } = req.query;

    const response = await tmdbApi.get(
      "/search/multi",
      {
        ...getTmdbConfig(),
        params: {
          query,
          page,
        },
      }
    );

    res.json(response.data);

  } catch (error) {
    handleError(res, error, "Search failed");
  }
});


router.get("/:type/:id/videos", async (req, res) => {
  try {

    const { type, id } = req.params;

    const response = await tmdbApi.get(
      `/${type}/${id}/videos`,
      getTmdbConfig()
    );

    res.json(response.data);

  } catch (error) {
    handleError(res, error, "Failed to fetch videos");
  }
});


// Movie Images
router.get("/:type/:id/images", async (req, res) => {
  try {

    const { type, id } = req.params;

    const response = await tmdbApi.get(
      `/${type}/${id}/images`,
      getTmdbConfig()
    );

    res.json(response.data);

  } catch (error) {
    handleError(res, error, "Failed to fetch images");
  }
});


// Similar Movies
router.get("/:type/:id/similar", async (req, res) => {
  try {

    const { type, id } = req.params;

    const response = await tmdbApi.get(
      `/${type}/${id}/similar`,
      getTmdbConfig()
    );

    res.json(response.data);

  } catch (error) {
    handleError(res, error, "Failed to fetch similar movies");
  }
});


// Movie Details
router.get("/:type/:id", async (req, res) => {
  try {

    const { type, id } = req.params;

    const response = await tmdbApi.get(
      `/${type}/${id}`,
      getTmdbConfig()
    );

    res.json(response.data);

  } catch (error) {
    handleError(res, error, "Failed to fetch details");
  }
});


// Popular / Top Rated / Upcoming
router.get("/:type/:category", async (req, res) => {
  try {

    const { type, category } = req.params;
    const { page = 1 } = req.query;

    const response = await tmdbApi.get(
      `/${type}/${category}`,
      {
        ...getTmdbConfig(),
        params: { page },
      }
    );

    res.json(response.data);

  } catch (error) {
    handleError(res, error, "Failed to fetch movies");
  }
});

export default router;