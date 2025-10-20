"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ChartData {
    week: string;
    products: number;
}

export default function ProductChart({ data }: { data: ChartData[] }) {
    // console.log(data)
    return (
        <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="19" stroke="#f0f0f0" />
                    <XAxis dataKey="week" stroke="#777" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#777" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />

                    <Area
                        type="monotone"
                        dataKey="products"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.2}
                        dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 3 }}
                        activeDot={{ fill: "#8b5cf6", r: 4 }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                        labelStyle={{ color: "#374151", fontWeight: "500" }}
                    />

                </AreaChart>
            </ResponsiveContainer>

        </div>
    )
}