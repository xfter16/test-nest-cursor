import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('recommendations')
export class Recommendation {
  @PrimaryColumn({ type: 'varchar' })
  @ApiProperty()
  id: string;

  @Column({ length: 16, type: 'varchar' })
  @ApiPropertyOptional()
  from?: string;

  @Column({ length: 16, type: 'varchar' })
  @ApiProperty()
  to: string;

  @Column('varchar', { default: () => null })
  @ApiPropertyOptional()
  reason: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP(3)' })
  @ApiPropertyOptional()
  createdAt?: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP(3)', onUpdate: 'CURRENT_TIMESTAMP(3)'})
  @ApiPropertyOptional()
  updatedAt?: Date;

  @Column('timestamp', { default: () => null, nullable: true })
  @ApiPropertyOptional()
  deletedAt?: Date;
}