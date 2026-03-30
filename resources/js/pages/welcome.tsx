import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { Activity, ShieldCheck, Zap, ChevronRight } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome to tor monitor stella">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>
            
            {/* Main Background with soft gradient */}
            <div className="relative min-h-screen font-sans bg-background text-foreground overflow-hidden flex flex-col items-center selection:bg-primary selection:text-primary-foreground">
                
                {/* Decorative background blur blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-pulse duration-10000"></div>
                    <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-pulse duration-7000"></div>
                </div>

                {/* Header */}
                <header className="relative z-10 w-full max-w-7xl px-6 py-6 flex justify-between items-center opacity-0 animate-fade-in [animation-delay:200ms] [animation-fill-mode:forwards]">
                    <div className="flex items-center">
                        <span className="font-black tracking-tight text-2xl text-primary uppercase drop-shadow">
                            tor monitor stella
                        </span>
                    </div>

                    <nav className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20 active:scale-95"
                            >
                                <span>Dashboard</span>
                                <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ) : (
                            <Link
                                href={login()}
                                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20 active:scale-95"
                            >
                                <span>Log in</span>
                                <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        )}
                    </nav>
                </header>

                {/* Main Content */}
                <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-5xl px-6 py-12 text-center">
                    
                    {/* Badge */}
                    <div className="mb-6 opacity-0 animate-fade-in [animation-delay:300ms] [animation-fill-mode:forwards]">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                            <span className="relative flex size-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                              <span className="relative inline-flex rounded-full size-2 bg-primary"></span>
                            </span>
                            System Operational
                        </span>
                    </div>

                    {/* Hero Text */}
                    <h1 className="max-w-3xl text-4xl leading-tight md:text-6xl font-bold tracking-tight mb-6 opacity-0 animate-fade-in [animation-delay:500ms] [animation-fill-mode:forwards]">
                        Intelligent Monitoring for <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Modern Infrastructure</span>
                    </h1>
                    
                    <p className="max-w-2xl text-lg text-muted-foreground mb-10 opacity-0 animate-fade-in [animation-delay:700ms] [animation-fill-mode:forwards]">
                        tor monitor stella provides real-time insights, beautiful analytics, and seamless control over your entire stack in a cozy, distraction-free environment.
                    </p>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl opacity-0 animate-fade-in [animation-delay:900ms] [animation-fill-mode:forwards]">
                        {/* Card 1 */}
                        <div className="flex flex-col items-start p-6 text-left rounded-2xl bg-card border border-border/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20 group">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Activity className="size-6" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2 text-card-foreground">Real-time Metrics</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Monitor your application topology instantly with our low-latency data pipelines and gorgeous visualizations.
                            </p>
                        </div>
                        
                        {/* Card 2 */}
                        <div className="flex flex-col items-start p-6 text-left rounded-2xl bg-card border border-border/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20 group">
                            <div className="p-3 rounded-xl bg-secondary/10 text-secondary mb-4 group-hover:scale-110 transition-transform duration-300">
                                <ShieldCheck className="size-6" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2 text-card-foreground">Secure by Design</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Built with top-tier encryption and security practices to ensure your monitoring data remains completely private.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="flex flex-col items-start p-6 text-left rounded-2xl bg-card border border-border/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20 group">
                            <div className="p-3 rounded-xl bg-accent/20 text-accent-foreground mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Zap className="size-6" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2 text-card-foreground">Zero Configuration</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Get started immediately. Our smart agents auto-detect your stack and configure optimal dashboards automatically.
                            </p>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="relative z-10 w-full py-6 text-center text-sm text-muted-foreground opacity-0 animate-fade-in [animation-delay:1100ms] [animation-fill-mode:forwards]">
                    <p>&copy; {new Date().getFullYear()} tor monitor stella. All rights reserved.</p>
                </footer>
            </div>
            
            {/* Minimal inline styles for the fade-in animation */}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
            `}</style>
        </>
    );
}
