## Inventory Track
![Dashboard do Inventory Track mostrando métricas de estoque, valor total e gráfico semana]()

### Visão Geral
Aplicação de controle de inventário construída com Next.js (App Router) que permite cadastrar, listar e monitorar produtos, com indicadores de estoque, valor total e gráficos de evolução semanal. O acesso é protegido por autenticação via Stack.

### Funcionalidades
- **Autenticação**: redireciona para `sign-in` quando o usuário não está autenticado.
- **Dashboard**: métricas agregadas (total de produtos, valor total, alerta de estoque baixo), gráfico semanal e níveis de estoque recentes.
- **Inventário**: listagem paginada, busca por nome, exclusão de itens.
- **Adicionar produto**: criação de produtos com validação server-side.
- **Sistema (Settings)**: espaço para configurações futuras.

### Stack Tecnológica
- **Next.js 15 (App Router)** com React 19
- **Prisma** (`@prisma/client`) para acesso a banco PostgreSQL
- **Stack** (`@stackframe/stack`) para autenticação (server/client)
- **Zod** para validação em Server Actions
- **Recharts** para gráficos
- **Tailwind CSS v4** para estilos

### Visão de Arquitetura e Pastas
Estrutura principal (resumo):

```
app/
  dashboard/page.tsx         # Página principal com métricas e gráficos
  inventory/page.tsx         # Listagem, busca e paginação de produtos
  add-product/page.tsx       # Formulário de criação de produto
  settings/page.tsx          # Configurações do sistema (futuro)
  layout.tsx                 # Layout raiz com StackProvider/Theme
components/
  Sidebar.tsx                # Navegação lateral
  products-chart.tsx         # Gráfico semanal (Recharts)
  DeleteButton.tsx           # Botão de exclusão de produto
  pagination.tsx             # Componente de paginação
lib/
  prisma.ts                  # Singleton do PrismaClient
  auth.ts                    # `getCurrentUser()` (redirect se não logado)
  actions/products.tsx       # Server Actions: criar e deletar produtos
prisma/
  schema.prisma              # Modelo `Product`
```

### Modelo de Dados (Prisma)
Entidade principal: `Product`.

```prisma
model Product {
  id         String   @id @default(cuid())
  userId     String
  name       String
  sku        String?  @unique
  price      Decimal  @db.Decimal(12,2)
  quantity   Int      @default(0)
  lowStockAt Int?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@index([userId, name])
  @@index([createdAt])
}
```

- **price** representa o valor unitário (duas casas decimais).
- **lowStockAt** define o nível mínimo desejado. Produtos com `quantity <= lowStockAt` entram como “estoque baixo”.

### Autenticação e Acesso
- `lib/auth.ts` expõe `getCurrentUser()` que consulta o Stack no server e faz `redirect("/sign-in")` se não houver usuário.
- Páginas server-side (e Server Actions) usam `getCurrentUser()` para garantir escopo por `userId`.

### Páginas e Fluxos Principais
- `app/dashboard/page.tsx`
  - Busca: contagem total de produtos do usuário, soma de valor (price × quantity), contagem por status de estoque e série semanal de criações.
  - Exibe cards de métricas, gráfico semanal (`products-chart.tsx`) e lista de níveis de estoque dos itens mais recentes.
- `app/inventory/page.tsx`
  - Aceita query `q` (busca por nome) e `page` (pagina resultados, 10 por página).
  - Lista: nome, SKU, preço, quantidade, `lowStockAt` e ações (excluir via `DeleteButton`).
  - Mostra estados vazios distintos: sem resultados de busca vs. estoque vazio.
- `app/add-product/page.tsx`
  - Formulário que envia para a Server Action `createProduct` com validação `zod`.
- `app/settings/page.tsx`
  - Placeholder para futuras configurações.

### Fluxo de Dados e Estado
- Páginas são Server Components que consultam o banco via `prisma` (singleton de `lib/prisma.ts`).
- Server Actions em `lib/actions/products.tsx`:
  - `createProduct(formData)`: valida com `zod`, cria com `userId` do usuário atual e redireciona para `/inventory`.
  - `deleteProduct(formData)`: exclui respeitando `id` e `userId`.
- O gráfico semanal (`components/products-chart.tsx`) recebe dados já agregados no server e renderiza via Recharts no client.

### Detalhes de Implementação Relevantes
- **Busca**: `inventory` usa filtro `name contains` case-insensitive (opcional) por `userId`.
- **Paginação**: cálculo de `totalPages` e `skip/take` em Prisma, com componente `pagination` para navegar.
- **Estoque baixo**:
  - Se `lowStockAt` definido: estoque baixo quando `quantity <= lowStockAt`.
  - Se não definido: usa limiar padrão (ex.: destaque informativo e regras de cor no dashboard).
- **Valor total**: soma de `price × quantity` para todos os produtos do usuário.
- **Série semanal**: janela de 12 semanas, agrupando criações por semana com `date-fns`.

### Componentes
- `Sidebar.tsx`: navegação com realce de rota atual e `UserButton` do Stack.
- `products-chart.tsx`: `AreaChart` com `ResponsiveContainer`, tooltip estilizado e eixos simples.
- `DeleteButton.tsx`: encapsula envio de `id` para `deleteProduct`.
- `pagination.tsx`: cria links de navegação considerando `q`, `pageSize` e página atual.

### Notas de Performance e Segurança
- **Prisma Client singleton** evita múltiplas conexões em dev (`lib/prisma.ts`).
- **Parallelism**: consultas agregadas com `Promise.all` no dashboard.
- **Escopo por usuário**: todas as consultas e mutações incluem `userId` do usuário autenticado.
- **Validação de entrada**: `zod` em Server Actions para evitar dados inválidos.

### Scripts
```bash
npm run dev  # desenvolvimento (turbopack)
pnpm dev

```

