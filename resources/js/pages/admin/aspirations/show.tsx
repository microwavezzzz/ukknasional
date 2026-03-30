import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { FileText, ArrowLeft, Send, PenTool, CheckCircle, Clock } from 'lucide-react';

interface Aspiration {
    id: number;
    description: string;
    status: 'pending' | 'in_progress' | 'completed' | 'rejected';
    feedback: string | null;
    repair_progress: string | null;
    created_at: string;
    student: {
        id: number;
        name: string;
        nis: string;
        class: string;
    };
    category: {
        id: number;
        name: string;
    };
}

const statusLabels: Record<string, string> = {
    pending: 'Status: Menunggu Antrean',
    in_progress: 'Status: Sedang Diproses',
    completed: 'Status: Telah Selesai',
    rejected: 'Status: Tidak Disetujui',
};

export default function Show({ aspiration }: { aspiration: Aspiration }) {
    const { data, setData, put, processing, errors } = useForm({
        status: aspiration.status,
        feedback: aspiration.feedback || '',
        repair_progress: aspiration.repair_progress || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/aspirations/${aspiration.id}`);
    };

    return (
        <>
            <Head title={`Aspirasi #${aspiration.id}`} />

            <div className="flex flex-1 flex-col gap-6 p-6 max-w-6xl mx-auto w-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 opacity-0 animate-fade-in [animation-fill-mode:forwards]">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                            <FileText className="size-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-foreground">Detail Laporan #{aspiration.id}</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Dikirim pada {new Date(aspiration.created_at).toLocaleString('id-ID')}
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" asChild className="rounded-full shadow-sm hover:-translate-y-0.5 transition-all">
                        <Link href="/admin/aspirations">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Daftar Laporan
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 opacity-0 animate-fade-in [animation-delay:100ms] [animation-fill-mode:forwards]">
                    
                    {/* Data Aspirasi Laporan */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10 blur-[2px]">
                                <FileText className="size-32" />
                            </div>
                            <div className="relative z-10 flex flex-col gap-6">
                                <div>
                                    <p className="text-xs font-bold text-primary tracking-widest uppercase mb-1">Pengirim Laporan</p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex size-12 rounded-full bg-primary text-primary-foreground font-black text-lg items-center justify-center">
                                            {aspiration.student.name.charAt(0)}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-lg font-black text-foreground">{aspiration.student.name}</span>
                                            <span className="text-sm font-semibold text-muted-foreground">{aspiration.student.nis} • Kelas {aspiration.student.class}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-px w-full bg-primary/10"></div>
                                <div>
                                    <p className="text-xs font-bold text-primary tracking-widest uppercase mb-2">Kategori Indikator</p>
                                    <span className="inline-flex items-center rounded-lg bg-background border px-3 py-1 font-semibold shadow-sm">
                                        {aspiration.category?.name || 'Kategori Umum'}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-primary tracking-widest uppercase mb-2">Isi Laporan Siswa</p>
                                    <div className="p-4 bg-background border rounded-xl shadow-sm text-[15px] leading-relaxed text-foreground whitespace-pre-wrap">
                                        {aspiration.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Update Admin */}
                    <div className="lg:col-span-7">
                        <div className="bg-card shadow-sm border rounded-2xl p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                                <span className="flex size-8 rounded-full bg-muted justify-center items-center text-muted-foreground"><PenTool className="size-4" /></span>
                                <h2 className="text-xl font-bold tracking-tight">Tindak Lanjut Admin</h2>
                            </div>
                            
                            <form onSubmit={submit} className="space-y-6">
                                <div className="space-y-3">
                                    <label htmlFor="status" className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                                        <Clock className="size-4" /> Transisi Status
                                    </label>
                                    <select
                                        id="status"
                                        className="flex w-full rounded-xl border border-input bg-muted/30 px-4 py-3 font-semibold text-foreground ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
                                        style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px top 50%', backgroundSize: '12px auto' }}
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value as any)}
                                    >
                                        {Object.entries(statusLabels).map(([key, label]) => (
                                            <option key={key} value={key} className="font-medium bg-background">{label}</option>
                                        ))}
                                    </select>
                                    {errors.status && <p className="text-sm font-medium text-destructive mt-1">{errors.status}</p>}
                                </div>

                                <div className="space-y-3">
                                    <label htmlFor="repair_progress" className="text-sm font-bold text-muted-foreground block">
                                        Progres / Jurnal Lapangan (Internal atau terlihat parsial)
                                    </label>
                                    <textarea
                                        id="repair_progress"
                                        rows={3}
                                        className="flex w-full rounded-xl border border-input bg-background px-4 py-3 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-shadow focus:shadow-md"
                                        value={data.repair_progress}
                                        onChange={(e) => setData('repair_progress', e.target.value)}
                                        placeholder="Tulis log kerja teknisi. Cth: Meninjau ke lapangan / Pemesanan suku cadang..."
                                    />
                                    {errors.repair_progress && <p className="text-sm font-medium text-destructive mt-1">{errors.repair_progress}</p>}
                                </div>

                                <div className="space-y-3">
                                    <label htmlFor="feedback" className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                                        <Send className="size-4" /> Umpan Balik untuk Siswa (Feedback)
                                    </label>
                                    <textarea
                                        id="feedback"
                                        rows={4}
                                        className="flex w-full rounded-xl border-2 border-primary/20 bg-background px-4 py-3 ring-offset-background placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                                        value={data.feedback}
                                        onChange={(e) => setData('feedback', e.target.value)}
                                        placeholder="Pesan langsung yang akan diterima siswa pengirim laporan ini..."
                                    />
                                    <p className="text-xs font-semibold text-muted-foreground opacity-80">Catatan: Siswa akan langsung melihat balasan ini di dasbor mereka.</p>
                                    {errors.feedback && <p className="text-sm font-medium text-destructive mt-1">{errors.feedback}</p>}
                                </div>

                                <div className="pt-2">
                                    <Button type="submit" disabled={processing} className="w-full rounded-full shadow-md hover:-translate-y-0.5 transition-all h-12 text-md">
                                        <CheckCircle className="mr-2 size-5" />
                                        {processing ? 'Menjalankan...' : 'Simpan Pembaruan Status'}
                                    </Button>
                                </div>
                            </form>
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

Show.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Aspirasi', href: '/admin/aspirations' },
        { title: 'Detail', href: '#' },
    ],
};
