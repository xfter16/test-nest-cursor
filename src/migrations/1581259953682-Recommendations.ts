import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class Recommendations1581259953682 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'recommendations',
            columns: [{
                name: 'id',
                type: 'varchar',
                isPrimary: true,
            }, {
                name: 'from',
                type: 'varchar',
                length: '16',
                isNullable: true,
            }, {
                name: 'to',
                type: 'varchar',
                length: '16',
                isNullable: false,
            }, {
                name: 'reason',
                type: 'varchar',
                length: '2048',
                isNullable: true,
            }, {
                name: 'createdAt',
                default: 'NOW()',
                type: 'timestamp',
                isNullable: false,
            }, {
                name: 'updatedAt',
                default: 'NOW()',
                type: 'timestamp',
                isNullable: false,
            }, {
                name: 'deletedAt',
                type: 'timestamp',
                isNullable: true,
            }],
        }), true);
        
        await queryRunner.createIndex("question", new TableIndex({
            name: "IDX_RECOMMENDATION_TO",
            columnNames: ["to"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('recommendations', true);
        await queryRunner.dropIndex("to", "IDX_RECOMMENDATION_TO");
    }

}
