import { Clock, Star, Pencil, Trash2 } from "lucide-react";

function RecipeCard({ recipe, onEdit, onDelete }) {
  return (
    <div className="bg-[#FAF9F4] rounded-2xl overflow-hidden border border-stone-200 hover:shadow-xl hover:border-[#6B7F3F] transition">
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-lg text-[#7A3E24]">
          {recipe.title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-stone-600">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {recipe.timeSpent} min
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            {recipe.rating}/5
          </span>
        </div>

        <p className="text-sm text-stone-700 line-clamp-3">
          {recipe.notes}
        </p>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => onEdit(recipe)}
            className="text-stone-500 hover:text-black"
          >
            <Pencil className="w-4 h-4 " />
          </button>
          <button
            onClick={() => onDelete(recipe.id)}
            className="text-stone-500 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
