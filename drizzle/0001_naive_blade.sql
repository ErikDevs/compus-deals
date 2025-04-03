ALTER TABLE "users" DROP CONSTRAINT "users_phonenumber_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "phonenumber" SET DATA TYPE text;