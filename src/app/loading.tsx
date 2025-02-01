export default function GlobalLoading() {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-black via-[#1F1F1F] to-valorant-red/20 bg-opacity-95 z-50">
            <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                    <div className="flex items-center gap-0.5 scale-150">
                        <span className="text-valorant-red text-3xl font-black animate-pulse">GG</span>
                        <span className="text-white/90 text-3xl font-black">.</span>
                        <span className="text-white/90 text-3xl font-black">TRACKER</span>
                    </div>
                    <div className="absolute inset-0 border-4 border-valorant-red rounded-full animate-ping opacity-75"></div>
                </div>
                
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-valorant-red rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-3 h-3 bg-valorant-red rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-3 h-3 bg-valorant-red rounded-full animate-bounce"></div>
                </div>
                
                <p className="text-white text-lg font-medium animate-pulse">
                    Loading...
                </p>
            </div>
        </div>
    );
}