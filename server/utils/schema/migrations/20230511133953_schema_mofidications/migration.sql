-- DropForeignKey
ALTER TABLE "Auth" DROP CONSTRAINT "Auth_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "Google" DROP CONSTRAINT "Google_google_id_fkey";

-- DropForeignKey
ALTER TABLE "Pocket" DROP CONSTRAINT "Pocket_pocket_id_fkey";

-- DropForeignKey
ALTER TABLE "Reddit" DROP CONSTRAINT "Reddit_reddit_id_fkey";

-- DropForeignKey
ALTER TABLE "Twitter" DROP CONSTRAINT "Twitter_twitter_id_fkey";

-- DropIndex
DROP INDEX "Google_google_id_idx";

-- DropIndex
DROP INDEX "Pocket_pocket_id_idx";

-- DropIndex
DROP INDEX "Reddit_reddit_id_idx";

-- DropIndex
DROP INDEX "Twitter_twitter_id_idx";

-- CreateTable
CREATE TABLE "Chat" (
    "chat_id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "chat_history" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "chatSettingsChat_id" TEXT NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("chat_id")
);

-- CreateTable
CREATE TABLE "ChatSettings" (
    "llm_model" TEXT NOT NULL DEFAULT 'ChatGPT',
    "data_sources" TEXT[],
    "chat_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatSettings_pkey" PRIMARY KEY ("chat_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chat_chat_id_key" ON "Chat"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_profile_id_key" ON "Chat"("profile_id");

-- CreateIndex
CREATE INDEX "Chat_chat_id_profile_id_idx" ON "Chat"("chat_id", "profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChatSettings_chat_id_key" ON "ChatSettings"("chat_id");

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "User"("profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Google" ADD CONSTRAINT "Google_google_id_fkey" FOREIGN KEY ("google_id") REFERENCES "Auth"("profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reddit" ADD CONSTRAINT "Reddit_reddit_id_fkey" FOREIGN KEY ("reddit_id") REFERENCES "Auth"("profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Twitter" ADD CONSTRAINT "Twitter_twitter_id_fkey" FOREIGN KEY ("twitter_id") REFERENCES "Auth"("profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pocket" ADD CONSTRAINT "Pocket_pocket_id_fkey" FOREIGN KEY ("pocket_id") REFERENCES "Auth"("profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "User"("profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "User"("profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatSettings" ADD CONSTRAINT "ChatSettings_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE;
