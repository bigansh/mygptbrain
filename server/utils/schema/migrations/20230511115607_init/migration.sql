-- CreateTable
CREATE TABLE "User" (
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "Auth" (
    "reddit_id" TEXT,
    "twitter_id" TEXT,
    "pocket_id" TEXT,
    "google_id" TEXT,
    "password_salt" TEXT,
    "profile_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "Google" (
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "google_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Google_pkey" PRIMARY KEY ("google_id")
);

-- CreateTable
CREATE TABLE "Reddit" (
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "reddit_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reddit_pkey" PRIMARY KEY ("reddit_id")
);

-- CreateTable
CREATE TABLE "Twitter" (
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "twitter_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Twitter_pkey" PRIMARY KEY ("twitter_id")
);

-- CreateTable
CREATE TABLE "Pocket" (
    "access_token" TEXT NOT NULL,
    "pocket_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pocket_pkey" PRIMARY KEY ("pocket_id")
);

-- CreateTable
CREATE TABLE "Content" (
    "source" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "url" TEXT,
    "profile_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("profile_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_profile_id_key" ON "User"("profile_id");

-- CreateIndex
CREATE INDEX "User_profile_id_idx" ON "User"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_reddit_id_key" ON "Auth"("reddit_id");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_twitter_id_key" ON "Auth"("twitter_id");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_pocket_id_key" ON "Auth"("pocket_id");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_google_id_key" ON "Auth"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_password_salt_key" ON "Auth"("password_salt");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_profile_id_key" ON "Auth"("profile_id");

-- CreateIndex
CREATE INDEX "Auth_profile_id_idx" ON "Auth"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Google_access_token_key" ON "Google"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "Google_refresh_token_key" ON "Google"("refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "Google_google_id_key" ON "Google"("google_id");

-- CreateIndex
CREATE INDEX "Google_google_id_idx" ON "Google"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reddit_access_token_key" ON "Reddit"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "Reddit_refresh_token_key" ON "Reddit"("refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "Reddit_reddit_id_key" ON "Reddit"("reddit_id");

-- CreateIndex
CREATE INDEX "Reddit_reddit_id_idx" ON "Reddit"("reddit_id");

-- CreateIndex
CREATE UNIQUE INDEX "Twitter_access_token_key" ON "Twitter"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "Twitter_refresh_token_key" ON "Twitter"("refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "Twitter_twitter_id_key" ON "Twitter"("twitter_id");

-- CreateIndex
CREATE INDEX "Twitter_twitter_id_idx" ON "Twitter"("twitter_id");

-- CreateIndex
CREATE UNIQUE INDEX "Pocket_access_token_key" ON "Pocket"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "Pocket_pocket_id_key" ON "Pocket"("pocket_id");

-- CreateIndex
CREATE INDEX "Pocket_pocket_id_idx" ON "Pocket"("pocket_id");

-- CreateIndex
CREATE UNIQUE INDEX "Content_profile_id_key" ON "Content"("profile_id");

-- CreateIndex
CREATE INDEX "Content_profile_id_idx" ON "Content"("profile_id");

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "User"("profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Google" ADD CONSTRAINT "Google_google_id_fkey" FOREIGN KEY ("google_id") REFERENCES "Auth"("profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reddit" ADD CONSTRAINT "Reddit_reddit_id_fkey" FOREIGN KEY ("reddit_id") REFERENCES "Auth"("profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Twitter" ADD CONSTRAINT "Twitter_twitter_id_fkey" FOREIGN KEY ("twitter_id") REFERENCES "Auth"("profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pocket" ADD CONSTRAINT "Pocket_pocket_id_fkey" FOREIGN KEY ("pocket_id") REFERENCES "Auth"("profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "User"("profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;
