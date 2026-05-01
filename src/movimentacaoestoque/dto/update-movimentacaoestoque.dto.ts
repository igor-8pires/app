import { PartialType } from '@nestjs/mapped-types';
import { CreateMovimentacaoestoqueDto } from './create-movimentacaoestoque.dto';

export class UpdateMovimentacaoestoqueDto extends PartialType(CreateMovimentacaoestoqueDto) {}
