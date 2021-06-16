function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let borrowedCount = 0;
  books.forEach((book) => {
    let checkedOut = book.borrows.some((transaction) => !transaction.returned);
    if (checkedOut) borrowedCount++;
  });
  return borrowedCount;
}

function getMostCommonGenres(books) {
  let genres = [];
  books.forEach((book) => {
    let genreIndex = genres.findIndex((genre) => {
      return genre.name === book.genre;
    });
    if (genreIndex !== -1) {
      genres[genreIndex].count++;
    } else {
      genres.push({ name: book.genre, count: 1 });
    }
  });
  genres.sort((a, b) => b.count - a.count);
  return genres.slice(0, 5);
}

function getMostPopularBooks(books) {
  let popularBooks = [];
  books.forEach((book) => {
    popularBooks.push({ name: book.title, count: book.borrows.length });
  });
  popularBooks.sort((a, b) => b.count - a.count);
  return popularBooks.slice(0, 5);
}

function _sortObjByValues(obj) {
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
  const checkoutCount = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }
    return acc;
  }, {});

  for (let id in checkoutCount) {
    const sum = checkoutCount[id].reduce((a, b) => a + b);
    checkoutCount[id] = sum;
  }

  const authorsRanked = _sortObjByValues(checkoutCount);

  return authorsRanked.map((authorId) => {
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
