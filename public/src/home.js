function getTotalBooksCount(books) {
  return books.length;                                                            //returns a books number of borrows
}

function getTotalAccountsCount(accounts) {
  return accounts.length;                                                         //returns total number of accounts
}

function getBooksBorrowedCount(books) {
  let borrowedCount = 0;
  books.forEach((book) => {                                                       //loops through all books
    let checkedOut = book.borrows.some((transaction) => !transaction.returned);   //checks if a book is borrowed
    if (checkedOut) borrowedCount++;                                              //increments a counter of total books borrowed by 1 if a book is borrowed
  });
  return borrowedCount;                                                           //return total borrow counter
}

function getMostCommonGenres(books) {
  let genres = [];                                                                //empty array to return with requested values
  books.forEach((book) => {                                                       //loops through all books
    let genreIndex = genres.findIndex((genre) => {                                
      return genre.name === book.genre;                                           
    });
    if (genreIndex !== -1) {                                                      //if a genre already exists in our new array, add 1 to its counter
      genres[genreIndex].count++;
    } else {
      genres.push({ name: book.genre, count: 1 });                                //if a new genre appears, add it to the array with a counter value of 1
    }
  });
  genres.sort((a, b) => b.count - a.count);                                       //sort genres by count
  return genres.slice(0, 5);                                                      //limit genres array to 5 objects
}

function getMostPopularBooks(books) {
  let popularBooks = [];                                                          //defining empty array to return at end of function
  books.forEach((book) => {                                                       //loops through all books
    popularBooks.push({ name: book.title, count: book.borrows.length });          //pushes every book title along with its amount of borrows in an object to the empty array
  });
  popularBooks.sort((a, b) => b.count - a.count);                                 //sorts the array by largest amount of borrows
  return popularBooks.slice(0, 5);                                                //limits array to top 5 most borrowed books
}

function _sortObjByValues(obj) {                                                  //helper function that sorts objects by the value of their keys from largest to smallest value
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    }
  });
}

function getMostPopularAuthors(books, authors) {
  const checkoutCount = books.reduce((acc, { authorId, borrows }) => {            //reduce method to create an array with just the info we need
    if (acc[authorId]) {                                                          //if the array already has the author of the book we're looping through, adds the number of borrows from that book as a separate value in an array with the author ID as the key
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];                                           //if the array doesnt have the author of the book we're looping thorugh, add the author and that books borrow count as an object to the array
    }
    return acc;
  }, {});

  for (let id in checkoutCount) {                                                 //loops through our new array of objects to add all of the borrows under an author ID key together, for every author ID key
    const sumOfBorrows = checkoutCount[id].reduce((a, b) => a + b);
    checkoutCount[id] = sumOfBorrows;
  }

  const authorsRanked = _sortObjByValues(checkoutCount);                          //uses the helper function to rank authors by highest number of borrows 

  return authorsRanked.map((authorId) => {                                        //returns a formatted array of the top 5 authors
      const {name: { first, last }} = authors.find(({ id }) => id == authorId);
      let name = `${first} ${last}`;
      return { name, count: checkoutCount[authorId] };
    })
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
