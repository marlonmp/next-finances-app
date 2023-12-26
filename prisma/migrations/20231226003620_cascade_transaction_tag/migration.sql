-- DropForeignKey
ALTER TABLE "transaction_tag" DROP CONSTRAINT "transaction_tag_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction_tag" DROP CONSTRAINT "transaction_tag_transaction_id_fkey";

-- AddForeignKey
ALTER TABLE "transaction_tag" ADD CONSTRAINT "transaction_tag_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_tag" ADD CONSTRAINT "transaction_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
