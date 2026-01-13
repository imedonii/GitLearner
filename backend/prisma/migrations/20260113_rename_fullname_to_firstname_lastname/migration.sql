-- Step 1: Add new columns with default values
ALTER TABLE "User" ADD COLUMN "firstName" TEXT NOT NULL DEFAULT '';
ALTER TABLE "User" ADD COLUMN "lastName" TEXT NOT NULL DEFAULT '';

-- Step 2: Copy data from fullName to firstName (split by first space)
UPDATE "User" SET 
    "firstName" = CASE 
        WHEN POSITION(' ' IN "fullName") > 0 
        THEN SUBSTRING("fullName" FROM 1 FOR POSITION(' ' IN "fullName") - 1)
        ELSE "fullName"
    END,
    "lastName" = CASE 
        WHEN POSITION(' ' IN "fullName") > 0 
        THEN SUBSTRING("fullName" FROM POSITION(' ' IN "fullName") + 1)
        ELSE ''
    END;

-- Step 3: Remove the default constraints
ALTER TABLE "User" ALTER COLUMN "firstName" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "lastName" DROP DEFAULT;

-- Step 4: Drop the old fullName column
ALTER TABLE "User" DROP COLUMN "fullName";
