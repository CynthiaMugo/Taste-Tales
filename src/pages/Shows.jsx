import { useState, useEffect } from "react";
import { Plus, Star } from "lucide-react";
import ShowCard from "../components/ShowCard";
import ShowModal from "../components/ShowModal";
import showsData from "../mockData/shows.json";

const STORAGE_KEY = "show-journal";

const loadShows = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : showsData;
};

function Shows() {
  const [shows, setShows] = useState(loadShows);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    image: "",
    episodes: "",
    rating: "",
    thoughts: "",
    mood: "",
    date: "",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shows));
  }, [shows]);

  const openAdd = () => {
    setFormData({
      title: "",
      platform: "",
      image: "",
      episodes: "",
      rating: "",
      thoughts: "",
      mood: "",
      date: "",
    });
    setEditingId(null);
    setIsOpen(true);
  };

  const openEdit = (show) => {
    setFormData(show);
    setEditingId(show.id);
    setIsOpen(true);
  };

  const handleSave = () => {
    const newEntry = {
      ...formData,
      id: editingId || Date.now().toString(),
    };

    if (editingId) {
      setShows((prev) =>
        prev.map((s) => (s.id === editingId ? newEntry : s))
      );
    } else {
      setShows((prev) => [newEntry, ...prev]);
    }

    setIsOpen(false);
  };

  return (
    <div className="min-h-[90vh] bg-[#F6F5EE] px-6 py-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <h1 className="text-2xl font-semibold text-[#7A3E24]">
          Show Journal
        </h1>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#6B7F3F] text-white px-4 py-2 rounded-xl"
        >
          <Plus className="w-4 h-4" />
          Add show
        </button>
      </div>

      {/* Shows grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shows.map((show) => (
          <ShowCard
            key={show.id}
            show={show}
            onEdit={openEdit}
            onDelete={(id) =>
              setShows((prev) => prev.filter((s) => s.id !== id))
            }
          />
        ))}
      </div>

      {/* Modal */}
      <ShowModal
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

export default Shows;
