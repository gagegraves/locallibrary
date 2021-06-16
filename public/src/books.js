function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);                        //input an author ID to output the matching author's info
}

function findBookById(books, id) {                                         //input a book ID to output matching book info
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const loanedBooks = [];                                                  //emtpy arrays to be filled with the book info and combined into the final return array
  const notLoanedBooks = [];
  const finalBookArray = [];
  books.forEach((book) => {                                                //loops through every book
    const borrowedBooks = book.borrows.filter((transaction) => {
      return !transaction.returned;                                        //checks to see if the book is returned
    });
    if (borrowedBooks.length > 0) {                                        //if borrowed, push to loaned out array
      loanedBooks.push(book);
    } else notLoanedBooks.push(book);                                      //if not borrowed, push to not loaned out array
  });
  finalBookArray.push(loanedBooks, notLoanedBooks);                        //push both separate arrays into a final array and return it
  return finalBookArray;
}

function getBorrowersForBook(book, accounts) {
  const borrowed = book.borrows;
  const result = borrowed.map((borrow) => {                               //set a new array that loops through what books are borrowed
    const account = accounts.find((account) => borrow.id === account.id); //if borrowed, find the account id that matches
    return { ...borrow, ...account };                                     //spread info into a new object
  });
  result.length = 10;                                                     //limit length to ten items and return
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
