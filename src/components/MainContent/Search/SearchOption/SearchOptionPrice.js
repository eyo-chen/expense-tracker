import SearchOptionUI from "./SearchOptionUI";

const searchItem = [
  { text: "0 ~ $100", value: [0, 100] },
  { text: "$100 ~ $300", value: [100, 300] },
  { text: "$300 ~ $500", value: [300, 500] },
  { text: "$500 ~ $1000", value: [500, 1000] },
  { text: "above $1000", value: [1000, Infinity] },
];

function SearchOptionPrice() {
  return (
    <SearchOptionUI dataID="price" label="price" checkboxItem={searchItem} />
  );
}

export default SearchOptionPrice;
