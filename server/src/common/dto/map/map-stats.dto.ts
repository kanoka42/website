import { MapStats} from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {IsDateString, IsInt, IsPositive,} from 'class-validator';
import {IsPositiveNumberString} from "@common/validators/is-positive-number-string.validator";
import {Exclude} from "class-transformer";

export class MapStatsDto implements MapStats {
    @ApiProperty()
    @IsPositive()
    id: number;
    
    @Exclude()
    mapID: number;
    
    @ApiProperty()
    @IsInt()
    reviews: number;
    
    @ApiProperty()
    @IsInt()
    downloads: number;
    
    @ApiProperty()
    @IsInt()
    subscriptions: number;
    
    @ApiProperty()
    @IsInt()
    plays: number;
    
    @ApiProperty()
    @IsInt()
    favorites: number;
    
    @ApiProperty()
    @IsInt()
    completions: number;
    
    @ApiProperty()
    @IsInt()
    uniqueCompletions: number;

    @ApiProperty()
    @IsPositiveNumberString()
    timePlayed: bigint;

    @ApiProperty()
    @IsPositiveNumberString()
    baseStatsID: bigint;

    @ApiProperty()
    @IsDateString()
    createdAt: Date;

    @ApiProperty()
    @IsDateString()
    updatedAt: Date;
}
