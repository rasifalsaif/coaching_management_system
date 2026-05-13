import { prisma } from "@/lib/prisma";
import { UserCircle, Star } from "lucide-react";

export async function TeacherShowcase() {
    const teachers = await prisma.teacher.findMany({
        where: { status: "ACTIVE" },
        include: { user: true },
        take: 4
    });

    if (teachers.length === 0) return null;

    return (
        <section id="teachers" className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet Our Expert Teachers</h2>
                    <p className="mt-4 text-lg text-gray-600">Learn from the best educators in the country.</p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {teachers.map((teacher) => (
                        <div key={teacher.id} className="group relative rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                            <div className="mb-6 flex justify-center">
                                <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-blue-50 bg-gray-100 ring-1 ring-blue-100">
                                    {teacher.user.image ? (
                                        <img src={teacher.user.image} alt={teacher.user.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <UserCircle className="h-full w-full text-gray-300" />
                                    )}
                                </div>
                            </div>
                            
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-gray-900">{teacher.user.name}</h3>
                                <p className="text-sm font-medium text-blue-600">{teacher.specialization}</p>
                                <div className="mt-2 flex items-center justify-center gap-1 text-xs text-gray-500">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span>{teacher.experience || "Expert Educator"}</span>
                                </div>
                                <p className="mt-4 line-clamp-2 text-sm text-gray-500">
                                    {teacher.description || `Specialist in ${teacher.specialization} with a focus on conceptual clarity.`}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
