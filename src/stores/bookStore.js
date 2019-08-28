import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class BookStore {
  statusMessage = "";
  books = [];

  query = "";

  loading = true;

  fetchBooks = async () => {
    try {
      const res = await axios.get(
        "https://the-index-api.herokuapp.com/api/books/"
      );

      const books = res.data;
      this.books = books;
      this.loading = false;
    } catch (err) {}
  };

  addBook = async newBook => {
    try {
      const res = await instance.post("/api/books/", newBook);
      console.log("[BookStore.js] Return Value:", res.data);
      this.books.push(res.data);
      this.error = null;
    } catch (err) {
      this.statusMessage = err;
    }
  };

  get filteredBooks() {
    return this.books.filter(book => {
      return book.title.toLowerCase().includes(this.query.toLowerCase());
    });
  }

  getBookById = id => this.books.find(book => +book.id === +id);

  getBooksByColor = color =>
    this.filteredBooks.filter(book => book.color === color);
}

decorate(BookStore, {
  books: observable,
  query: observable,
  loading: observable,
  filteredBooks: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
