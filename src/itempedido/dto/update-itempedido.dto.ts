import { PartialType } from '@nestjs/mapped-types';
import { CreateItempedidoDto } from './create-itempedido.dto';

export class UpdateItempedidoDto extends PartialType(CreateItempedidoDto) {}
