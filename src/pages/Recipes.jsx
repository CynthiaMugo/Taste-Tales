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
    timeSpent: "",
    rating: "",
    notes: "",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const openAdd = () => {
    setFormData({ title: "", image: "", timeSpent: "", rating: "", notes: "" });
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

  return (
    <div className="min-h-[90vh] bg-[#F6F5EE] px-6 py-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
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
