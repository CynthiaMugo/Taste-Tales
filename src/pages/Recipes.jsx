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
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    ingredients: "",
    timeSpent: "",
    rating: "",
    notes: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [apiResults, setApiResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  // Open modal for adding new recipe
  const openAdd = () => {
    setFormData({
      title: "",
      image: "",
      ingredients: "",
      timeSpent: "",
      rating: "",
      notes: "",
    });
    setEditingId(null);
    setIsOpen(true);
  };

  // Open modal for editing existing recipe
  const openEdit = (recipe) => {
    setFormData(recipe);
    setEditingId(recipe.id);
    setIsOpen(true);
  };

  // Save recipe (add or edit)
  const handleSave = () => {
    const normalizedData = {
      ...formData,
      ingredients: formData.ingredients
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
    };

    if (editingId) {
      setRecipes((prev) =>
        prev.map((r) => (r.id === editingId ? { ...normalizedData, id: editingId } : r))
      );
    } else {
      setRecipes((prev) => [
        { ...normalizedData, id: Date.now().toString() },
        ...prev,
      ]);
    }
    setIsOpen(false);
  };

  // Handle input change for search and clear results if empty
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (!value.trim()) setApiResults([]);
  };

  // Search meals from TheMealDB API and filter by title, ingredients, instructions
  const searchRecipes = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await res.json();

      const filteredMeals = (data.meals || []).filter((meal) => {
        const ingredients = Array.from({ length: 20 }, (_, i) => meal[`strIngredient${i + 1}`])
          .filter(Boolean)
          .join(" ");
        const instructions = meal.strInstructions || "";
        const title = meal.strMeal || "";

        const searchLower = searchTerm.toLowerCase();
        return (
          title.toLowerCase().includes(searchLower) ||
          ingredients.toLowerCase().includes(searchLower) ||
          instructions.toLowerCase().includes(searchLower)
        );
      });

      setApiResults(filteredMeals);
    } catch (error) {
      console.error("Recipe search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] bg-[#F6F5EE] px-6 py-10">
      {/* Header + Search + Add button */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-2xl font-semibold text-[#7A3E24] mb-4">
          Cooking Journal
        </h1>

        {/* Search bar */}
        <div className="flex gap-3 mb-6 max-w-xl">
          <input
            type="text"
            placeholder="Search recipes online…"
            value={searchTerm}
            onChange={handleSearchInput}
            className="flex-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6B7F3F]"
          />
          <button
            onClick={searchRecipes}
            className="bg-[#6B7F3F] text-white px-4 rounded-xl hover:opacity-90"
          >
            Search
          </button>
        </div>

        {/* Add recipe button */}
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#6B7F3F] text-white px-4 py-2 rounded-xl"
        >
          <Plus className="w-4 h-4 " />
          Add recipe
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="max-w-6xl mx-auto text-gray-600 mb-6">
          Searching recipes…
        </p>
      )}

      {/* Search results */}
      {apiResults.length > 0 && (
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-xl font-semibold text-[#7A3E24] mb-6">
            Search Results
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apiResults.map((meal) => (
              <div
                key={meal.idMeal}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col gap-3"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <h3 className="font-semibold text-lg">{meal.strMeal}</h3>
                <p className="text-sm text-gray-500 line-clamp-3">
                  {meal.strInstructions}
                </p>
                <p className="text-sm text-gray-600">
                  Ingredients:{" "}
                  {Array.from({ length: 20 }, (_, i) => meal[`strIngredient${i + 1}`])
                    .filter(Boolean)
                    .join(", ")}
                </p>
                <button
                  onClick={() =>
                    setRecipes((prev) => [
                      {
                        id: Date.now().toString(),
                        title: meal.strMeal,
                        image: meal.strMealThumb,
                        ingredients: Array.from({ length: 20 }, (_, i) => meal[`strIngredient${i + 1}`])
                          .filter(Boolean)
                          .join(", "),
                        timeSpent: "",
                        rating: "",
                        notes: "Saved from online search",
                      },
                      ...prev,
                    ])
                  }
                  className="text-sm text-[#6B7F3F] hover:underline mt-auto"
                >
                  Save to my journal
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My recipes */}
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

      {/* Recipe Modal */}
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
