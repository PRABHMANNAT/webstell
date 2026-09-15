import { index, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const contactEnquiries = sqliteTable(
  'contact_enquiries',
  {
    id: text('id').primaryKey(),
    submissionId: text('submission_id').notNull(),
    dedupeHash: text('dedupe_hash').notNull(),
    kind: text('kind', { enum: ['project_enquiry', 'call_request'] }).notNull(),
    name: text('name').notNull(),
    email: text('email'),
    whatsapp: text('whatsapp'),
    businessName: text('business_name'),
    projectType: text('project_type').notNull(),
    projectGoal: text('project_goal').notNull(),
    budgetRange: text('budget_range'),
    targetDate: text('target_date'),
    referenceLinks: text('reference_links'),
    context: text('context'),
    notificationStatus: text('notification_status', {
      enum: ['pending', 'sending', 'sent', 'failed'],
    })
      .notNull()
      .default('pending'),
    teamNotified: text('team_notified').notNull().default('0'),
    customerConfirmed: text('customer_confirmed').notNull().default('0'),
    lastError: text('last_error'),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
  },
  (table) => [
    uniqueIndex('idx_contact_enquiries_submission_id').on(table.submissionId),
    uniqueIndex('idx_contact_enquiries_dedupe_hash').on(table.dedupeHash),
    index('idx_contact_enquiries_created_at').on(table.createdAt),
    index('idx_contact_enquiries_notification_status').on(
      table.notificationStatus,
    ),
  ],
);
