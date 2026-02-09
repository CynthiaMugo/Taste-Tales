import { Star, Pencil, Trash2, BookOpen } from "lucide-react";

function BookCard({ book, onEdit, onDelete }) {
  return (
    <div className="bg-[#FAF9F4] rounded-2xl overflow-hidden border border-stone-200 hover:shadow-xl hover:border-[#6B7F3F] transition">
      {book.image && (
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-lg text-[#7A3E24]">
          {book.title}
        </h3>

        <p className="text-sm text-stone-600 italic">
          by {book.author}
        </p>

        <div className="flex items-center gap-4 text-sm text-stone-600">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            {book.rating}/5
          </span>

          {book.mood && (
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {book.mood}
            </span>
          )}
        </div>

        <p className="text-sm text-stone-700 ">
          {book.thoughts || book.notes}
        </p>

        <p className="text-xs text-stone-400">
          Finished: {book.date}
        </p>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => onEdit(book)}
            className="text-stone-500 hover:text-black"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(book.id)}
            className="text-stone-500 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
