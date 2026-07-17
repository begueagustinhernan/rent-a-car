import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
    constructor(
        @InjectRepository(Vehicle)
        private readonly vehicleRepository: Repository<Vehicle>
    ) { }

    async create(dto: CreateVehicleDto) {
        const { plate } = dto

        const existingVehicle = await this.vehicleRepository.findOneBy({ plate });
        if (existingVehicle) {
            throw new ConflictException(`Vehicle with plate ${plate} is already registered.`);
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

        const updatedVehicle = this.vehicleRepository.merge(vehicle, updateVehicleDto);
        return await this.vehicleRepository.save(updatedVehicle);
    }

    async remove(id: string) {
        const vehicle = await this.findOne(id);
        await this.vehicleRepository.remove(vehicle);
    }
}
