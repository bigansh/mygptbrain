-- DropIndex
DROP INDEX "Document_profile_id_idx";

-- DropIndex
DROP INDEX "User_profile_id_idx";

-- CreateTable
CREATE TABLE "UserMetadata" (
    "profile_id" TEXT NOT NULL,
    "subscription_status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMetadata_pkey" PRIMARY KEY ("profile_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserMetadata_profile_id_key" ON "UserMetadata"("profile_id");

-- CreateIndex
CREATE INDEX "Document_profile_id_document_id_idx" ON "Document"("profile_id", "document_id");

-- CreateIndex
CREATE INDEX "User_profile_id_email_idx" ON "User"("profile_id", "email");

-- AddForeignKey
ALTER TABLE "UserMetadata" ADD CONSTRAINT "UserMetadata_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "User"("profile_id") ON DELETE CASCADE ON UPDATE CASCADE;
