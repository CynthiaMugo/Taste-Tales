import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import BookCard from "../components/BookCard";
import ItemModal from "../components/ItemModal";
import booksData from "../mockData/books.json";

const STORAGE_KEY = "book-journal";

const loadBooks = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : booksData;
};

function Books() {
  const [books, setBooks] = useState(loadBooks);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    image: "",
    rating: "",
    notes: "",    // maps to "thoughts"
    mood: "",
    status: "",
    date: "",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const openAdd = () => {
    setFormData({
      title: "",
      author: "",
      image: "",
      rating: "",
      notes: "",
      mood: "",
      status: "",
      date: "",
    });
    setEditingId(null);
    setIsOpen(true);
  };

  const openEdit = (book) => {
    setFormData(book);
    setEditingId(book.id);
    setIsOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      setBooks((prev) =>
        prev.map((b) =>
          b.id === editingId ? { ...formData, id: editingId } : b
        )
      );
    } else {
      setBooks((prev) => [
        { ...formData, id: Date.now().toString() },
        ...prev,
      ]);
    }
    setIsOpen(false);
  };

  return (
    <div className="min-h-[90vh] bg-[#F6F5EE] px-6 py-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <h1 className="text-2xl font-semibold text-[#7A3E24]">
          Book Journal
        </h1>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#6B7F3F] text-white px-4 py-2 rounded-xl"
        >
          <Plus className="w-4 h-4" />
          Add book
        </button>
      </div>

      {/* Books grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={openEdit}
            onDelete={(id) =>
              setBooks((prev) => prev.filter((b) => b.id !== id))
            }
          />
        ))}
      </div>

      {/* Modal */}
      <ItemModal
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

export default Books;
