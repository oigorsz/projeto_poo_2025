-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cidade" TEXT NOT NULL,
    "atividade" TEXT NOT NULL,
    "temp" REAL NOT NULL,
    "umidade" INTEGER NOT NULL DEFAULT 0,
    "vento" REAL NOT NULL DEFAULT 0.0,
    "descricao" TEXT NOT NULL DEFAULT 'Não informado',
    "status" BOOLEAN NOT NULL,
    "mensagem" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Card" ("atividade", "cidade", "createdAt", "id", "mensagem", "status", "temp", "updatedAt") SELECT "atividade", "cidade", "createdAt", "id", "mensagem", "status", "temp", "updatedAt" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
