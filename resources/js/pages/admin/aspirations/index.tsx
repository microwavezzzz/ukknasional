import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ClipboardList, ArchiveX, Calendar, ArrowRight } from 'lucide-react';

interface Aspiration {
    id: number;
    description: string;
    status: 'pending' | 'in_progress' | 'completed' | 'rejected';
    created_at: string;
    student: {
        id: number;
        name: string;
        nis: string;
    };
    category: {
        id: number;
        name: string;
    };
}

interface PageProps {
    aspirations: {
        data: Aspiration[];
        links: any[];
    };
    flash?: {
        message?: string;
    };
}

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/20',
    in_progress: 'bg-blue-500/10 text-blue-600 dark:text-blue-500 border-blue-500/20',
    completed: 'bg-green-500/10 text-green-600 dark:text-green-500 border-green-500/20',
    rejected: 'bg-red-500/10 text-red-600 dark:text-red-500 border-red-500/20',
};

const statusLabels: Record<string, string> = {
    pending: 'Menunggu',
    in_progress: 'Diproses',
    completed: 'Selesai',
    rejected: 'Ditolak',
};

export default function Index({ aspirations, flash }: PageProps) {
    return (
        <>
            <Head title="Manajemen Aspirasi" />

            <div className="flex flex-1 flex-col gap-6 p-6 max-w-6xl mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 opacity-0 animate-fade-in [animation-fill-mode:forwards]">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                            <ClipboardList className="size-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-foreground">Aspirasi & Laporan</h1>
                            <p className="text-sm text-muted-foreground mt-1">Daftar keluhan dan masukan dari siswa.</p>
                        </div>
                    </div>
                </div>

                {/* Alerts */}
                {flash?.message && (
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-primary font-medium opacity-0 animate-fade-in [animation-delay:100ms] [animation-fill-mode:forwards] flex items-center shadow-sm">
                        <div className="size-2 rounded-full bg-primary animate-pulse mr-3"></div>
                        {flash.message}
                    </div>
                )}

                {/* Aspiration List Wrapper */}
                <div className="flex flex-col gap-3 mt-2">
                    {aspirations.data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-muted rounded-2xl bg-card/50 opacity-0 animate-fade-in [animation-delay:200ms] [animation-fill-mode:forwards]">
                            <ArchiveX className="size-12 text-muted-foreground mb-4 opacity-50" />
                            <h3 className="text-lg font-bold text-foreground mb-1">Daftar Aspirasi Kosong</h3>
                            <p className="text-sm text-muted-foreground max-w-sm">Belum ada satupun keluhan atau masukan yang diajukan oleh siswa saat ini.</p>
                        </div>
                    ) : (
                        aspirations.data.map((aspiration, index) => (
                            <Link
                                key={aspiration.id}
                                href={`/admin/aspirations/${aspiration.id}`}
                                className="group flex flex-col sm:flex-row justify-between p-5 bg-card border shadow-sm rounded-2xl hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 opacity-0 animate-fade-in [animation-fill-mode:forwards] gap-4"
                                style={{ animationDelay: `${(index + 1) * 80 + 100}ms` }}
                            >
                                <div className="flex flex-col gap-2 min-w-0">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                                            <Calendar className="size-3.5" />
                                            {new Date(aspiration.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric', month: 'short', year: 'numeric'
                                            })}
                                        </div>
                                        <span className={`px-2.5 py-1 text-xs font-bold border rounded-md whitespace-nowrap ${statusColors[aspiration.status]}`}>
                                            {statusLabels[aspiration.status]}
                                        </span>
                                    </div>
                                    <div className="flex flex-col shrink">
                                        <h3 className="text-base font-bold text-foreground">
                                            {aspiration.student.name}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                            <span className="text-sm text-muted-foreground font-medium">NIS: {aspiration.student.nis}</span>
                                            <span className="size-1 bg-muted-foreground/30 rounded-full"></span>
                                            <span className="text-sm text-primary font-semibold truncate max-w-[200px]">Topik: {aspiration.category?.name || 'Umum'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center shrink-0 justify-end sm:opacity-50 sm:group-hover:opacity-100 transition-opacity">
                                    <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                                        Tinjau
                                        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
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
        { title: 'Aspirasi', href: '/admin/aspirations' },
    ],
};
