Banco de dados
## 🗄️ Estrutura do Banco de Dados (Prisma Schema)

O projeto utiliza **Prisma ORM** com **SQLite** para gerenciar a persistência de dados. A arquitetura foi desenhada focando em segurança de margem de lucro e rastreabilidade de estoque.

### Principais Entidades

*   **Produtos**: Armazena o `precoCusto` e um `precoMinimo` (trava de segurança).
*   **Vendedores**: Possuem uma `PrecoVendedor` (tabela de markup), onde é definida a margem de lucro individual para cada produto.
*   **Clientes**: Cadastro completo de compradores vinculados aos pedidos.
*   **Estoque**: Controle de saldo e histórico de movimentações (Entradas/Saídas).
*   **Pedidos/Itens**: Registra a transação "congelando" os valores de custo e venda no ato da compra para auditoria futura.

### Lógica de Cálculo de Preço
O preço de venda é calculado dinamicamente no backend seguindo a regra:
> `Preço Final = Máximo( (Custo * (1 + Margem)), Preço Mínimo )`

---

### Schema Completo
```prisma
// schema.prisma

//------------------------------------------
// CONFIGURAÇÃO DO PRISMA CLIENT
//------------------------------------------
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}
// -----------------------------------------
// CONFIGURAÇÃO DE BANCO DE DADOS
// -----------------------------------------
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

// -----------------------------------------
// MÓDULO DE PRODUTOS E ESTOQUE
// -----------------------------------------

model Produto {
  id            Int      @id @default(autoincrement())
  nome          String
  sku           String   @unique
  
  // Controle de Preço Base
  precoCusto    Float    // Valor de compra/fabricação
  precoMinimo   Float    // VALOR MÍNIMO de venda permitido (Trava de segurança)
  
  unidadeMedida String   @default("UN")
  ativo         Boolean  @default(true)
  atualizadoEm  DateTime @updatedAt

  // Relações
  estoque        Estoque?
  precosVendedor PrecoVendedor[]
  itensPedido    ItemPedido[]
  movimentacoes  MovimentacaoEstoque[]
}

model Estoque {
  id            Int     @id @default(autoincrement())
  quantidade    Int     @default(0)
  estoqueMinimo Int     @default(0)
  produtoId     Int     @unique
  produto       Produto @relation(fields: [produtoId], references: [id])
}

model MovimentacaoEstoque {
  id         Int      @id @default(autoincrement())
  tipo       String   // "ENTRADA" ou "SAIDA"
  quantidade Int
  motivo     String?  
  data       DateTime @default(now())
  produtoId  Int
  produto    Produto  @relation(fields: [produtoId], references: [id])
}

// -----------------------------------------
// MÓDULO DE CLIENTES
// -----------------------------------------

model Cliente {
  id           Int      @id @default(autoincrement())
  nome         String
  documento    String   @unique
  email        String?  @unique
  pedidos      Pedido[]
}

// -----------------------------------------
// MÓDULO DE VENDEDORES E REGRAS DE PREÇO
// -----------------------------------------

model Vendedor {
  id                Int      @id @default(autoincrement())
  nome              String
  email             String   @unique
  ativo             Boolean  @default(true)

  // Relações
  margensProdutos   PrecoVendedor[]
  pedidos           Pedido[]
}

model PrecoVendedor {
  id          Int      @id @default(autoincrement())
  margemLucro Float    // Multiplicador ou porcentagem sobre o custo
  
  vendedorId  Int
  vendedor    Vendedor @relation(fields: [vendedorId], references: [id])
  
  produtoId   Int
  produto     Produto  @relation(fields: [produtoId], references: [id])

  @@unique([vendedorId, produtoId])
}

// -----------------------------------------
// MÓDULO DE PEDIDOS E VENDAS
// -----------------------------------------

model Pedido {
  id          Int          @id @default(autoincrement())
  dataPedido  DateTime     @default(now())
  status      String       @default("PENDENTE") 
  valorTotal  Float        @default(0.0)
  
  vendedorId  Int
  vendedor    Vendedor     @relation(fields: [vendedorId], references: [id])
  
  clienteId   Int
  cliente     Cliente      @relation(fields: [clienteId], references: [id])
  
  itens       ItemPedido[]
}

model ItemPedido {
  id              Int     @id @default(autoincrement())
  quantidade      Int
  
  // Snapshots para auditoria
  precoCustoNoAto  Float   // Custo na hora da venda
  precoMinimoNoAto Float   // Preço mínimo na hora da venda
  precoVendaNoAto  Float   // O preço que foi efetivamente calculado e vendido
  
  pedidoId        Int
  pedido          Pedido  @relation(fields: [pedidoId], references: [id])
  
  produtoId       Int
  produto         Produto @relation(fields: [produtoId], references: [id])
}

```

