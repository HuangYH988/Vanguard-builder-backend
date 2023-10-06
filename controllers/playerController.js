const Sequelize = require("sequelize");

class PlayerController {
  constructor(model) {
    this.model = model;
  }

  // Retrieve all tasks
  async getAll(req, res) {
    try {
      const output = await this.model.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
  async getOneUser(req, res) {
    const { playerId } = req.params;
    try {
      const output = await this.model.findByPk(playerId);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
  async postOneUser(req, res) {
    try {
      // Get the input data from the request body
      const { player_name, player_email } = req.body;

      const newPlayer = await this.model.create({
        player_name,
        player_email,
        created_at: Sequelize.literal("CURRENT_TIMESTAMP"),
        updated_at: Sequelize.literal("CURRENT_TIMESTAMP"),
      });
      return res.json(newPlayer);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
  async putOneUser(req, res) {
    const { playerId } = req.params;
    try {
      const { player_name, player_email } = req.body;

      const existing = await this.model.findByPk(playerId);
      if (player_name) {
        existing.player_name = player_name;
      }
      if (player_email) {
        existing.player_email = player_email;
      }

      existing.updated_at = Sequelize.literal("CURRENT_TIMESTAMP");
      await existing.save();
      return res.json(existing);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
  async deleteOneUser(req, res) {
    const { playerId } = req.params;
    try {
      const existing = await this.model.findByPk(playerId);
      if (!existing) {
        return res.status(404).json({ error: true, msg: "Player not found." });
      }
      await existing.destroy();

      return res.json({ success: true, msg: "Player deleted successfully." });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}
module.exports = PlayerController;
