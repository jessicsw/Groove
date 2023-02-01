/*
  Warnings:

  - You are about to drop the column `image` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image";
