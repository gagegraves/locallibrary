function findAccountById(accounts, id) {
  return (account = accounts.find((account) => account.id === id));                 //returns and account that matches an ID input
}

function sortAccountsByLastName(accounts) {                                         //takes 'name' value from accounts and sorts them alphabetically          
  return accounts.sort((nameA, nameB) =>
    nameA.name.last > nameB.name.last ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  let borrowedCount = 0;
  books.forEach((book) => {                                                         //loops through every book
    book.borrows.forEach((transaction) => {                                         //check the ID on every borrow and match it to an account
      if (transaction.id === account.id) borrowedCount++;                           //increment the account borrow number by one for every matched ID
    });
  });
  return borrowedCount;                                                             //return the borrows count for the account
}

function getBooksPossessedByAccount(account, books, authors) {                      
  let borrowedBooks = books.filter((book) =>                                        //filter to only books that are currently borrowed
    book.borrows.find((borrow) => !borrow.returned && borrow.id === account.id)     //matches the account ID to the book it borrowed
  );
  return borrowedBooks.map((book) => {                                              //maps the books transaction to a new array
    return {
      ...book,
      author: authors.find((author) => author.id === book.authorId),                //finds and embeds the author's info for that book, then returns everything
    };
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
