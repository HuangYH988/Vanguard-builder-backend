CREATE TABLE "Player"(
    "id" BIGINT NOT NULL,
    "Name" VARCHAR(255) NOT NULL,
    "deckId" BIGINT NOT NULL
);
ALTER TABLE
    "Player" ADD PRIMARY KEY("id");
CREATE TABLE "Card"(
    "id" BIGINT NOT NULL,
    "CardNumber" VARCHAR(255) NOT NULL,
    "CardName" VARCHAR(255) NOT NULL,
    "Image" VARCHAR(255) NOT NULL,
    "Nation" VARCHAR(255) NOT NULL,
    "CardType" VARCHAR(255) NOT NULL,
    "Grade" BIGINT NOT NULL,
    "Power" BIGINT NULL,
    "Shield" BIGINT NULL,
    "Trigger" VARCHAR(255) NULL,
    "isSentinel" BOOLEAN NOT NULL,
    "Effect" TEXT NULL,
    "CardAdvantage" BIGINT NOT NULL
);
ALTER TABLE
    "Card" ADD PRIMARY KEY("id");
CREATE TABLE "Deck"(
    "id" BIGINT NOT NULL,
    "DeckName" VARCHAR(255) NOT NULL,
    "RideDeck" BIGINT NOT NULL,
    "cardId" BIGINT NOT NULL
);
ALTER TABLE
    "Deck" ADD PRIMARY KEY("id");
ALTER TABLE
    "Deck" ADD CONSTRAINT "deck_ridedeck_foreign" FOREIGN KEY("RideDeck") REFERENCES "Card"("id");
ALTER TABLE
    "Deck" ADD CONSTRAINT "deck_cardid_foreign" FOREIGN KEY("cardId") REFERENCES "Card"("id");
ALTER TABLE
    "Player" ADD CONSTRAINT "player_deckid_foreign" FOREIGN KEY("deckId") REFERENCES "Deck"("id");