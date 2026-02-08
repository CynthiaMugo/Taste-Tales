import cookingData from "../mockData/recipe.json";

function Recipes() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cookingData.map((entry) => (
        <div key={entry.id} className="bg-white rounded shadow p-4 flex flex-col">
          {entry.image && (
            <img
              src={entry.image}
              alt={entry.title}
              className="w-full h-32 object-cover rounded mb-2"
            />
          )}
          <h3 className="font-bold text-lg">{entry.title}</h3>
          <p className="text-gray-600 text-sm">Time: {entry.timeSpent} mins</p>
          <p className="text-gray-600 text-sm">Rating: {entry.rating}/5</p>
          <p className="text-gray-700 mt-2">{entry.notes}</p>
        </div>
      ))}
    </div>
  );
}
export default Recipes;