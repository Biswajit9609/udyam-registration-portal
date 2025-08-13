-- CreateTable
CREATE TABLE "public"."Submission" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aadhaarNumber" TEXT NOT NULL,
    "entrepreneurName" TEXT NOT NULL,
    "organisationType" TEXT NOT NULL,
    "panNumber" TEXT NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Submission_aadhaarNumber_key" ON "public"."Submission"("aadhaarNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Submission_panNumber_key" ON "public"."Submission"("panNumber");
