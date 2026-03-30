import { Head, Link } from '@inertiajs/react';
import { ClipboardList, CheckCircle, Clock, Users, ArrowRight, Activity } from 'lucide-react';

interface Stats {
    total_aspirations: number;
    completed_aspirations: number;
    pending_aspirations: number;
    total_students: number;
}

export default function AdminDashboard({ stats }: { stats: Stats }) {
    const cards = [
        {
            title: 'Total Aspirasi',
            value: stats?.total_aspirations ?? 0,
            icon: ClipboardList,
            description: 'Pengaduan masuk',
            gradient: 'from-blue-500/20 to-blue-500/5',
            iconColor: 'text-blue-600 dark:text-blue-400',
            bg: 'bg-blue-100 dark:bg-blue-900/30',
        },
        {
            title: 'Telah Selesai',
            value: stats?.completed_aspirations ?? 0,
            icon: CheckCircle,
            description: 'Berhasil ditangani',
            gradient: 'from-green-500/20 to-green-500/5',
            iconColor: 'text-green-600 dark:text-green-400',
            bg: 'bg-green-100 dark:bg-green-900/30',
        },
        {
            title: 'Perlu Proses',
            value: stats?.pending_aspirations ?? 0,
            icon: Clock,
            description: 'Menunggu respon',
            gradient: 'from-amber-500/20 to-amber-500/5',
            iconColor: 'text-amber-600 dark:text-amber-400',
            bg: 'bg-amber-100 dark:bg-amber-900/30',
        },
        {
            title: 'Siswa Terdaftar',
            value: stats?.total_students ?? 0,
            icon: Users,
            description: 'Total pengguna',
            gradient: 'from-primary/20 to-primary/5',
            iconColor: 'text-primary',
            bg: 'bg-primary/20',
        },
    ];

    return (
        <>
            <Head title="Dashboard Admin" />

            <div className="flex flex-1 flex-col gap-8 p-6 max-w-6xl mx-auto w-full">
                {/* Header */}
                <div className="flex flex-col gap-2 opacity-0 animate-fade-in [animation-fill-mode:forwards]">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                            <Activity className="size-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-foreground">Dashboard Admin</h1>
                            <p className="text-base text-muted-foreground mt-1">Ringkasan kondisi sarana dan keluhan siswa secara real-time.</p>
                        </div>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <div 
                                key={card.title} 
                                className="relative overflow-hidden flex flex-col p-6 bg-card border rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group opacity-0 animate-fade-in [animation-fill-mode:forwards]"
                                style={{ animationDelay: `${(index + 1) * 100 + 100}ms` }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-50`}></div>
                                <div className="relative z-10 flex flex-row items-center justify-between pb-4">
                                    <h3 className="text-sm font-semibold text-muted-foreground tracking-tight">
                                        {card.title}
                                    </h3>
                                    <div className={`p-2.5 rounded-xl ${card.bg} group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className={`h-5 w-5 ${card.iconColor}`} />
                                    </div>
                                </div>
                                <div className="relative z-10">
                                    <div className="text-4xl font-black">{card.value}</div>
                                    <p className="mt-2 text-sm font-medium text-muted-foreground">{card.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Quick Links & Status Summary */}
                <div className="grid gap-6 md:grid-cols-2 opacity-0 animate-fade-in [animation-delay:600ms] [animation-fill-mode:forwards]">
                    {/* Status Summary (Progress bars) */}
                    <div className="flex flex-col p-6 bg-card border rounded-2xl shadow-sm">
                        <div className="mb-6">
                            <h3 className="text-lg font-bold">Rasio Penanganan</h3>
                            <p className="text-sm text-muted-foreground">Persentase aspirasi yang terselesaikan.</p>
                        </div>
                        <div className="flex flex-col gap-5">
                            {[
                                { label: 'Selesai Ditangani', value: stats?.completed_aspirations ?? 0, color: 'bg-green-500' },
                                { label: 'Sedang Proses / Menunggu', value: (stats?.total_aspirations ?? 0) - (stats?.completed_aspirations ?? 0), color: 'bg-amber-500' },
                            ].map((item) => {
                                const total = Math.max(1, stats?.total_aspirations ?? 1);
                                const pct = Math.round((item.value / total) * 100);
                                return (
                                    <div key={item.label} className="flex flex-col gap-2">
                                        <div className="flex justify-between text-sm font-semibold">
                                            <span className="text-foreground">{item.label}</span>
                                            <span>
                                                {item.value} <span className="text-muted-foreground font-medium">({pct}%)</span>
                                            </span>
                                        </div>
                                        <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                                            <div className={`h-full rounded-full ${item.color} transition-all duration-1000 ease-out`} style={{ width: `${pct}%` }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-col p-6 bg-card border rounded-2xl shadow-sm">
                        <div className="mb-6">
                            <h3 className="text-lg font-bold">Aksi Cepat</h3>
                            <p className="text-sm text-muted-foreground">Navigasi pintas ke fitur utama.</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Link
                                href="/admin/aspirations"
                                className="group flex items-center justify-between rounded-xl bg-muted/30 border p-4 transition-all hover:bg-primary/5 hover:border-primary/20 hover:shadow-sm"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                                        <ClipboardList className="h-5 w-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-foreground">Tinjau Laporan Siswa</span>
                                        <span className="text-xs text-muted-foreground font-medium">Baca dan tindaklanjuti keluhan terbaru.</span>
                                    </div>
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="/admin/students"
                                className="group flex items-center justify-between rounded-xl bg-muted/30 border p-4 transition-all hover:bg-primary/5 hover:border-primary/20 hover:shadow-sm"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                                        <Users className="h-5 w-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-foreground">Kelola Data Siswa</span>
                                        <span className="text-xs text-muted-foreground font-medium">Tambahkan atau hapus daftar siswa.</span>
                                    </div>
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
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

AdminDashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard Admin', href: '/dashboard' }],
};
