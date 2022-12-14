import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670504533036 implements MigrationInterface {
    name = 'default1670504533036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rooms" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "videos" ("id" SERIAL NOT NULL, "title" text NOT NULL, "url" text NOT NULL, "room_id" integer, CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "videos" ADD CONSTRAINT "FK_64bb2d8544299bbde670698ac37" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE "subjects" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room_subject" ("room_id" integer NOT NULL, "subject_id" integer NOT NULL, CONSTRAINT "PK_6b3738a7b93c77fd6d9333b638a" PRIMARY KEY ("room_id", "subject_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f227421d2ef64ab086261ac07f" ON "room_subject" ("room_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_a05f10c497f5f7db3022664a6d" ON "room_subject" ("subject_id")`);
        await queryRunner.query(`ALTER TABLE "room_subject" ADD CONSTRAINT "FK_f227421d2ef64ab086261ac07fd" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "room_subject" ADD CONSTRAINT "FK_a05f10c497f5f7db3022664a6d6" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE "students" ("id" SERIAL NOT NULL, "name" text NOT NULL, "birth_date" date NOT NULL, "email" text NOT NULL, CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room_student" ("room_id" integer NOT NULL, "student_id" integer NOT NULL, CONSTRAINT "PK_bd609f65efbb36e78349434d5df" PRIMARY KEY ("room_id", "student_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_259163074fc4ac5e5cd8de34a6" ON "room_student" ("room_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_aeb9685847eeb3fd9cc60ce32c" ON "room_student" ("student_id") `);
        await queryRunner.query(`ALTER TABLE "room_student" ADD CONSTRAINT "FK_259163074fc4ac5e5cd8de34a62" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "room_student" ADD CONSTRAINT "FK_aeb9685847eeb3fd9cc60ce32c3" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_student" DROP CONSTRAINT "FK_aeb9685847eeb3fd9cc60ce32c3"`);
        await queryRunner.query(`ALTER TABLE "room_student" DROP CONSTRAINT "FK_259163074fc4ac5e5cd8de34a62"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aeb9685847eeb3fd9cc60ce32c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_259163074fc4ac5e5cd8de34a6"`);
        await queryRunner.query(`DROP TABLE "room_student"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`ALTER TABLE "room_subject" DROP CONSTRAINT "FK_a05f10c497f5f7db3022664a6d6"`);
        await queryRunner.query(`ALTER TABLE "room_subject" DROP CONSTRAINT "FK_f227421d2ef64ab086261ac07fd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a05f10c497f5f7db3022664a6d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f227421d2ef64ab086261ac07f"`);
        await queryRunner.query(`DROP TABLE "room_subject"`);
        await queryRunner.query(`DROP TABLE "subjects"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP CONSTRAINT "FK_64bb2d8544299bbde670698ac37"`);
        await queryRunner.query(`DROP TABLE "videos"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
    }

}
