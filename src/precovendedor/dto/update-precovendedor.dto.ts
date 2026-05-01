import { PartialType } from '@nestjs/mapped-types';
import { CreatePrecovendedorDto } from './create-precovendedor.dto';

export class UpdatePrecovendedorDto extends PartialType(CreatePrecovendedorDto) {}
