import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670549067848 implements MigrationInterface {
    name = 'default1670549067848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_student" DROP CONSTRAINT "FK_259163074fc4ac5e5cd8de34a62"`);
        await queryRunner.query(`ALTER TABLE "room_student" DROP CONSTRAINT "FK_aeb9685847eeb3fd9cc60ce32c3"`);
        await queryRunner.query(`ALTER TABLE "room_subject" DROP CONSTRAINT "FK_f227421d2ef64ab086261ac07fd"`);
        await queryRunner.query(`ALTER TABLE "room_subject" DROP CONSTRAINT "FK_a05f10c497f5f7db3022664a6d6"`);
        await queryRunner.query(`ALTER TABLE "room_student" ADD CONSTRAINT "FK_aeb9685847eeb3fd9cc60ce32c3" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "room_student" ADD CONSTRAINT "FK_259163074fc4ac5e5cd8de34a62" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_subject" ADD CONSTRAINT "FK_a05f10c497f5f7db3022664a6d6" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "room_subject" ADD CONSTRAINT "FK_f227421d2ef64ab086261ac07fd" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_subject" DROP CONSTRAINT "FK_f227421d2ef64ab086261ac07fd"`);
        await queryRunner.query(`ALTER TABLE "room_subject" DROP CONSTRAINT "FK_a05f10c497f5f7db3022664a6d6"`);
        await queryRunner.query(`ALTER TABLE "room_student" DROP CONSTRAINT "FK_259163074fc4ac5e5cd8de34a62"`);
        await queryRunner.query(`ALTER TABLE "room_student" DROP CONSTRAINT "FK_aeb9685847eeb3fd9cc60ce32c3"`);
        await queryRunner.query(`ALTER TABLE "room_subject" ADD CONSTRAINT "FK_a05f10c497f5f7db3022664a6d6" FOREIGN KEY ("subject_id") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_subject" ADD CONSTRAINT "FK_f227421d2ef64ab086261ac07fd" FOREIGN KEY ("room_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "room_student" ADD CONSTRAINT "FK_aeb9685847eeb3fd9cc60ce32c3" FOREIGN KEY ("student_id") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_student" ADD CONSTRAINT "FK_259163074fc4ac5e5cd8de34a62" FOREIGN KEY ("room_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
