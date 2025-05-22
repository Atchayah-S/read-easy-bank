
import { Book } from "@/types";
import { Database } from "@/integrations/supabase/types";

/**
 * Maps database book records to frontend Book type
 */
export const mapDatabaseBookToBook = (
  dbBook: Database["public"]["Tables"]["books"]["Row"]
): Book => {
  return {
    id: dbBook.id,
    title: dbBook.title,
    author: dbBook.author,
    coverImage: dbBook.cover_image || "",
    description: dbBook.description || "",
    genre: dbBook.genre,
    publishedYear: dbBook.published_year || new Date().getFullYear(),
    available: dbBook.available_copies > 0,
    totalCopies: dbBook.total_copies,
    availableCopies: dbBook.available_copies
  };
};

/**
 * Maps frontend Book type to database format for inserts/updates
 */
export const mapBookToDatabaseBook = (
  book: Partial<Book>
): Partial<Database["public"]["Tables"]["books"]["Insert"]> => {
  return {
    title: book.title,
    author: book.author,
    cover_image: book.coverImage,
    description: book.description,
    genre: book.genre,
    published_year: book.publishedYear,
    total_copies: book.totalCopies,
    available_copies: book.availableCopies
  };
};
