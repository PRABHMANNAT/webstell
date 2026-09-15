CREATE TABLE `contact_enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`submission_id` text NOT NULL,
	`dedupe_hash` text NOT NULL,
	`kind` text NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`whatsapp` text,
	`business_name` text,
	`project_type` text NOT NULL,
	`project_goal` text NOT NULL,
	`budget_range` text,
	`target_date` text,
	`reference_links` text,
	`context` text,
	`notification_status` text DEFAULT 'pending' NOT NULL,
	`team_notified` text DEFAULT '0' NOT NULL,
	`customer_confirmed` text DEFAULT '0' NOT NULL,
	`last_error` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_contact_enquiries_submission_id` ON `contact_enquiries` (`submission_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_contact_enquiries_dedupe_hash` ON `contact_enquiries` (`dedupe_hash`);--> statement-breakpoint
CREATE INDEX `idx_contact_enquiries_created_at` ON `contact_enquiries` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_contact_enquiries_notification_status` ON `contact_enquiries` (`notification_status`);
--> statement-breakpoint
PRAGMA optimize;
