import DeleteButton from "@/components/DeleteButton";
import Pagination from "@/components/pagination";
import Sidebar from "@/components/Sidebar";
import { deleteProduct } from "@/lib/actions/products"; // o server está ativo sem precisar colocar o "use server" dentro do form *action* 
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const user = await getCurrentUser();
  const userId = user.id;

  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const page = Math.max(1, Number(params.page ?? 1));
  const pageSize = 10;

  const where = {
    userId,
    ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {}),
  };

  const [totalCount, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="min-h-screen">
      <Sidebar currentPath="/inventory" />

      <main className="ml-60 p-6 text-gray-900">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Inventário</h1>
              <p className="text-sm text-gray-500 ">Gerencie seus produtos e acompanhe os níveis de estoque.</p>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center p-25">
            {/* Verifica se há termo de pesquisa */}
            {q ? (
              // Mensagem quando a pesquisa não encontra resultados
              <div className="max-w-md mx-auto">
                <picture>
                  <img src="/no-results.png" alt="Não Encontrado" className="mx-auto" />
                </picture>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Nenhum item encontrado
                </h2>
                <p className="text-gray-600 mb-4">
                  Não encontramo o produto "<span className="font-medium text-purple-600">{q}</span>"
                </p>
                <Link
                  href="/inventory"
                  className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Ver todos os produtos
                </Link>
              </div>
            ) : (
              // Mensagem quando não há produtos no estoque
              <div className="max-w-md mx-auto">
                <picture>
                  <img src="/pasta-vazia.png" alt="Pasta vazia" className="mx-auto lg:w-70" />
                </picture>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Estoque vazio
                </h2>
                <p className="text-gray-600">
                  Não há nenhum produto no seu estoque. Vá para a página
                  <Link href="/add-product" className="text-purple-500 hover:underline mx-1">
                    Adicionar Produtos
                  </Link>
                  para criar um produto.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <form
              action="/inventory"
              method="GET"
              className="bg-gray-50 w-full p-6 flex items-center gap-4 rounded-lg shadow-md">
              <input
                name="q"
                placeholder="Buscar produtos..."
                defaultValue={q || ""}
                className="bg-white border border-gray-400 flex-1 px-4 py-2 rounded-lg focus:border-transparent focus:outline-purple-500"
              />
              <button className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg text-white cursor-pointer transition-colors">
                Buscar
              </button>
              {/* Botão para limpar pesquisa quando há termo */}
              {q && (
                <Link
                  href="/inventory"
                  className="bg-gray-500 hover:bg-gray-600 px-3 py-2 rounded-lg text-white cursor-pointer transition-colors"
                >
                  Limpar
                </Link>
              )}
            </form>

            {/* Resultados da pesquisa */}
            {q && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-800 text-sm">
                  Mostrando {items.length} resultado(s) para "<span className="font-medium">{q}</span>"
                </p>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <table className="w-full overflow-x-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">SKU</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Low Stock At</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((product, key) => (
                    <tr key={key} className="hover:bg-gray-100 transition-colors">
                      <th className="px-6 py-4 text-sm text-gray-500">{product.name}</th>
                      <th className="px-6 py-4 text-sm text-gray-500">{product.sku || "-"}</th>
                      <th className="px-6 py-4 text-sm text-green-500">${Number(product.price).toLocaleString("pt-br")}</th>
                      <th className="px-6 py-4 text-sm text-gray-500">{product.quantity}</th>
                      <th className="px-6 py-4 text-sm text-gray-500">{product.lowStockAt || "-"}</th>
                      <th className="px-6 py-4 text-base">
                        <DeleteButton id={product.id} action={deleteProduct} />
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg shadow">
                <Pagination
                  currentPage={page}
                  totalpages={totalPages}
                  baseUrl="/inventory"
                  searchParams={{
                    q,
                    pageSize: String(pageSize),
                  }} />
              </div>
            )}
          </div>
        )}
      </main >
    </div >
  )
}
