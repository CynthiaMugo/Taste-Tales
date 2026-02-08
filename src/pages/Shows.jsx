import showsData from "../mockData/shows.json";

export default function Shows() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {showsData.map((show) => (
        <div key={show.id} className="bg-white rounded shadow p-4 flex flex-col">
          {show.image && (
            <img
              src={show.image}
              alt={show.title}
              className="w-full h-32 object-cover rounded mb-2"
            />
          )}
          <h3 className="font-bold text-lg">{show.title}</h3>
          <p className="text-gray-600 text-sm">Platform: {show.platform}</p>
          <p className="text-gray-600 text-sm">Episodes: {show.episodes}</p>
          <p className="text-gray-600 text-sm">Rating: {show.rating}/5</p>
          <p className="text-gray-700 mt-2">{show.thoughts}</p>
        </div>
      ))}
    </div>
  );
}
