/*
  Warnings:

  - You are about to drop the column `embeddings` on the `Vector` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profile_id]` on the table `Vector` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chunk` to the `Vector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chunk_source` to the `Vector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_id` to the `Vector` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Vector_document_id_vector_id_idx";

-- AlterTable
ALTER TABLE "Vector" DROP COLUMN "embeddings",
ADD COLUMN     "chunk" TEXT NOT NULL,
ADD COLUMN     "chunk_source" TEXT NOT NULL,
ADD COLUMN     "embedding" vector(1536),
ADD COLUMN     "profile_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Vector_profile_id_key" ON "Vector"("profile_id");

-- CreateIndex
CREATE INDEX "Vector_document_id_profile_id_idx" ON "Vector"("document_id", "profile_id");
