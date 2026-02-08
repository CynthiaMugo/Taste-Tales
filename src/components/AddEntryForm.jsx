import { useState } from "react";
import ImageUploader from "../components/ImageUploader";

export default function AddCookingEntry({ onAdd }) {
  const [title, setTitle] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      id: Date.now().toString(),
      title,
      timeSpent: Number(timeSpent),
      ingredients: ingredients.split(",").map((i) => i.trim()),
      notes,
      rating: 0,
      date: new Date().toISOString(),
      image,
    });

    // Clear form
    setTitle("");
    setTimeSpent("");
    setIngredients("");
    setNotes("");
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Dish Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered"
        required
      />
      <input
        type="number"
        placeholder="Time Spent (minutes)"
        value={timeSpent}
        onChange={(e) => setTimeSpent(e.target.value)}
        className="input input-bordered"
        required
      />
      <input
        type="text"
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="input input-bordered"
        required
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="textarea textarea-bordered"
      />
      <ImageUploader onChange={setImage} />
      <button type="submit" className="btn btn-primary mt-2">
        Add Entry
      </button>
    </form>
  );
}
