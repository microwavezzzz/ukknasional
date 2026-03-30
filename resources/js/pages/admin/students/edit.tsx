import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { UserCheck, ArrowLeft } from 'lucide-react';

interface Student {
    id: number;
    nis: string;
    name: string;
    class: string;
    created_at: string;
}

export default function Edit({ student }: { student: Student }) {
    const { data, setData, put, processing, errors } = useForm({
        nis: student.nis || '',
        name: student.name || '',
        class: student.class || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/students/${student.id}`);
    };

    return (
        <>
            <Head title="Edit Siswa" />

            <div className="flex flex-1 flex-col gap-6 p-6 max-w-3xl mx-auto w-full">
                <div className="flex items-center justify-between opacity-0 animate-fade-in [animation-fill-mode:forwards]">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                            <UserCheck className="size-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-foreground">Ubah Profil Siswa</h1>
                            <p className="text-sm text-muted-foreground mt-1">Lakukan pembaruan pada data pengguna ini.</p>
                        </div>
                    </div>
                    <Button variant="outline" asChild className="rounded-full shadow-sm hover:-translate-y-0.5 transition-all">
                        <Link href="/admin/students">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <div className="bg-card shadow-sm border rounded-2xl p-6 sm:p-8 opacity-0 animate-fade-in [animation-delay:100ms] [animation-fill-mode:forwards]">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-3">
                            <label htmlFor="nis" className="text-sm font-bold text-muted-foreground block">
                                Nomor Induk Siswa (NIS)
                            </label>
                            <input
                                id="nis"
                                type="text"
                                className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 ring-offset-background file:border-0 file:bg-transparent placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-shadow focus:shadow-md"
                                value={data.nis}
                                onChange={(e) => setData('nis', e.target.value)}
                                placeholder="Masukkan NIS unik siswa..."
                            />
                            {errors.nis && <p className="text-sm font-medium text-destructive mt-1">{errors.nis}</p>}
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="name" className="text-sm font-bold text-muted-foreground block">
                                Nama Lengkap
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 ring-offset-background file:border-0 file:bg-transparent placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-shadow focus:shadow-md"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Sesuai kartu identitas pelajar..."
                            />
                            {errors.name && <p className="text-sm font-medium text-destructive mt-1">{errors.name}</p>}
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="class" className="text-sm font-bold text-muted-foreground block">
                                Rombongan Belajar (Kelas)
                            </label>
                            <input
                                id="class"
                                type="text"
                                className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 ring-offset-background file:border-0 file:bg-transparent placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-shadow focus:shadow-md"
                                value={data.class}
                                onChange={(e) => setData('class', e.target.value)}
                                placeholder="Cth: XII RPL 1"
                            />
                            {errors.class && <p className="text-sm font-medium text-destructive mt-1">{errors.class}</p>}
                        </div>

                        <div className="pt-4 flex gap-4">
                            <Button type="button" variant="outline" asChild className="rounded-full flex-1">
                                <Link href="/admin/students">Batal</Link>
                            </Button>
                            <Button type="submit" disabled={processing} className="rounded-full flex-1 shadow-md hover:-translate-y-0.5 transition-all">
                                {processing ? 'Menyimpan...' : 'Perbarui Profil'}
                            </Button>
                        </div>
                    </form>
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

Edit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Siswa', href: '/admin/students' },
        { title: 'Edit', href: '#' },
    ],
};
