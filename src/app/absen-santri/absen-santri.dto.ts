import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateAbsenSantriDto {
  @IsNotEmpty()
  @IsNumber()
  santriId: number;

  @IsNotEmpty()
  @IsString()
  dariSurat: string;

  @IsNotEmpty()
  @IsString()
  sampaiSurat: string;

  @IsNotEmpty()
  @IsNumber()
  dariAyat: number;

  @IsNotEmpty()
  @IsNumber()
  sampaiAyat: number;

  @IsOptional()
  @IsString()
  keterangan?: string;
}
