import { Link } from "react-router-dom";
import { ChefHat, BookOpen, Film, ArrowRight } from "lucide-react";


function Home() {
  return (
    <div className="min-h-[90vh] bg-[#F6F5EE] flex flex-col items-center justify-center px-6">

      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#7A3E24]">
          A quiet place to keep what you love
        </h1>
        <p className="mt-4 text-stone-600 text-sm md:text-base">
          A personal journal for meals you experimented with, books that stayed with you,
          and shows that made you feel something.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">

        <Link
          to="/recipes"
          className="bg-[#FAF9F4] p-8 rounded-2xl border border-stone-200
                     hover:shadow-xl hover:border-[#6B7F3F]
                     transition-all duration-300 flex flex-col items-center text-center">
          <ChefHat className="w-12 h-12 text-[#7A3E24]" />
          <h2 className="mt-5 font-semibold text-lg text-[#7A3E24]">
            Cooking Journal
          </h2>
          <p className="mt-3 text-sm text-stone-600">
            What you cooked, what you tweaked, and what you'd do differently next time.
          </p>
          <div className="mt-6 flex items-center gap-1 text-[#6B7F3F] font-medium text-sm">
            Start cooking <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        <Link
          to="/books"
          className="bg-[#FAF9F4] p-8 rounded-2xl border border-stone-200
                     hover:shadow-xl hover:border-[#6B7F3F]
                     transition-all duration-300 flex flex-col items-center text-center">
          <BookOpen className="w-12 h-12 text-[#7A3E24]" />
          <h2 className="mt-5 font-semibold text-lg text-[#7A3E24]">
            Reading Journal
          </h2>
          <p className="mt-3 text-sm text-stone-600">
            Track what you read, your favorite quotes, and how each story lingered.
          </p>
          <div className="mt-6 flex items-center gap-1 text-[#6B7F3F] font-medium text-sm">
            Open a book <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        <Link
          to="/shows"
          className="bg-[#FAF9F4] p-8 rounded-2xl border border-stone-200
                     hover:shadow-xl hover:border-[#6B7F3F]
                     transition-all duration-300 flex flex-col items-center text-center">
          <Film className="w-12 h-12 text-[#7A3E24]" />
          <h2 className="mt-5 font-semibold text-lg text-[#7A3E24]">
            Shows Journal
          </h2>
          <p className="mt-3 text-sm text-stone-600">
            Remember characters, emotions, and moments you didn't want to forget.
          </p>
          <div className="mt-6 flex items-center gap-1 text-[#6B7F3F] font-medium text-sm">
            Continue watching <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

      </div>
    </div>
  );
}

export default Home;
