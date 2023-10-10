class deckRouter {
  constructor(express, controller) {
    this.express = express;
    this.controller = controller;
    //this.checkJwt = checkJwt;
  }
  routes() {
    const router = this.express.Router();
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:deckId", this.controller.getOneDeck.bind(this.controller));
    router.get("/player", this.controller.getNameDeck.bind(this.controller));
    router.post("/", this.controller.postOneDeck.bind(this.controller));
    router.put("/:deckId", this.controller.putOneDeck.bind(this.controller));
    router.delete(
      "/:deckId",
      this.controller.deleteOneDeck.bind(this.controller)
    );
    return router;
  }
}

module.exports = deckRouter;
