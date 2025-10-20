import Sidebar from "@/components/Sidebar";
import { createProduct } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";

export default async function AddProductPage() {
    const user = await getCurrentUser();

    return (
        <div className="min-h-screen">
            <Sidebar currentPath="/add-product" />

            <main className="ml-60 p-6 text-gray-900">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold">Adicionar Produto</h1>
                            <p className="text-sm text-gray-500 ">Criar um novo produto no seu inventario.</p>
                        </div>
                    </div>
                </div>
                <div className="max-w-2xl">
                    <div className="relative bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
                        <div className="absolute top-0 right-0 p-1.5">
                            <picture>
                                <img src="/favicon-icon.png" alt="Logo do Desenvolvedor" className="w-10 h-10" />
                            </picture>
                        </div>
                        <form action={createProduct} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Nome do Produto <span className="text-red-600">*</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Digite o nome do produto"
                                    required
                                    className="w-full bg-white px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent focus:outline focus:outline-purple-500"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="price"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Preço <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        id="price"
                                        type="number"
                                        name="price"
                                        step={0.01}
                                        min="0.01"
                                        max="1.000.000.000"
                                        placeholder="Insira o valor do produto"
                                        required
                                        className="w-full bg-white px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent focus:outline focus:outline-purple-500" />
                                </div>
                                <div>
                                    <label
                                        htmlFor="quantity"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Quantidade <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        id="quantity"
                                        type="number"
                                        name="quantity"
                                        min="0" // deixei assim para testa
                                        max="1.000.000.000"
                                        placeholder="Insira a quantidade desejada."
                                        required
                                        className="w-full bg-white px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent focus:outline focus:outline-purple-500" />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="sku"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    SKU (Opcional)
                                </label>
                                <input
                                    id="sku"
                                    type="text"
                                    name="sku"
                                    placeholder="Digite o SKU (Opcional)"
                                    className="w-full bg-white px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent focus:outline focus:outline-purple-500" />
                            </div>
                            <div>
                                <label
                                    htmlFor="lowStockAt"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Minimo no Estoque (Opcional, mas recomendável.)
                                </label>
                                <input
                                    id="lowStockAt"
                                    type="number"
                                    name="lowStockAt"
                                    min="1"
                                    max="1.000.000.000"
                                    placeholder="Insira o limite de estoque baixo (Opcional, mas recomendável.)"
                                    className="w-full bg-white px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent focus:outline focus:outline-purple-500" />
                            </div>
                            <button type="submit" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer">Adicionar Produto</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}