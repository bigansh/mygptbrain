-- DropForeignKey
ALTER TABLE "Google" DROP CONSTRAINT "Google_google_id_fkey";

-- DropForeignKey
ALTER TABLE "Pocket" DROP CONSTRAINT "Pocket_pocket_id_fkey";

-- DropForeignKey
ALTER TABLE "Reddit" DROP CONSTRAINT "Reddit_reddit_id_fkey";

-- DropForeignKey
ALTER TABLE "Twitter" DROP CONSTRAINT "Twitter_twitter_id_fkey";

-- AddForeignKey
ALTER TABLE "Google" ADD CONSTRAINT "Google_google_id_fkey" FOREIGN KEY ("google_id") REFERENCES "Auth"("google_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reddit" ADD CONSTRAINT "Reddit_reddit_id_fkey" FOREIGN KEY ("reddit_id") REFERENCES "Auth"("reddit_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Twitter" ADD CONSTRAINT "Twitter_twitter_id_fkey" FOREIGN KEY ("twitter_id") REFERENCES "Auth"("twitter_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pocket" ADD CONSTRAINT "Pocket_pocket_id_fkey" FOREIGN KEY ("pocket_id") REFERENCES "Auth"("pocket_id") ON DELETE CASCADE ON UPDATE CASCADE;
