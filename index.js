const cors = require("cors");
const express = require("express");
//const { auth } = require("express-oauth2-jwt-bearer");

require("dotenv").config();

const PORT = process.env.PORT || 2999;
const app = express();

// const checkJwt = auth({
//   audience: process.env.API_AUDIENCE,
//   issuerBaseURL: process.env.API_ISSUERBASEURL,
//   tokenSigningAlg: process.env.API_TOKEN_ALGORITHM,
// });

// importing Routers
const DeckRouter = require("./routers/deckRouter");
const CardRouter = require("./routers/cardRouter");
const UserRouter = require("./routers/userRouter");

// importing Controllers
const DeckController = require("./controllers/deckController");
const CardController = require("./controllers/cardController");
const UserController = require("./controllers/userController");

// importing DB
const db = require("./db/models/index");
const { deck, card, user, deck_card, user_deck } = db;

// initializing Controllers -> note the lowercase for the first word
const deckController = new DeckController(deck, card, deck_card);
const cardController = new CardController(card);
const userController = new UserController(user, deck, user_deck);

// initializing Routers
const deckRouter = new DeckRouter(express, taskController).routes();
const cardRouter = new CardRouter(
  express,
  projectController
  //checkJwt
).routes();
const userRouter = new UserRouter(express, userController).routes();

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

// USING the routers
app.use("/deck", deckRouter);
app.use("/card", cardRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
