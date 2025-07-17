CREATE TABLE "poll_options" (
	"id" serial PRIMARY KEY NOT NULL,
	"poll_id" integer NOT NULL,
	"text" varchar(255) NOT NULL,
	"vote_count" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "polls" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(512) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "polls_title_unique" UNIQUE("title")
);
--> statement-breakpoint
ALTER TABLE "poll_options" ADD CONSTRAINT "poll_options_poll_id_polls_id_fk" FOREIGN KEY ("poll_id") REFERENCES "public"."polls"("id") ON DELETE cascade ON UPDATE no action;