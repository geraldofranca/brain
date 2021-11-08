import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['cpf_cnpj'])

export class Producer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 14 })
  cpf_cnpj: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  producer_name: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  farm_name: string;

  @Column({ nullable: false, type: 'varchar', length: 80 })
  city: string;
  
  @Column({ nullable: false, type: 'varchar', length: 2 })
  state: string;

  @Column({ nullable: false, type: 'decimal', precision: 12, scale: 2 })
  total_area_farm: number;

  @Column({ nullable: false, type: 'decimal', precision: 12, scale: 2 })
  planting_area: number;

  @Column({ nullable: false, type: 'decimal', precision: 12, scale: 2 })
  vegetation_area: number;

  @Column({ nullable: false, type: 'json' })
  planted_culture: object;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
