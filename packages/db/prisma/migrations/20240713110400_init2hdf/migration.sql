-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "address" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "age" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "clinic" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "days" TEXT[],
ADD COLUMN     "gender" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "image" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "offline" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "online" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "phoneNumber" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "specialisation" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "time" TEXT[],
ADD COLUMN     "yearOfExp" TEXT NOT NULL DEFAULT '';
