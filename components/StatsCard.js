const StatsCards = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-blue-100 text-sm font-medium">Total Produksi</p>
                        <h3 className="text-3xl font-bold mt-2">
                            {stats.totalProduksi.toLocaleString('id-ID')}
                        </h3>
                        <p className="text-blue-100 text-xs mt-1">Unit diproduksi</p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                        📦
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-cyan-100 text-sm font-medium">Jenis Part</p>
                        <h3 className="text-3xl font-bold mt-2">
                            {stats.totalJenis.toLocaleString('id-ID')}
                        </h3>
                        <p className="text-cyan-100 text-xs mt-1">Variasi part</p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                        🔩
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-purple-100 text-sm font-medium">Bulan Ini</p>
                        <h3 className="text-3xl font-bold mt-2">
                            {stats.bulanIni.toLocaleString('id-ID')}
                        </h3>
                        <p className="text-purple-100 text-xs mt-1">Unit diproduksi</p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                        📅
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatsCards;