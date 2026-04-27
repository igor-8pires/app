export class CreateProdutoDto {
    nome!: string;
    sku!: string;
    precoCusto!: number;
    precoMinimo!: number;
    unidadeMedida!: string;
    ativo!: boolean;
}
