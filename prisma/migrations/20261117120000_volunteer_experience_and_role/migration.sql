-- AlterTable
ALTER TABLE "Volunteer" ADD COLUMN     "experienceDomains" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "experienceDomainsOther" TEXT,
ADD COLUMN     "needs" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "needsOther" TEXT,
ADD COLUMN     "restrictions" TEXT,
ADD COLUMN     "roleVision" TEXT;
