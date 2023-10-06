class cardRouter {
  constructor(express, controller) {
    this.express = express;
    this.controller = controller;
    //this.checkJwt = checkJwt;
  }
  routes() {
    const router = this.express.Router();
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:cardId", this.controller.getOneCard.bind(this.controller));
    router.post("/", this.controller.postOneCard.bind(this.controller));
    router.put("/:cardId", this.controller.putOneCard.bind(this.controller));
    router.delete(
      "/:cardId",
      this.controller.deleteOneCard.bind(this.controller)
    );
    return router;
  }
}

module.exports = cardRouter;
