const StatsCards = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500">Total Produksi</p>
                <h3 className="mt-3 text-3xl font-semibold text-gray-900">
                    {stats.totalProduksi.toLocaleString('id-ID')}
                </h3>
                <p className="mt-2 text-sm text-gray-500">Unit diproduksi</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500">Jenis Part</p>
                <h3 className="mt-3 text-3xl font-semibold text-gray-900">
                    {stats.totalJenis.toLocaleString('id-ID')}
                </h3>
                <p className="mt-2 text-sm text-gray-500">Variasi part</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500">Bulan Ini</p>
                <h3 className="mt-3 text-3xl font-semibold text-gray-900">
                    {stats.bulanIni.toLocaleString('id-ID')}
                </h3>
                <p className="mt-2 text-sm text-gray-500">Unit diproduksi</p>
            </div>
        </div>
    );
}

export default StatsCards;