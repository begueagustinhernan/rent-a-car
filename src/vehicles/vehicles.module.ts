import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { Vehicle } from './vehicle.entity';

@Module({
    imports: [
        // Esto es lo que le permite a Nest inyectar el repositorio de TypeORM en el servicio
        TypeOrmModule.forFeature([Vehicle])
    ],
    controllers: [VehiclesController],
    providers: [VehiclesService],
})
export class VehiclesModule { }