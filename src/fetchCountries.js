export function fetchCountriesByName(searchName) {
  const url = `https://restcountries.com/v3.1/name/${searchName}?fields=name,capital,languages,population,flags`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
