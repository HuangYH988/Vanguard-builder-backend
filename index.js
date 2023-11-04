const cors = require("cors");
const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");


require("dotenv").config();

const PORT = process.env.PORT || 2999;
const app = express();

const checkJwt = auth({
  audience: process.env.API_AUDIENCE,
  issuerBaseURL: process.env.API_ISSUERBASEURL,
  tokenSigningAlg: process.env.API_TOKEN_ALGORITHM,
});

// importing Routers
const DeckRouter = require("./routers/deckRouter");
const CardRouter = require("./routers/cardRouter");
const PlayerRouter = require("./routers/playerRouter");

// importing Controllers
const DeckController = require("./controllers/deckController");
const CardController = require("./controllers/cardController");
const PlayerController = require("./controllers/playerController");

// importing DB
const db = require("./db/models/index");
const { decks, cards, players } = db;

// initializing Controllers -> note the lowercase for the first word
const deckController = new DeckController(decks, cards);
const cardController = new CardController(cards);
const playerController = new PlayerController(players, decks);

// initializing Routers
const deckRouter = new DeckRouter(express, deckController, checkJwt).routes();
const cardRouter = new CardRouter(
  express,
  cardController,
  checkJwt
).routes();
const playerRouter = new PlayerRouter(express, playerController, checkJwt).routes();

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

// USING the routers
app.use("/deck", deckRouter);
app.use("/card", cardRouter);
app.use("/player", playerRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
