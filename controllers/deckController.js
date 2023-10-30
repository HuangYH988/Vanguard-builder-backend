const Sequelize = require("sequelize");

class DeckController {
  constructor(model, model2) {
    this.model = model;
    this.PlayerModel = model2;
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

  async getOneDeck(req, res) {
    const { deckId } = req.params;
    try {
      const output = await this.model.findByPk(deckId);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
  async getPlayerDeck(req, res) {
    const { playerid } = req.params;
    try {
      const output = await this.model.findAll();
      const deckList=[]
      for (const deck in output){
        if (output[deck].player_id === playerid){
          deckList.push(output[deck])
        }
      }
      return res.json(deckList);
    } catch (err) {
      console.error(err); // Log the error for debugging
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async postOneDeck(req, res) {
    try {
      // Get the input data from the request body
      const { deck_name, player_id, ride_deck, triggers, main_deck } = req.body;

      const newDeck = await this.model.create({
        deck_name,
        player_id,
        ride_deck,
        triggers,
        main_deck,
        created_at: Sequelize.literal("CURRENT_TIMESTAMP"),
        updated_at: Sequelize.literal("CURRENT_TIMESTAMP"),
      });
      return res.json(newDeck);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
  async putOneDeck(req, res) {
    const { deckId } = req.params;
    try {
      const { deck_name, player_id, ride_deck, triggers, main_deck } = req.body;

      const existing = await this.model.findByPk(deckId);
      if (deck_name) {
        existing.deck_name = deck_name;
      }
      if (player_id) {
        existing.player_id = player_id;
      }
      if (ride_deck) {
        existing.ride_deck = ride_deck;
      }
      if (triggers) {
        existing.triggers = triggers;
      }
      if (main_deck) {
        existing.main_deck = main_deck;
      }

      existing.updated_at = Sequelize.literal("CURRENT_TIMESTAMP");
      await existing.save();
      return res.json(existing);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
  async deleteOneDeck(req, res) {
    const { deckId } = req.params;
    try {
      const existing = await this.model.findByPk(deckId);
      if (!existing) {
        return res.status(404).json({ error: true, msg: "Deck not found." });
      }
      await existing.destroy();

      return res.json({ success: true, msg: "Deck deleted successfully." });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}
module.exports = DeckController;
