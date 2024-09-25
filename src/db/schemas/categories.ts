import {
  index,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    name: text("name").notNull(),
    color: varchar("color", { length: 7 }).notNull(),
    icon: text("icon").notNull(),
    type: text("type").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (categories) => {
    return {
      userIdIndex: index("categories_user_id_idx").on(categories.userId),
    };
  },
);

export const insertCategoriesSchema = createInsertSchema(categories, {
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, {
    message: "Color must be a valid HEX color code",
  }),
  icon: z.string().min(1, { message: "Icon is required" }),
  type: z.enum(["expense", "income"], {
    errorMap: () => ({ message: "Type must be either 'expense' or 'income'" }),
  }),
});

export const createCategorySchema = insertCategoriesSchema.omit({
  id: true,
  createdAt: true,
});

export const selectCategoriesSchema = createSelectSchema(categories);
