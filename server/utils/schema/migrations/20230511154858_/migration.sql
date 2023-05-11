/*
  Warnings:

  - The primary key for the `Auth` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Document` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[auth_id]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[document_id]` on the table `Document` will be added. If there are existing duplicate values, this will fail.
  - The required column `auth_id` was added to the `Auth` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `document_id` was added to the `Document` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Auth" DROP CONSTRAINT "Auth_pkey",
ADD COLUMN     "auth_id" TEXT NOT NULL,
ADD CONSTRAINT "Auth_pkey" PRIMARY KEY ("auth_id");

-- AlterTable
ALTER TABLE "Document" DROP CONSTRAINT "Document_pkey",
ADD COLUMN     "document_id" TEXT NOT NULL,
ADD CONSTRAINT "Document_pkey" PRIMARY KEY ("document_id");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_auth_id_key" ON "Auth"("auth_id");

-- CreateIndex
CREATE UNIQUE INDEX "Document_document_id_key" ON "Document"("document_id");
