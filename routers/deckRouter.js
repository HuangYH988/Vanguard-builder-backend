class deckRouter {
  constructor(express, controller, checkJwt) {
    this.express = express;
    this.controller = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    const router = this.express.Router();
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get(
      "/byID/:deckId",
      this.controller.getOneDeck.bind(this.controller)
    );
    router.get(
      "/byPlayer/:playerid",
      this.controller.getPlayerDeck.bind(this.controller)
    );
    router.post(
      "/",
      this.checkJwt,
      this.controller.postOneDeck.bind(this.controller)
    );
    router.put(
      "/:deckId",
      this.checkJwt,
      this.controller.putOneDeck.bind(this.controller)
    );
    router.delete(
      "/:deckId",
      this.checkJwt,
      this.controller.deleteOneDeck.bind(this.controller)
    );
    router.get("/getImage/:deckId", this.controller.generateDeckImage.bind(this.controller))
    return router;
  }
}

module.exports = deckRouter;
