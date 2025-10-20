"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

type Props = {
    inStockPorcentage: number;
    lowStockPorcentage: number;
    outOfStockPorcentage: number;
}

export default function EfficiencyChart({
    inStockPorcentage,
    lowStockPorcentage,
    outOfStockPorcentage,

}: Props) {

    const efficiencyData = [
        { name: 'No Estoque', value: inStockPorcentage, color: '#10B981' },
        { name: 'Estoque Baixo', value: lowStockPorcentage, color: '#F59E0B' },
        { name: 'Estoque Esgotado', value: outOfStockPorcentage, color: '#EF4444' },
    ];

    return (
        <div className="eficiencia bg-gray-50 p-6 border border-gray-200 rounded-lg shadow-md h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                    Eficiência do Estoque
                </h2>
            </div>

            <div className="flex flex-col items-center justify-center">
                {/* Gráfico de Rosca */}
                <div className="relative w-full h-64 mb-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={efficiencyData}
                                cx="50%"
                                cy="50%"
                                innerRadius="60%"
                                outerRadius="80%"
                                paddingAngle={2}
                                dataKey="value"
                                startAngle={90}
                                endAngle={-270}
                            >
                                {/* Pegando as cores dos StockPorcentege */}
                                {efficiencyData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => [`${value}%`, 'Porcentagem']}
                                contentStyle={{
                                    backgroundColor: '#f0f0f0',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                formatter={(value, entry) => (
                                    <span style={{ color: '#374151', fontSize: '12px' }}>
                                        {value}
                                    </span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute top-22 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-2xl font-semibold">{inStockPorcentage}%</div>
                            <div className="text-sm">No Estoque</div>
                        </div>
                    </div>
                </div>
                {/* Legenda detalhada */}
                <div className="w-full space-y-3 mt-3">
                    {efficiencyData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-gray-600">{item.name}</span>
                            </div>
                            <span className="font-semibold text-gray-800">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};