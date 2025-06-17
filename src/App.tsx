function App() {
  return (
    <>
      <main className="w-full min-h-screen bg-gradient-to-b from-pink-100 to-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              영채 블로그
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              이것저것 재밌는 툴을 공유하는 곳입니다
            </p>
            <div className="w-24 h-1 bg-pink-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                이 곳에 대하여
              </h2>
              <p className="text-gray-600">
                상단의 메뉴를 클릭하면 이동할 수 있습니다.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                소개
              </h2>
              <p className="text-gray-600">쓸 말이 없네요</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
