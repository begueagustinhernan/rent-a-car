import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { VehicleType } from './enums/vehicle-type.enum';
import { VehicleStatus } from './enums/vehicle-status.enum';

@Entity('vehicles')
export class Vehicle {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Index({ unique: true })
    @Column({ type: 'varchar', length: 10 })
    plate!: string;

    @Column({ type: 'varchar', length: 50 })
    brand!: string

    @Column({ type: 'varchar', length: 50 })
    model!: string;

    @Column({ type: 'int' })
    year!: number

    @Column({
        type: 'enum',
        enum: VehicleType,
    })
    type!: VehicleType;

    @Column({
        type: 'enum',
        enum: VehicleStatus,
        default: VehicleStatus.AVAILABLE,
    })
    status!: VehicleStatus;

    @Column({ type: 'int', default: 0 })
    odometer!: number;

    @Column({ type: 'int', default: 0 })
    lastMaintenanceOdometer!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    basePricePerDay!: number;

    @Column({ type: 'boolean', default: true })
    isActive!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
