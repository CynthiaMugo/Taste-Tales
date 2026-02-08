import { useState } from "react";

export default function ImageUploader({ onChange }) {
  const [preview, setPreview] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result); // base64 string
      onChange(reader.result);   // pass to parent
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <input type="file" accept="image/*" onChange={handleFile} />
      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-32 h-32 object-cover rounded shadow-sm"
        />
      )}
    </div>
  );
}
