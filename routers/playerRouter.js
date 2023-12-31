class playerRouter {
  constructor(express, controller, checkJwt) {
    this.express = express;
    this.controller = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    const router = this.express.Router();
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:playerId", this.controller.getOneUser.bind(this.controller));
    router.post(
      "/",
      this.checkJwt,
      this.controller.postOneUser.bind(this.controller)
    );
    router.put(
      "/:playerId",
      this.checkJwt,
      this.controller.putOneUser.bind(this.controller)
    );
    router.delete(
      "/:playerId",
      //this.checkJwt,
      this.controller.deleteOneUser.bind(this.controller)
    );
    return router;
  }
}

module.exports = playerRouter;
