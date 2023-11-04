const Sequelize = require("sequelize");
const { createCanvas, loadImage } = require("canvas");

class DeckController {
  constructor(model, model2) {
    this.model = model;
    this.cardModel = model2;
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
      const deckList = [];
      for (const deck in output) {
        if (output[deck].player_id === playerid) {
          deckList.push(output[deck]);
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

  // New method to generate and serve the combined image for a deck
  async generateDeckImage(req, res) {
    const { deckId } = req.params;

    try {
      const deck = await this.model.findByPk(deckId);

      if (!deck) {
        return res.status(404).json({ error: true, msg: "Deck not found." });
      }
      const width = 80;
      const height = 120;
      
      const { ride_deck, triggers, main_deck } = deck; // Assuming main_deck contains card IDs

      const canvas = createCanvas(width * 10 + 15, height * 5 + 10); // Adjust the canvas size as needed
      const ctx = canvas.getContext("2d");

      ride_deck.map(async (cardId, index) => {
        try {
          const card = await this.cardModel.findByPk(cardId);
          if (card) {
            const imageUrl = card.image_link;
            const image = await loadImage(imageUrl);
            // Calculate the position for the image
            const x = index * (width + 2);
            const y = 1;

            // Set the red border properties
            ctx.strokeStyle = "red"; // Set the border color to red
            ctx.lineWidth = 1; // Set the border thickness

            // Draw the red border
            ctx.strokeRect(x, y, width, height);

            // Draw the image inside the border
            ctx.drawImage(image, x, y, width, height);
            //ctx.drawImage(image, index * width, 0, width, height);
          }
        } catch (err) {
          return res.status(400).json({ error: true, msg: err.message });
        }
      });
      
      triggers.map(async (cardId, index) => {
        let row = 0;
        try {
          const card = await this.cardModel.findByPk(cardId);
          if (card) {
            const imageUrl = card.image_link;
            const image = await loadImage(imageUrl);

            // Calculate the position for the image
            let x = 4 * (width + 2) + index * width;        
            while (x+width > 815) {
              x = x - 800;
              row++;
            }
            const y = row * height;

            // Draw the image inside the border
            ctx.drawImage(image, x, y, width, height);
            
          }
        } catch (err) {
          return res.status(400).json({ error: true, msg: err.message });
        }
      });

      const imagePromises3 = main_deck.map(async (cardId, index) => {
        let row = 2;
        try {
          const card = await this.cardModel.findByPk(cardId);
          if (card) {
            const imageUrl = card.image_link;
            const image = await loadImage(imageUrl);

            // Calculate the position for the image
            let x = index * width;        
            while (x+width > 815) {
              x = x - 800;
              row++;
            }
            const y = row * height;

            // Draw the image inside the border
            ctx.drawImage(image, x, y, width, height);
            
          }
        } catch (err) {
          return res.status(400).json({ error: true, msg: err.message });
        }
      });

      await Promise.all(imagePromises3);

      // Set the response headers to indicate an image file
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="deck-image.png"'
      );
      res.setHeader("Content-Type", "image/png");

      // Stream the image directly to the response
      const buffer = canvas.toBuffer("image/png");
      res.end(buffer); // This sends the image data to the client
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}
module.exports = DeckController;
