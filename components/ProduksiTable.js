const ProduksiTable = ({ orders, onEdit, onDelete, onStatusChange, isLoading }) => {
    if (isLoading) {
        return (
            <section className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="text-center py-8 text-gray-500">Loading...</div>
            </section>
        );
    }

    return (
        <section className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <span className="text-xl">📋</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Data Produksi</h3>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                No
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Tanggal
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Nama Part
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Jumlah
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map((order, index) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-center text-sm text-gray-700">{index + 1}</td>
                                <td className="px-6 py-4 text-center text-sm text-gray-900">{order.tanggal}</td>
                                <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                                    {order.nama_part}
                                </td>
                                <td className="px-6 py-4 text-center text-sm font-semibold text-blue-600">
                                    {order.jumlah.toLocaleString('id-ID')}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {order.status ? (
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                            ✓ Selesai
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                            ⏳ Proses
                                        </span>
                                    )}
                                    <input
                                        type="checkbox"
                                        checked={order.status}
                                        onChange={(e) => onStatusChange(order.id, e.target.checked)}
                                        className="ml-2 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                    />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => onEdit(order)}
                                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all mr-2"
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(order.id)}
                                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all"
                                    >
                                        🗑️ Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default ProduksiTable;