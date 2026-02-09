import { Star, Pencil, Trash2, Tv } from "lucide-react";

function ShowCard({ show, onEdit, onDelete }) {
  return (
    <div className="bg-[#FAF9F4] rounded-2xl overflow-hidden border border-stone-200 hover:shadow-xl hover:border-[#6B7F3F] transition">
      {show.image && (
        <img
          src={show.image}
          alt={show.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-lg text-[#7A3E24]">{show.title}</h3>
        <p className="text-sm text-stone-600 italic">Platform: {show.platform}</p>
        <p className="text-sm text-stone-600">Episodes: {show.episodes}</p>

        <div className="flex items-center gap-4 text-sm text-stone-600">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            {show.rating}/5
          </span>

          {show.mood && (
            <span className="flex items-center gap-1">
              <Tv className="w-4 h-4" />
              {show.mood}
            </span>
          )}
        </div>

        <p className="text-sm text-stone-700 line-clamp-3">{show.thoughts}</p>

        <p className="text-xs text-stone-400">Finished: {show.date}</p>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => onEdit(show)}
            className="text-stone-500 hover:text-black"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(show.id)}
            className="text-stone-500 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowCard;
