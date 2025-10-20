import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const demoUserId = "022c1e9c-1b87-4e49-a706-b67beb8cbd94";

    await prisma.product.createMany({
        data: Array.from({ length: 20 }).map((_, i) => ({
            userId: demoUserId,
            name: `Product ${i + 1}`,
            price: (Math.random() * 90 + 10).toFixed(2),
            quantity: Math.floor(Math.random() * 20),
            lowStockAt: 5,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),

        })),
    });

    console.log("Semeadura concluída.");
    console.log(`foi criado 25 produtos para ID de usuário: ${demoUserId} `);
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });