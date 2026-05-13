import { AcademicService } from "@/features/academic/services/academic-service";
import { prisma } from "@/lib/prisma";
import { FeeConfigList } from "@/features/admin/components/fee-config-list";

export default async function AdminFinancePage() {
    const groups = await AcademicService.getAllGroups();
    const subjects = await AcademicService.getAllSubjects();
    
    // Fetch existing fee configurations
    const feeConfigs = await prisma.feeConfig.findMany();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Fee Configuration</h1>
                <p className="text-muted-foreground">
                    Set and manage base prices for academic groups and individual subjects.
                </p>
            </div>

            <div className="grid gap-6">
                <div className="rounded-lg border bg-white shadow-sm">
                    <div className="border-b bg-gray-50 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-900">Academic Groups (Packages)</h2>
                        <p className="text-sm text-muted-foreground">Prices for full Science, Commerce, or Arts packages.</p>
                    </div>
                    <div className="p-6">
                        <FeeConfigList 
                            items={groups.map(g => ({ id: g.id, name: g.name }))} 
                            type="GROUP" 
                            initialConfigs={feeConfigs.filter(c => c.type === "GROUP")}
                        />
                    </div>
                </div>

                <div className="rounded-lg border bg-white shadow-sm">
                    <div className="border-b bg-gray-50 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-900">Individual Subjects</h2>
                        <p className="text-sm text-muted-foreground">Prices for students taking specific subjects outside a full package.</p>
                    </div>
                    <div className="p-6">
                        <FeeConfigList 
                            items={subjects.map(s => ({ id: s.id, name: `${s.name} (${s.group.name})` }))} 
                            type="SUBJECT" 
                            initialConfigs={feeConfigs.filter(c => c.type === "SUBJECT")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
