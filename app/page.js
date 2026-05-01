const Home = () => {
  return (
    <>
      <main className="min-h-screen bg-linear-to-br from-blue-50 via-cyan-50 to-indigo-50">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-screen px-8">
          <div className="text-center space-y-6 max-w-4xl">
            {/* Icon/Logo */}
            <div className="inline-block p-8 bg-white rounded-3xl border border-blue-200 shadow-lg">
              <span className="text-8xl">⚙️</span>
            </div>

            {/* Title */}
            <h1 className="text-6xl md:text-7xl font-bold bg-linear-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent">
              CNC Teaching Factory
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-700 font-light">
              Sistem Manajemen Produksi Modern untuk Industri 4.0
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center pt-8">

              <a
                href="/Produksi"
                className="px-8 py-4 bg-linear-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
                🚀 Mulai Produksi
              </a>

              <a
                href="/about"
                className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 border border-gray-200 shadow-md">
                📖 Pelajari Lebih Lanjut
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl">
            <div className="p-6 bg-white rounded-2xl border border-blue-100 shadow-md hover:shadow-lg hover:border-blue-200 transition-all duration-300">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Real-time Monitoring</h3>
              <p className="text-gray-600">Pantau produksi secara langsung dengan dashboard interaktif</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-cyan-100 shadow-md hover:shadow-lg hover:border-cyan-200 transition-all duration-300">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Manajemen Data</h3>
              <p className="text-gray-600">Kelola data produksi dengan mudah dan efisien</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-purple-100 shadow-md hover:shadow-lg hover:border-purple-200 transition-all duration-300">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Analisis Performa</h3>
              <p className="text-gray-600">Analisis statistik produksi untuk optimasi maksimal</p>
            </div>
          </div>
        </div >
      </main >
    </>
  );
}

export default Home;