-- CreateTable
CREATE TABLE "Habit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habit" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Habit_id_key" ON "Habit"("id");
