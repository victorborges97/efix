-- CreateTable
CREATE TABLE "Suggestion" (
    "id" SERIAL NOT NULL,
    "errorCode" CHAR(6) NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Suggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evaluation" (
    "id" SERIAL NOT NULL,
    "errorCode" CHAR(6) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "clientCode" CHAR(6) NOT NULL,
    "evaluation" BOOLEAN NOT NULL,
    "comment" TEXT,

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Suggestion_errorCode_key" ON "Suggestion"("errorCode");

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_id_fkey" FOREIGN KEY ("id") REFERENCES "Suggestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
