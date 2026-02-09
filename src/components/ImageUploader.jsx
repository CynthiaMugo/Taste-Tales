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