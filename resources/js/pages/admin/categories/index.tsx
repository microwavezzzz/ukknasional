import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, Plus, Tag, Trash2, FolderOpen } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Category {
    id: number;
    name: string;
    aspirations_count: number;
}

interface PageProps {
    categories: Category[];
    flash?: { message?: string };
    errors?: { delete?: string };
}

export default function Index({ categories, flash, errors }: PageProps) {
    const [addOpen, setAddOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<Category | null>(null);

    // Add form
    const addForm = useForm({ name: '' });

    // Edit form
    const editForm = useForm({ name: '' });

    function openEdit(category: Category) {
        setEditTarget(category);
        editForm.setData('name', category.name);
    }

    function handleAdd(e: React.FormEvent) {
        e.preventDefault();
        addForm.post('/admin/categories', {
            onSuccess: () => {
                setAddOpen(false);
                addForm.reset();
            },
        });
    }

    function handleEdit(e: React.FormEvent) {
        e.preventDefault();

        if (!editTarget) {
            return;
        }

        editForm.put(`/admin/categories/${editTarget.id}`, {
            onSuccess: () => setEditTarget(null),
        });
    }

    function handleDelete(category: Category) {
        if (!confirm(`Hapus kategori "${category.name}"?`)) {
            return;
        }

        router.delete(`/admin/categories/${category.id}`);
    }

    return (
        <>
            <Head title="Kelola Kategori" />

            <div className="flex flex-1 flex-col gap-6 p-6 mx-auto max-w-6xl w-full">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 opacity-0 animate-fade-in [animation-fill-mode:forwards]">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                            <Tag className="size-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-foreground">Kategori Pengaduan</h1>
                            <p className="text-sm text-muted-foreground mt-1">Kelola topik utama saluran aspirasi siswa secara efisien.</p>
                        </div>
                    </div>
                    <Button 
                        onClick={() => setAddOpen(true)} 
                        className="rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 w-full sm:w-auto font-semibold px-6"
                    >
                        <Plus className="mr-2 h-5 w-5" />
                        Tambah Kategori
                    </Button>
                </div>

                {/* Alerts */}
                {flash?.message && (
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-primary font-medium opacity-0 animate-fade-in [animation-delay:100ms] [animation-fill-mode:forwards] flex items-center shadow-sm">
                        <div className="size-2 rounded-full bg-primary animate-pulse mr-3"></div>
                        {flash.message}
                    </div>
                )}

                {errors?.delete && (
                    <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-destructive font-medium opacity-0 animate-fade-in [animation-delay:100ms] [animation-fill-mode:forwards] flex items-center shadow-sm">
                        <div className="size-2 rounded-full bg-destructive animate-pulse mr-3"></div>
                        {errors.delete}
                    </div>
                )}

                {/* Category List */}
                <div className="flex flex-col gap-3 mt-2">
                    {categories.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-muted rounded-2xl bg-card/50 opacity-0 animate-fade-in [animation-delay:200ms] [animation-fill-mode:forwards]">
                            <FolderOpen className="size-12 text-muted-foreground mb-4 opacity-50" />
                            <h3 className="text-lg font-bold text-foreground mb-1">Penyimpanan Kategori Kosong</h3>
                            <p className="text-sm text-muted-foreground max-w-sm">Tampaknya belum ada kategori. Buat kategori pertamamu sekarang untuk menerima aspirasi.</p>
                        </div>
                    ) : (
                        categories.map((cat, index) => (
                            <div 
                                key={cat.id} 
                                className="group flex items-center justify-between p-5 bg-card border shadow-sm rounded-2xl hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300 opacity-0 animate-fade-in [animation-fill-mode:forwards]"
                                style={{ animationDelay: `${(index + 1) * 100 + 100}ms` }}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 min-w-0">
                                    <h3 className="text-base font-semibold truncate text-card-foreground">
                                        {cat.name}
                                    </h3>
                                    <div>
                                        <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-bold whitespace-nowrap">
                                            {cat.aspirations_count} <span className="ml-1 opacity-70 font-medium">Aspirasi</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0 ml-4 opacity-100 sm:opacity-50 sm:group-hover:opacity-100 transition-opacity">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-full shadow-sm"
                                        onClick={() => openEdit(cat)}
                                    >
                                        <Pencil className="h-4 w-4 sm:mr-1.5" />
                                        <span className="hidden sm:inline">Edit</span>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="rounded-full shadow-sm"
                                        onClick={() => handleDelete(cat)}
                                        disabled={cat.aspirations_count > 0}
                                        title={cat.aspirations_count > 0 ? 'Tidak bisa dihapus karena masih digunakan' : undefined}
                                    >
                                        <Trash2 className="h-4 w-4 sm:mr-1.5" />
                                        <span className="hidden sm:inline">Hapus</span>
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Add Dialog */}
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogContent className="sm:max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Buat Kategori Baru</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAdd}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-3">
                                <Label htmlFor="add-name" className="text-muted-foreground font-semibold">Nama Indikator Aspirasi</Label>
                                <Input
                                    id="add-name"
                                    value={addForm.data.name}
                                    onChange={(e) => addForm.setData('name', e.target.value)}
                                    placeholder="Cth: Fasilitas Umum, Kantin..."
                                    className="rounded-xl h-12"
                                    autoFocus
                                />
                                {addForm.errors.name && (
                                    <p className="text-sm text-destructive font-medium">{addForm.errors.name}</p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" className="rounded-full" onClick={() => setAddOpen(false)}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={addForm.processing} className="rounded-full">
                                {addForm.processing ? 'Menyimpan...' : 'Simpan Kategori'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editTarget} onOpenChange={(open) => !open && setEditTarget(null)}>
                <DialogContent className="sm:max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Edit Kategori</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleEdit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-3">
                                <Label htmlFor="edit-name" className="text-muted-foreground font-semibold">Pembaruan Nama Kategori</Label>
                                <Input
                                    id="edit-name"
                                    value={editForm.data.name}
                                    onChange={(e) => editForm.setData('name', e.target.value)}
                                    className="rounded-xl h-12"
                                    autoFocus
                                />
                                {editForm.errors.name && (
                                    <p className="text-sm text-destructive font-medium">{editForm.errors.name}</p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" className="rounded-full" onClick={() => setEditTarget(null)}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={editForm.processing} className="rounded-full">
                                {editForm.processing ? 'Menyimpan...' : 'Perbarui Perubahan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

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
        { title: 'Kategori', href: '/admin/categories' },
    ],
};
