-- AlterTable
CREATE SEQUENCE emailverification_id_seq;
ALTER TABLE "EmailVerification" ALTER COLUMN "id" SET DEFAULT nextval('emailverification_id_seq');
ALTER SEQUENCE emailverification_id_seq OWNED BY "EmailVerification"."id";
