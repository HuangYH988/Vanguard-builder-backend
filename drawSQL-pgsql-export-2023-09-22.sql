CREATE TABLE "player"(
    "id" BIGINT NOT NULL,
    "Name" VARCHAR(255) NOT NULL,
    "deckId" BIGINT NOT NULL
);
ALTER TABLE
    "player" ADD PRIMARY KEY("id");
CREATE TABLE "card"(
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
    "card" ADD PRIMARY KEY("id");
CREATE TABLE "deck"(
    "id" BIGINT NOT NULL,
    "DeckName" VARCHAR(255) NOT NULL,
    "RideDeck" BIGINT NOT NULL,
    "cardId" BIGINT NOT NULL
);
ALTER TABLE
    "deck" ADD PRIMARY KEY("id");
ALTER TABLE
    "deck" ADD CONSTRAINT "deck_ridedeck_foreign" FOREIGN KEY("RideDeck") REFERENCES "card"("id");
ALTER TABLE
    "deck" ADD CONSTRAINT "deck_cardid_foreign" FOREIGN KEY("cardId") REFERENCES "card"("id");
ALTER TABLE
    "player" ADD CONSTRAINT "player_deckid_foreign" FOREIGN KEY("deckId") REFERENCES "deck"("id");