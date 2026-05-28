import { AlertTriangle, RefreshCcw } from 'lucide-react';

const MaintenancePage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--color-bg-light),_var(--color-bg-dark))] p-4">
            <div className="max-w-md w-full bg-[#1f1b3d]/50 backdrop-blur-sm p-8 rounded-2xl border border-[#00f0ff]/20 shadow-[0_0_50px_rgba(0,240,255,0.1)] text-center">

                <div className="mb-6 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#00f0ff]/20 rounded-full blur-xl animate-pulse"></div>
                        <AlertTriangle className="w-20 h-20 text-[#00f0ff] relative z-10" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-white mb-4 animate-[pulse_3s_ease-in-out_infinite]">
                    Увага!<br />Технічні роботи
                </h1>

                <p className="text-[#a0a0c0] text-lg mb-8 leading-relaxed">
                    На сайті ведуться технічні роботи.
                    <br />
                    Приносимо вибачення за тимчасові незручності.
                </p>

                <button
                    onClick={() => window.location.reload()}
                    className="group flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 border border-[#00f0ff]/50 rounded-xl text-[#00f0ff] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                >
                    <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    <span>Оновити сторінку</span>
                </button>
            </div>
        </div>
    );
};

export default MaintenancePage;
