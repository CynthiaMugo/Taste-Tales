function RecipeModal({ isOpen, onClose, onSave, formData, onChange, isEditing,}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {isEditing ? "Edit recipe" : "New recipe"}
        </h2>

        <input
          name="title"
          placeholder="Recipe title"
          value={formData.title}
          onChange={onChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
            type="file"
            accept="image/*"
            onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = () => {
                onChange({
                    target: { name: "image", value: reader.result },
                });
                };
                reader.readAsDataURL(file);
            }}
            className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="ingredients"
          placeholder="Ingredients"
          value={formData.ingredients}
          onChange={onChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="timeSpent"
          placeholder="Time spent (mins)"
          value={formData.timeSpent}
          onChange={onChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          name="rating"
          placeholder="Rating (1-5)"
          value={formData.rating}
          onChange={onChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={onChange}
          className="w-full mb-4 p-2 border rounded"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-stone-500">
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-[#6B7F3F] text-white px-4 py-2 rounded-xl">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeModal;
