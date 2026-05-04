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
```DBDL
Table Produto {
  id Int [pk, increment]
  nome String [not null]
  sku String [unique, not null]
  precoCusto Float [not null]
  precoMinimo Float [not null]
  unidadeMedida String [not null, default: "UN"]
  ativo Boolean [not null, default: true]
  atualizadoEm DateTime [not null]

  Indexes {
    sku [unique]
  }
}

Table Estoque {
  id Int [pk, increment]
  quantidade Int [not null, default: 0]
  estoqueMinimo Int [not null, default: 0]
  produtoId Int [unique, not null]

  Indexes {
    produtoId [unique]
  }
}

Table MovimentacaoEstoque {
  id Int [pk, increment]
  tipo String [not null]
  quantidade Int [not null]
  motivo String
  data DateTime [not null, default: "now()"]
  produtoId Int [not null]

  Indexes {
    produtoId
  }
}

Table Cliente {
  id Int [pk, increment]
  nome String [not null]
  documento String [unique, not null]
  email String [unique]

  Indexes {
    documento [unique]
    email [unique]
  }
}

Table Vendedor {
  id Int [pk, increment]
  nome String [not null]
  email String [unique, not null]
  ativo Boolean [not null, default: true]

  Indexes {
    email [unique]
  }
}

Table PrecoVendedor {
  id Int [pk, increment]
  margemLucro Float [not null]
  vendedorId Int [not null]
  produtoId Int [not null]

  Indexes {
    (vendedorId, produtoId) [unique]
  }
}

Table Pedido {
  id Int [pk, increment]
  dataPedido DateTime [not null, default: "now()"]
  status String [not null, default: "PENDENTE"]
  valorTotal Float [not null, default: 0.0]
  vendedorId Int [not null]
  clienteId Int [not null]

  Indexes {
    vendedorId
    clienteId
  }
}

Table ItemPedido {
  id Int [pk, increment]
  quantidade Int [not null]
  precoCustoNoAto Float [not null]
  precoMinimoNoAto Float [not null]
  precoVendaNoAto Float [not null]
  pedidoId Int [not null]
  produtoId Int [not null]

  Indexes {
    pedidoId
    produtoId
  }
}

// Relationships
Ref: Estoque.produtoId > Produto.id [delete: cascade]
Ref: MovimentacaoEstoque.produtoId > Produto.id [delete: cascade]
Ref: PrecoVendedor.vendedorId > Vendedor.id [delete: cascade]
Ref: PrecoVendedor.produtoId > Produto.id [delete: cascade]
Ref: Pedido.vendedorId > Vendedor.id
Ref: Pedido.clienteId > Cliente.id
Ref: ItemPedido.pedidoId > Pedido.id [delete: cascade]
Ref: ItemPedido.produtoId > Produto.id
```