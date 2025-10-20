import Sidebar from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/auth";
import { AccountSettings } from "@stackframe/stack";


export default async function SettingsPage() {
    const user = await getCurrentUser();

    return (
        <div className="min-h-screen">
            <Sidebar currentPath="/settings" />

            <main className="ml-60 p-6 text-gray-800">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold">Sistema</h1>
                            <p className="text-sm text-gray-500 ">Gerenciar sessões e preferências da sua conta</p>
                        </div>
                    </div>
                </div>
                <AccountSettings />
            </main>
        </div>
    )
}