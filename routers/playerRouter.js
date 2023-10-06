class playerRouter {
  constructor(express, controller) {
    this.express = express;
    this.controller = controller;
    //this.checkJwt = checkJwt;
  }
  routes() {
    const router = this.express.Router();
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get(
      "/:playerId",
      this.controller.getOneUser.bind(this.controller)
    );
    router.post("/", this.controller.postOneUser.bind(this.controller));
    router.put(
      "/:playerId",
      this.controller.putOneUser.bind(this.controller)
    );
    router.delete(
      "/:playerId",
      this.controller.deleteOneUser.bind(this.controller)
    );
    return router;
  }
}

module.exports = playerRouter;
