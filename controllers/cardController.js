const Sequelize = require("sequelize");

class CardController {
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
  async getOneCard(req, res) {
    const { cardId } = req.params;
    try {
      const output = await this.model.findByPk(cardId);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async postOneCard(req, res) {
    try {
      // Get the input data from the request body
      const {
        card_number,
        card_name,
        image_link,
        nation,
        card_type,
        grade,
        power,
        shield,
        trigger,
        is_sentinel,
        effect,
        card_advantage,
        counter_blast,
        counter_charge,
        soul_blast,
        soul_charge,
      } = req.body;

      const newCard = await this.model.create({
        card_number,
        card_name,
        image_link,
        nation,
        card_type,
        grade,
        power,
        shield,
        trigger,
        is_sentinel,
        effect,
        card_advantage,
        counter_blast,
        counter_charge,
        soul_blast,
        soul_charge,
        created_at: Sequelize.literal("CURRENT_TIMESTAMP"),
        updated_at: Sequelize.literal("CURRENT_TIMESTAMP"),
      });
      return res.json(newCard);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
  async putOneCard(req, res) {
    const { cardId } = req.params;
    try {
      const {
        card_number,
        card_name,
        image_link,
        nation,
        card_type,
        grade,
        power,
        shield,
        trigger,
        is_sentinel,
        effect,
        card_advantage,
        counter_blast,
        counter_charge,
        soul_blast,
        soul_charge,
      } = req.body;

      const existing = await this.model.findByPk(cardId);
      if (card_number) {
        existing.card_number = card_number;
      }
      if (card_name) {
        existing.card_name = card_name;
      }
      if (image_link) {
        existing.image_link = image_link;
      }
      if (nation) {
        existing.nation = nation;
      }
      if (card_type) {
        existing.card_type = card_type;
      }
      if (grade) {
        existing.grade = grade;
      }
      if ('power' in req.body) {
        existing.power = power;
      }
      if ('shield' in req.body) {
        existing.shield = shield;
      }
      if ('trigger' in req.body) {
        existing.trigger = trigger;
      }
      if ("is_sentinel" in req.body) {
        existing.is_sentinel = req.body.is_sentinel;
      }
      if ("effect" in req.body) {
        existing.effect = req.body.effect;
      }
      if ("card_advantage" in req.body) {
        existing.card_advantage = req.body.card_advantage;
      }
      if ("counter_blast" in req.body) {
        existing.counter_blast = req.body.counter_blast;
      }
      if ("counter_charge" in req.body) {
        existing.counter_charge = req.body.counter_charge;
      }
      if ("soul_blast" in req.body) {
        existing.soul_blast = req.body.soul_blast;
      }
      if ("soul_charge" in req.body) {
        existing.soul_charge = req.body.soul_charge;
      }
      existing.updated_at = Sequelize.literal("CURRENT_TIMESTAMP");
      await existing.save();
      return res.json(existing);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
  async deleteOneCard(req, res) {
    const { cardId } = req.params;
    try {
      const existing = await this.model.findByPk(cardId);
      if (!existing) {
        return res.status(404).json({ error: true, msg: "Card not found." });
      }
      await existing.destroy();

      return res.json({ success: true, msg: "Card deleted successfully." });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}
module.exports = CardController;
