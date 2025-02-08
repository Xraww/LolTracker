export default function Loading() {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-black via-[#1F1F1F] to-lol-gold/20 bg-opacity-95 z-50">
            <div className="flex flex-col items-center gap-8">
                <div className="flex items-center gap-0.5">
                    <span className="text-lol-gold text-3xl font-black animate-pulse">GG</span>
                    <span className="text-white/90 text-3xl font-black">.</span>
                    <span className="text-white/90 text-3xl font-black">TRACKER</span>
                </div>

                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 border-4 border-lol-gold rounded-full animate-ping opacity-75"></div>
                </div>

                <div className="flex gap-2">
                    <div className="w-3 h-3 bg-lol-gold rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-3 h-3 bg-lol-gold rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-3 h-3 bg-lol-gold rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
    );
}