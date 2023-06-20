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
CREATE TABLE "UserMetadata" (
    "profile_id" TEXT NOT NULL,
    "subscription_status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMetadata_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "Auth" (
    "auth_id" TEXT NOT NULL,
    "reddit_id" TEXT,
    "twitter_id" TEXT,
    "pocket_id" TEXT,
    "google_id" TEXT,
    "password_salt" TEXT,
    "notion_id" TEXT,
    "profile_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("auth_id")
);

-- CreateTable
CREATE TABLE "Notion" (
    "access_token" TEXT NOT NULL,
    "notion_id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "database_ids" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notion_pkey" PRIMARY KEY ("notion_id")
);

-- CreateTable
CREATE TABLE "Google" (
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "google_id" TEXT NOT NULL,
    "scope_authenticated" TEXT[],
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
CREATE TABLE "Document" (
    "document_id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("document_id")
);

-- CreateTable
CREATE TABLE "DocumentMetadata" (
    "document_id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "twitter_status_id" TEXT,
    "reddit_post_id" TEXT,
    "pocket_article_id" TEXT,
    "document_file_type" TEXT,
    "drive_document_id" TEXT,
    "keep_id" TEXT,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentMetadata_pkey" PRIMARY KEY ("document_id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "chat_id" TEXT NOT NULL,
    "chat_name" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "chat_array" JSONB[],
    "chat_history" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("chat_id")
);

-- CreateTable
CREATE TABLE "ChatPreferences" (
    "llm_model" TEXT NOT NULL DEFAULT 'ChatGPT',
    "data_sources" TEXT[] DEFAULT ARRAY['All']::TEXT[],
    "chat_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatPreferences_pkey" PRIMARY KEY ("chat_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_profile_id_key" ON "User"("profile_id");

-- CreateIndex
CREATE INDEX "User_profile_id_email_idx" ON "User"("profile_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "UserMetadata_profile_id_key" ON "UserMetadata"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_auth_id_key" ON "Auth"("auth_id");

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
CREATE UNIQUE INDEX "Auth_notion_id_key" ON "Auth"("notion_id");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_profile_id_key" ON "Auth"("profile_id");

-- CreateIndex
CREATE INDEX "Auth_profile_id_idx" ON "Auth"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Notion_access_token_key" ON "Notion"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "Notion_notion_id_key" ON "Notion"("notion_id");

-- CreateIndex
CREATE UNIQUE INDEX "Notion_workspace_id_key" ON "Notion"("workspace_id");

-- CreateIndex
CREATE UNIQUE INDEX "Google_access_token_key" ON "Google"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "Google_refresh_token_key" ON "Google"("refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "Google_google_id_key" ON "Google"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reddit_access_token_key" ON "Reddit"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "Reddit_refresh_token_key" ON "Reddit"("refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "Reddit_reddit_id_key" ON "Reddit"("reddit_id");

-- CreateIndex
CREATE UNIQUE INDEX "Twitter_access_token_key" ON "Twitter"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "Twitter_refresh_token_key" ON "Twitter"("refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "Twitter_twitter_id_key" ON "Twitter"("twitter_id");

-- CreateIndex
CREATE UNIQUE INDEX "Pocket_access_token_key" ON "Pocket"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "Pocket_pocket_id_key" ON "Pocket"("pocket_id");

-- CreateIndex
CREATE UNIQUE INDEX "Document_document_id_key" ON "Document"("document_id");

-- CreateIndex
CREATE INDEX "Document_profile_id_document_id_idx" ON "Document"("profile_id", "document_id");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentMetadata_document_id_key" ON "DocumentMetadata"("document_id");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_chat_id_key" ON "Chat"("chat_id");

-- CreateIndex
CREATE INDEX "Chat_chat_id_profile_id_idx" ON "Chat"("chat_id", "profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChatPreferences_chat_id_key" ON "ChatPreferences"("chat_id");

-- AddForeignKey
ALTER TABLE "UserMetadata" ADD CONSTRAINT "UserMetadata_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "User"("profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "User"("profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notion" ADD CONSTRAINT "Notion_notion_id_fkey" FOREIGN KEY ("notion_id") REFERENCES "Auth"("notion_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Google" ADD CONSTRAINT "Google_google_id_fkey" FOREIGN KEY ("google_id") REFERENCES "Auth"("google_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reddit" ADD CONSTRAINT "Reddit_reddit_id_fkey" FOREIGN KEY ("reddit_id") REFERENCES "Auth"("reddit_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Twitter" ADD CONSTRAINT "Twitter_twitter_id_fkey" FOREIGN KEY ("twitter_id") REFERENCES "Auth"("twitter_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pocket" ADD CONSTRAINT "Pocket_pocket_id_fkey" FOREIGN KEY ("pocket_id") REFERENCES "Auth"("pocket_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "User"("profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentMetadata" ADD CONSTRAINT "DocumentMetadata_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "Document"("document_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "User"("profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatPreferences" ADD CONSTRAINT "ChatPreferences_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("chat_id") ON DELETE CASCADE ON UPDATE CASCADE;
