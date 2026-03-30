import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus, Users, Pencil, Trash2, GraduationCap } from 'lucide-react';

interface Student {
    id: number;
    nis: string;
    name: string;
    class: string;
    created_at: string;
}

interface PageProps {
    students: {
        data: Student[];
        links: any[];
    };
    flash?: {
        message?: string;
    };
}

export default function Index({ students, flash }: PageProps) {
    return (
        <>
            <Head title="Manajemen Siswa" />

            <div className="flex flex-1 flex-col gap-6 p-6 max-w-6xl mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 opacity-0 animate-fade-in [animation-fill-mode:forwards]">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                            <Users className="size-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-foreground">Data Siswa</h1>
                            <p className="text-sm text-muted-foreground mt-1">Kelola daftar siswa yang memiliki akses ke sistem pelaporan.</p>
                        </div>
                    </div>
                    <Button asChild className="rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 w-full sm:w-auto font-semibold px-6">
                        <Link href="/admin/students/create">
                            <Plus className="mr-2 h-5 w-5" />
                            Tambah Siswa
                        </Link>
                    </Button>
                </div>

                {/* Alerts */}
                {flash?.message && (
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-primary font-medium opacity-0 animate-fade-in [animation-delay:100ms] [animation-fill-mode:forwards] flex items-center shadow-sm">
                        <div className="size-2 rounded-full bg-primary animate-pulse mr-3"></div>
                        {flash.message}
                    </div>
                )}

                {/* Students List Wrapper */}
                <div className="flex flex-col gap-3 mt-2">
                    {students.data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-muted rounded-2xl bg-card/50 opacity-0 animate-fade-in [animation-delay:200ms] [animation-fill-mode:forwards]">
                            <GraduationCap className="size-12 text-muted-foreground mb-4 opacity-50" />
                            <h3 className="text-lg font-bold text-foreground mb-1">Daftar Siswa Kosong</h3>
                            <p className="text-sm text-muted-foreground max-w-sm">Belum ada akun siswa yang didaftarkan. Silakan tambahkan siswa pertama.</p>
                        </div>
                    ) : (
                        students.data.map((student, index) => (
                            <div 
                                key={student.id} 
                                className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-card border shadow-sm rounded-2xl hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300 opacity-0 animate-fade-in [animation-fill-mode:forwards] gap-4"
                                style={{ animationDelay: `${(index + 1) * 50 + 100}ms` }}
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className="flex size-10 rounded-full bg-primary/10 text-primary items-center justify-center font-bold shrink-0">
                                        {student.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex flex-col truncate">
                                        <h3 className="text-base font-semibold text-card-foreground truncate">
                                            {student.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-sm text-muted-foreground font-medium">NIS: {student.nis}</span>
                                            <span className="size-1 bg-muted-foreground/30 rounded-full"></span>
                                            <span className="text-sm text-primary font-semibold">{student.class}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0 sm:opacity-50 sm:group-hover:opacity-100 transition-opacity justify-end">
                                    <Button variant="outline" size="sm" asChild className="rounded-full shadow-sm">
                                        <Link href={`/admin/students/${student.id}/edit`}>
                                            <Pencil className="h-4 w-4 sm:mr-1.5" />
                                            <span className="hidden sm:inline">Edit</span>
                                        </Link>
                                    </Button>
                                    <Button variant="destructive" size="sm" asChild className="rounded-full shadow-sm">
                                        <Link href={`/admin/students/${student.id}`} method="delete" as="button">
                                            <Trash2 className="h-4 w-4 sm:mr-1.5" />
                                            <span className="hidden sm:inline">Hapus</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination placeholder */}
                <div className="flex justify-end mt-4">
                    {/* Render standard pagination if needed */}
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(12px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Siswa', href: '/admin/students' },
    ],
};
