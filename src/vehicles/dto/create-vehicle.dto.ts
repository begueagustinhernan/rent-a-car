import { IsEnum, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { VehicleType } from '../enums/vehicle-type.enum';
import { VehicleStatus } from '../enums/vehicle-status.enum';
import { min } from 'rxjs';

export class CreateVehicleDto {
    @IsString()
    @IsNotEmpty()
    plate!: string;

    @IsString()
    @IsNotEmpty()
    brand!: string;

    @IsString()
    @IsNotEmpty()
    model!: string;

    @IsInt()
    @Min(1900)
    @Max(new Date().getFullYear() + 1)
    year!: number;

    @IsEnum(VehicleType)
    type!: VehicleType;

    @IsEnum(VehicleStatus)
    status!: VehicleStatus;
}