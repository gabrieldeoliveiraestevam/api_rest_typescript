import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670546785395 implements MigrationInterface {
    name = 'default1670546785395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "students" ("id" SERIAL NOT NULL, "name" text NOT NULL, "data_nascimento" date NOT NULL, CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room_student" ("room_id" integer NOT NULL, "student_id" integer NOT NULL, CONSTRAINT "PK_bd609f65efbb36e78349434d5df" PRIMARY KEY ("room_id", "student_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_259163074fc4ac5e5cd8de34a6" ON "room_student" ("room_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_aeb9685847eeb3fd9cc60ce32c" ON "room_student" ("student_id") `);
        await queryRunner.query(`ALTER TABLE "room_student" ADD CONSTRAINT "FK_259163074fc4ac5e5cd8de34a62" FOREIGN KEY ("room_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "room_student" ADD CONSTRAINT "FK_aeb9685847eeb3fd9cc60ce32c3" FOREIGN KEY ("student_id") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_student" DROP CONSTRAINT "FK_aeb9685847eeb3fd9cc60ce32c3"`);
        await queryRunner.query(`ALTER TABLE "room_student" DROP CONSTRAINT "FK_259163074fc4ac5e5cd8de34a62"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aeb9685847eeb3fd9cc60ce32c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_259163074fc4ac5e5cd8de34a6"`);
        await queryRunner.query(`DROP TABLE "room_student"`);
        await queryRunner.query(`DROP TABLE "students"`);
    }

}
