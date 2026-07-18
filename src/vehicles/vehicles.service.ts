import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VEHICLE_PRICE_RANGES } from './constants/price-ranges.constant';

@Injectable()
export class VehiclesService {
    constructor(
        @InjectRepository(Vehicle)
        private readonly vehicleRepository: Repository<Vehicle>
    ) { }

    async create(dto: CreateVehicleDto) {
        const { plate, type, basePricePerDay } = dto

        const existingVehicle = await this.vehicleRepository.findOneBy({ plate });
        if (existingVehicle) {
            throw new ConflictException(`Vehicle with plate ${plate} is already registered.`);
        }

        const range = VEHICLE_PRICE_RANGES[type];
        if (basePricePerDay < range.min || basePricePerDay > range.max) {
            throw new BadRequestException(
                `Price $${basePricePerDay} is invalid for category ${type}. Allowed range: [$${range.min} - $${range.max}].`
            );
        }

        const newVehicle = this.vehicleRepository.create(dto);
        return await this.vehicleRepository.save(newVehicle);
    }

    async findAll() {
        return await this.vehicleRepository.find();
    }

    async findOne(id: string) {
        const vehicle = await this.vehicleRepository.findOneBy({ id });

        if (!vehicle) {
            throw new NotFoundException(`Vehicle with ID ${id} was not found.`);
        }

        return vehicle;
    }

    async update(id: string, updateVehicleDto: UpdateVehicleDto) {
        const vehicle = await this.findOne(id);

        const finalType = updateVehicleDto.type || vehicle.type;
        const finalPrice = updateVehicleDto.basePricePerDay !== undefined ? updateVehicleDto.basePricePerDay : vehicle.basePricePerDay;

        const range = VEHICLE_PRICE_RANGES[finalType];

        if (finalPrice < range.min || finalPrice > range.max) {
            throw new BadRequestException(
                `Price $${finalPrice} is invalid for category ${finalType}. Allowed range: [$${range.min} - $${range.max}].`
            );
        }

        const updatedVehicle = this.vehicleRepository.merge(vehicle, updateVehicleDto);
        return await this.vehicleRepository.save(updatedVehicle);
    }

    async remove(id: string) {
        const vehicle = await this.findOne(id);
        await this.vehicleRepository.remove(vehicle);
    }
}
