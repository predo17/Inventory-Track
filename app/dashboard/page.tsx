import EfficiencyChart from "@/components/product-circle";
import ProductChart from "@/components/products-chart";
import Sidebar from "@/components/Sidebar";
import { subWeeks, startOfWeek, endOfWeek, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
// import { AiOutlineBarChart } from "react-icons/ai";
import { CgDollar } from "react-icons/cg";
import { LuInfo, LuPackage, LuTrendingUp, } from "react-icons/lu";



export default async function DashboardPage() {

  const user = await getCurrentUser();
  const userId = user.id;


  const [totalProducts, allProducts, productsForStock] = await Promise.all([
    prisma.product.count({ where: { userId } }),
    prisma.product.findMany({
      where: { userId },
      select: { price: true, quantity: true, createdAt: true },
    }),
    prisma.product.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        quantity: true,
        lowStockAt: true,
        price: true
      },
    }),
  ]);
  // Calcular tudo de uma vez
  const lowStock = productsForStock.filter(
    product => product.lowStockAt && product.quantity <= product.lowStockAt
  ).length;

  const totalValue = allProducts.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0
  );

  const inStockCount = allProducts.filter((p) => Number(p.quantity) > 5).length;
  const lowStockCount = allProducts.filter((p) => Number(p.quantity) <= 5 && Number(p.quantity) >= 1).length;
  const outOfStockCount = allProducts.filter((p) => Number(p.quantity) === 0).length;

  const inStockPorcentage = totalProducts > 0 ? Math.round((inStockCount / totalProducts * 100)) : 0;
  const lowStockPorcentage = totalProducts > 0 ? Math.round((lowStockCount / totalProducts * 100)) : 0;
  const outOfStockPorcentage = totalProducts > 0 ? Math.round((outOfStockCount / totalProducts * 100)) : 0;

  const weeklyProductsData = Array.from({ length: 12 }, (_, i) => {
    const weekStart = startOfWeek(subWeeks(new Date(), 11 - i), { weekStartsOn: 1 });
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
    const weekLabel = format(weekStart, "dd/MM", { locale: ptBR });

    const weekProducts = allProducts.filter((product) => {
      const date = new Date(product.createdAt);
      return date >= weekStart && date <= weekEnd;
    });

    return {
      week: weekLabel,
      products: weekProducts.length,
    };
  });

  const recent = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 8,
  })

  return (
    <div className="container min-h-screen ">
      <Sidebar currentPath="/dashboard" />


      <main className="md:mx-0 xl:ml-60 p-3 lg:p-6 text-gray-800 ">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="text-sm text-gray-500 ">bem-vindo de volta! aqui está uma visão geral do seu inventário.</p>
            </div>
          </div>
          <div className="relative w-full">
            <div className="grid-layout mt-6">
              {/* Métricas */}
              <div className="metrica">
                <div className="grid grid-cols-1 grid-rows-2 gap-3 ">
                  {/* Card 1 - Total de Produtos */}
                  <div className="relative overflow-hidden group bg-gradient-to-br from-white to-green-50 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out border border-green-100">
                    <div className="absolute -right-6 -bottom-6 opacity-20 group-hover:opacity-30 transition-all duration-500">
                      <LuTrendingUp className="text-[100px] mr-4 text-green-600" />
                    </div>

                    <div className="relative p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-green-800 bg-green-100 px-2 py-1 rounded-full">Produtos</span>
                        {/* Tooltip no ícone */}
                        <div className="relative group/tooltip">
                          <button className="rounded-full p-[1px] outline-green-600">
                            <LuInfo className="text-green-500 text-lg cursor-help" />
                          </button>
                          <div className="absolute -top-0.5 right-full mr-2 hidden group-hover/tooltip:block group-active/tooltip:block  z-10">
                            <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                              Total de produtos cadastrados
                              <div className="absolute bottom-2.5 left-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800 -rotate-90"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-3xl font-bold text-gray-800 mb-1 ml-2">{totalProducts}</div>
                      {/* Tooltip no crescimento */}
                      <div className="relative group/tooltip2 inline-block">
                        <button className="rounded-full p-[1px] outline-green-600">
                          <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full cursor-help">
                            +{totalProducts} itens
                          </span>
                        </button>
                        <div className="absolute top-0.5 left-full ml-2 hidden group-hover/tooltip2:block z-10">
                          <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                            Crescimento este mês 📅
                            <div className="absolute bottom-2.5 right-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800 rotate-90"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 - Valor Total */}
                  <div className="relative overflow-hidden group bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out border border-blue-100">
                    <div className="absolute -right-6 -bottom-6 opacity-20 group-hover:opacity-30 transition-all duration-500">
                      <CgDollar className="text-[90px] text-blue-600" />
                    </div>

                    <div className="relative p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-800 bg-blue-100 px-2 py-1 rounded-full">Valor Total</span>
                        {/* Tooltip no ícone */}
                        <div className="relative group/tooltip">
                          <button className="rounded-full p-[1px] outline-blue-600">
                            <LuInfo className="text-blue-500 text-lg cursor-help" />
                          </button>
                          <div className="absolute -top-0.5 right-full mr-2 hidden group-hover/tooltip:block z-10">
                            <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                              Soma do valor de todos os produtos x quantidade em estoque
                              <div className="absolute bottom-2.5 left-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800 -rotate-90"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-gray-800 mb-1 ml-2">
                        R$ {Number(totalValue).toLocaleString('pt-BR')}
                      </div>
                      <div className="relative group/tooltip2 inline-block">
                        <button className="rounded-full p-[1px] outline-blue-600">
                          <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full cursor-help">
                            +R$ {Number(totalValue).toLocaleString('pt-BR')}
                          </span>
                        </button>
                        <div className="absolute top-0.5 left-full ml-2 hidden group-hover/tooltip2:block z-10">
                          <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                            Valor total do seu inventário em Reais 💰
                            <div className="absolute bottom-2.5 right-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800 rotate-90"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 - Estoque */}
                  <div className="relative overflow-hidden group bg-gradient-to-br from-white to-orange-50 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out border border-orange-100">
                    <div className="absolute -right-6 -bottom-6 opacity-20 group-hover:opacity-30 transition-all duration-500">
                      <LuPackage className="text-[80px] text-orange-600" />
                    </div>

                    <div className="relative p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-orange-800 bg-orange-100 px-2 py-1 rounded-full">
                          Estoque Baixo
                        </span>
                        <div className="relative group/tooltip">
                          <button className="rounded-full p-[1px] outline-orange-600">
                            <LuInfo className="text-orange-500 text-lg cursor-help" />
                          </button>
                          <div className="absolute -top-0.5 right-full mr-2 hidden group-hover/tooltip:block z-10">
                            <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                              Configure o estoque mínimo para cada produto
                              <div className="absolute bottom-2.5 left-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800 -rotate-90"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {lowStock === 0 ? (
                        <div className="text-center py-3">
                          <div className="text-sm text-orange-600">
                            Nenhum produto com estoque baixo ou não foi definido.
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-3xl font-bold text-gray-800 mb-1 ml-2">{lowStock} <span className="text-lg text-orange-600 font-medium">
                          {lowStock === 1 ? (
                            <span>Produto</span>
                          ) : (
                            <span>Produtos</span>
                          )}
                        </span>
                        </div>
                      )}
                      <div>
                        {lowStock === 0 ? (
                          <div className="flex items-center">
                            <button className="rounded-full p-[1px] outline-green-600">
                              <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                                Tudo sob controle!
                              </span>
                            </button>
                          </div>
                        ) : (
                          <div className="relative group/tooltip2 inline-block">
                            <button className="rounded-full p-[1px] outline-orange-600">
                              <span className="text-xs text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded-full cursor-help">
                                Atenção necessária
                              </span>
                            </button>
                            <div className="absolute bottom-full left-0 ml-2 hidden group-hover/tooltip2:block z-10">
                              <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                Produtos com estoque abaixo do mínimo recomendado 🚨
                                <div className="absolute bottom-2.5 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800 "></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Semana */}
              <div className="semana bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md w-full h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Novos produtos por semana
                  </h2>
                </div>
                <div className="h-48">
                  <ProductChart data={weeklyProductsData} />
                </div>
              </div>
              {/* Níveis de Estoque */}
              {recent.length === 0 ? (
                <div className="niveis h-full bg-gray-50 p-6 border-t border-gray-200 rounded-xl shadow-md">
                  <div className="flex flex-col items-center justify-center text-center h-full">
                    <h2>Não tem nem um produto no seu inventário.
                      <br /> Vá para a página
                      <Link href="/add-product" className="text-purple-500 hover:underline"> Adicionar Produtos</Link> para criar produtos.</h2>

                    <div className="flex items-center space-x-2 mt-10">
                      <div className="w-4 h-4 bg-red-600 rounded-full dot-combo"></div>
                      <div className="w-4 h-4 bg-yellow-600 rounded-full dot-combo"></div>
                      <div className="w-4 h-4 bg-green-600 rounded-full dot-combo"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="niveis h-full bg-gray-50 p-6 border-t border-gray-200 rounded-xl shadow-md">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                      Níveis de estoque
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {recent.map((product, key) => {
                      const stockLevel = product.quantity === 0 ? 0 :
                        product.lowStockAt ?
                          (product.quantity <= product.lowStockAt ? 1 : 2) : // 1 = Baixo, 2 = Normal (com lowStockAt)
                          (product.quantity <= 5 ? 1 : 2); // 1 = Baixo, 2 = Normal (sem o lowStockAt - usar 5 como padrão)

                      const bgColor = ["bg-red-600", "bg-yellow-600", "bg-green-600"]
                      const textColor = ["text-red-600", "text-yellow-600", "text-green-600"]

                      const getStatusMessage = () => {
                        if (product.quantity === 0) return "ESGOTADO 🚨";
                        if (!product.lowStockAt) return "Estoque mínimo não definido ⚠️";
                        if (product.quantity <= product.lowStockAt) return `Estoque baixo! Mínimo: ${(product.lowStockAt).toLocaleString("pt-br")}`;
                        return "Estoque normal ✅";
                      };

                      return (
                        <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-white drop-shadow group transition-transform duration-500 ease-in-out hover:shadow-md active:shadow-md">
                          <div className="flex items-center whitespace-nowrap space-x-3 ">
                            <div className={`w-3 h-3 rounded-full group-hover:animate-pulse ${bgColor[stockLevel]}`} />
                            <div>
                              <span className="text-sm font-medium">{product.name}</span>
                              <span className="text-xs text-gray-500 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {getStatusMessage()}
                              </span>
                            </div>
                          </div>
                          <div className={`text-sm font-medium truncate ${textColor[stockLevel]}`}>{product.quantity} unidades</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
              {/* Eficiência */}
              <EfficiencyChart
                inStockPorcentage={inStockPorcentage}
                lowStockPorcentage={lowStockPorcentage}
                outOfStockPorcentage={outOfStockPorcentage}
              />
            </div>
          </div >
        </div>
      </main >
    </div >
  )
}
