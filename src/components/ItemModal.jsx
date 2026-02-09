function ItemModal({ isOpen, onClose, onSave, formData, onChange, isEditing }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {isEditing ? "Edit entry" : "New entry"}
        </h2>

        {/* Title */}
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={onChange}
          className="w-full mb-3 p-2 border rounded"
        />

        {/* Author */}
        <input
          name="author"
          placeholder="Author / Creator"
          value={formData.author || ""}
          onChange={onChange}
          className="w-full mb-3 p-2 border rounded"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onloadend = () =>
              onChange({ target: { name: "image", value: reader.result } });
            reader.readAsDataURL(file);
          }}
          className="w-full mb-3 p-2 border rounded"
        />

        {/* Preview */}
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="w-full h-40 object-cover rounded-lg mb-3"
          />
        )}

        {/* Mood */}
        <input
          name="mood"
          placeholder="Mood"
          value={formData.mood || ""}
          onChange={onChange}
          className="w-full mb-3 p-2 border rounded"
        />

        {/* Status
        <input
          name="status"
          placeholder="Status (Reading, Watched, Plan to watch)"
          value={formData.status || ""}
          onChange={onChange}
          className="w-full mb-3 p-2 border rounded"
        /> */}

        {/* Rating */}
        <input
          name="rating"
          placeholder="Rating (1-5)"
          value={formData.rating || ""}
          onChange={onChange}
          className="w-full mb-3 p-2 border rounded"
        />

        {/* Thoughts */}
        <textarea
          name="notes"
          placeholder="Thoughts"
          value={formData.notes || ""}
          onChange={onChange}
          className="w-full mb-3 p-2 border rounded"
        />

        {/* Date */}
        <input
          name="date"
          placeholder="Date (YYYY-MM-DD)"
          value={formData.date || ""}
          onChange={onChange}
          className="w-full mb-3 p-2 border rounded"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-stone-500">
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-[#6B7F3F] text-white px-4 py-2 rounded-xl"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
