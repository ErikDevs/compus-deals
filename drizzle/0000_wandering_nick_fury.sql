CREATE TYPE "public"."list_availability" AS ENUM('available', 'sold');--> statement-breakpoint
CREATE TYPE "public"."list_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"phonenumber" varchar(10) NOT NULL,
	"campus_name" varchar(255) NOT NULL,
	"password" varchar(10) NOT NULL,
	"student_photo" text NOT NULL,
	"location" varchar(255) NOT NULL,
	"status" "status" DEFAULT 'pending',
	"role" "role" DEFAULT 'user',
	"las_activity_date" date DEFAULT now(),
	"createdAt" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phonenumber_unique" UNIQUE("phonenumber"),
	CONSTRAINT "users_campus_name_unique" UNIQUE("campus_name")
);
