ALTER TABLE "articles" DROP CONSTRAINT "articles_author_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "neon_auth"."user"("id") ON DELETE cascade ON UPDATE no action;