import { getPendingRegistrationsAction } from "@/features/admin/actions/registration-actions";
import { AcademicService } from "@/features/academic/services/academic-service";
import { RegistrationList } from "@/features/admin/components/registration-list";

export default async function RegistrationsPage() {
    const pendingUsers = await getPendingRegistrationsAction();
    const groups = await AcademicService.getAllGroups();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">New Registrations</h1>
                <p className="text-muted-foreground">
                    Review and assign roles to newly registered public visitors.
                </p>
            </div>

            <div className="rounded-md border bg-white">
                {pendingUsers.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                        No new registrations to review.
                    </div>
                ) : (
                    <RegistrationList initialUsers={pendingUsers} groups={groups} />
                )}
            </div>
        </div>
    );
}
