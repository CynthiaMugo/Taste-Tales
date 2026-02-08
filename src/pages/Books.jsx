import booksData from "../mockData/books.json";

function Books() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {booksData.map((book) => (
        <div key={book.id} className="bg-white rounded shadow p-4 flex flex-col">
          {book.image && (
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-32 object-cover rounded mb-2"
            />
          )}
          <h3 className="font-bold text-lg">{book.title}</h3>
          <p className="text-gray-600 text-sm">Author: {book.author}</p>
          <p className="text-gray-600 text-sm">Rating: {book.rating}/5</p>
          <p className="text-gray-700 mt-2">{book.thoughts}</p>
        </div>
      ))}
    </div>
  );
}
export default Books;