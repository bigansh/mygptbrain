/*
  Warnings:

  - You are about to drop the `Content` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_profile_id_fkey";

-- DropTable
DROP TABLE "Content";

-- CreateTable
CREATE TABLE "Document" (
    "source" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "url" TEXT,
    "profile_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("profile_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Document_profile_id_key" ON "Document"("profile_id");

-- CreateIndex
CREATE INDEX "Document_profile_id_idx" ON "Document"("profile_id");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "User"("profile_id") ON DELETE CASCADE ON UPDATE CASCADE;
