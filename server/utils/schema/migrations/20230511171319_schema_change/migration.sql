/*
  Warnings:

  - You are about to drop the `ChatSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- DropForeignKey
ALTER TABLE "ChatSettings" DROP CONSTRAINT "ChatSettings_chat_id_fkey";

-- DropTable
DROP TABLE "ChatSettings";

-- CreateTable
CREATE TABLE "Vector" (
    "vector_id" TEXT NOT NULL,
    "document_id" TEXT NOT NULL,
    "embeddings" vector(3) NOT NULL,

    CONSTRAINT "Vector_pkey" PRIMARY KEY ("vector_id")
);

-- CreateTable
CREATE TABLE "ChatPreferences" (
    "llm_model" TEXT NOT NULL DEFAULT 'ChatGPT',
    "data_sources" TEXT[],
    "chat_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatPreferences_pkey" PRIMARY KEY ("chat_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vector_vector_id_key" ON "Vector"("vector_id");

-- CreateIndex
CREATE UNIQUE INDEX "Vector_document_id_key" ON "Vector"("document_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChatPreferences_chat_id_key" ON "ChatPreferences"("chat_id");

-- AddForeignKey
ALTER TABLE "ChatPreferences" ADD CONSTRAINT "ChatPreferences_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE;
