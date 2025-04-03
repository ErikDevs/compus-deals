import {
  date,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", [
  "pending",
  "approved",
  "rejected",
]);
export const ROLE_ENUM = pgEnum("role", ["user", "admin"]);
export const LIST_ENUM = pgEnum("list_status", [
  "pending",
  "approved",
  "rejected",
]);
export const LIST_AVAILABILITY = pgEnum("list_availability", [
  "available",
  "sold",
]);

export const usersTable = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  phoneNumber: text("phonenumber").notNull(),
  campusName: varchar("campus_name", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  profilePhoto: text("student_photo").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  status: STATUS_ENUM("status").default("pending"),
  role: ROLE_ENUM("role").default("user"),
  lastAvativityDate: date("las_activity_date").defaultNow(),
  createAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
});
