-- AlterTable
ALTER TABLE "Artist" ALTER COLUMN "image" SET DEFAULT 'https://picsum.photos/400?random';

-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "image" TEXT NOT NULL DEFAULT 'https://picsum.photos/400?random';

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "image" TEXT NOT NULL DEFAULT 'https://picsum.photos/400?random',
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT NOT NULL DEFAULT 'https://picsum.photos/400?random';

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
