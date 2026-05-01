const StockTable = ({ stokData }) => {
  const stokKeys = Object.keys(stokData);

  return (
    <section className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
            <span className="text-xl">📊</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800">Rekap Stok</h3>
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
                Nama Part
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Total Unit
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {stokKeys.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 py-8">
                  Belum ada data stok
                </td>
              </tr>
            ) : (
              stokKeys.map((key, index) => (
                <tr key={key} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{key}</td>
                  <td className="px-6 py-4 text-right text-sm font-semibold text-blue-600">
                    {stokData[key].toLocaleString('id-ID')} unit
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default StockTable;