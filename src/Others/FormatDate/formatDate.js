function formatDate(rawDate) {
  let date = new Date(rawDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
  const day = String(date.getDate()).padStart(2, '0');
  
  // Concatenate the year, month, and day with "-" separator to form the desired format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export default formatDate;