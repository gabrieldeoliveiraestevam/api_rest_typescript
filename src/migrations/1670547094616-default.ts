import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670547094616 implements MigrationInterface {
    name = 'default1670547094616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" RENAME COLUMN "data_nascimento" TO "birth_date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" RENAME COLUMN "birth_date" TO "data_nascimento"`);
    }

}
