/*
  Warnings:

  - A unique constraint covering the columns `[twitter_status_id]` on the table `DocumentMetadata` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reddit_post_id]` on the table `DocumentMetadata` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[drive_document_id]` on the table `DocumentMetadata` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DocumentMetadata_twitter_status_id_key" ON "DocumentMetadata"("twitter_status_id");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentMetadata_reddit_post_id_key" ON "DocumentMetadata"("reddit_post_id");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentMetadata_drive_document_id_key" ON "DocumentMetadata"("drive_document_id");
