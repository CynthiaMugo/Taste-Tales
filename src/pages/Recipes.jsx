import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import cookingData from "../mockData/recipe.json";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";

const STORAGE_KEY = "cooking-journal";

const loadRecipes = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : cookingData;
};

function Recipes() {
  const [recipes, setRecipes] = useState(loadRecipes);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [apiResults, setApiResults] = useState([]);
  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({
    title: "",
    image: "",
    timeSpent: "",
    rating: "",
    notes: "",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const openAdd = () => {
    setFormData({ title: "", image: "", ingredients: "", timeSpent: "", rating: "", notes: "" });
    setEditingId(null);
    setIsOpen(true);
  };

  const openEdit = (recipe) => {
    setFormData(recipe);
    setEditingId(recipe.id);
    setIsOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      setRecipes((prev) =>
        prev.map((r) => (r.id === editingId ? { ...formData, id: editingId } : r))
      );
    } else {
      setRecipes((prev) => [
        { ...formData, id: Date.now().toString() },
        ...prev,
      ]);
    }
    setIsOpen(false);
  };
  const searchRecipes = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await res.json();
      setApiResults(data.meals || []);
    } catch (error) {
      console.error("Recipe search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] bg-[#F6F5EE] px-6 py-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex gap-3 max-w-xl">
            <input
              type="text"
              placeholder="Search recipes online…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6B7F3F]"
            />

            <button
              onClick={searchRecipes}
              className="bg-[#6B7F3F] text-white px-4 rounded-xl hover:opacity-90"
            >
              Search
            </button>
          </div>
        </div>
        {loading && (
          <p className="max-w-6xl mx-auto text-gray-600 mb-6">
            Searching recipes…
          </p>
        )}

        {apiResults.length > 0 && (
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-xl font-semibold text-[#7A3E24] mb-6">
              Search Results
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {apiResults.map((meal) => (
                <div
                  key={meal.idMeal}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4"
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-56 object-cover rounded-xl mb-3"
                  />

                  <h3 className="font-semibold text-lg">{meal.strMeal}</h3>
                  <p className="text-sm text-gray-500 mb-3">{meal.strArea}</p>

                  <button
                    onClick={() =>
                      setRecipes((prev) => [
                        {
                          id: Date.now().toString(),
                          title: meal.strMeal,
                          image: meal.strMealThumb,
                          timeSpent: "",
                          rating: "",
                          notes: "Saved from online search",
                        },
                        ...prev,
                      ])
                    }
                    className="text-sm text-[#6B7F3F] hover:underline"
                  >
                    Save to my journal
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <h1 className="text-2xl font-semibold text-[#7A3E24]">
          Cooking Journal
        </h1>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#6B7F3F] text-white px-4 py-2 rounded-xl">
          <Plus className="w-4 h-4 " />
          Add recipe
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onEdit={openEdit}
            onDelete={(id) =>
              setRecipes((prev) => prev.filter((r) => r.id !== id))
            }
          />
        ))}
      </div>

      <RecipeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
        formData={formData}
        onChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        isEditing={!!editingId}
      />
    </div>
  );
}

export default Recipes;
