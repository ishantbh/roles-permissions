import { relations } from 'drizzle-orm'
import {
  index,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

import { organization } from './organization'
import { user } from './user'

export const project = pgTable(
  'project',
  {
    id: uuid().primaryKey().defaultRandom(),
    orgId: text('org_id')
      .notNull()
      .references(() => organization.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    title: varchar({ length: 255 }).notNull(),
    description: text(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index('project_orgId_idx').on(table.orgId),
    index('project_userId_idx').on(table.userId),
  ],
)

export const projectRelations = relations(project, ({ one }) => ({
  organization: one(organization, {
    fields: [project.orgId],
    references: [organization.id],
  }),

  user: one(user, {
    fields: [project.userId],
    references: [user.id],
  }),
}))
