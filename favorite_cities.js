function addToFavorites(city) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favorites.includes(city)) {
    favorites.push(city);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

function displayFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favoritesList = document.getElementById('favorites-list');
  favoritesList.innerHTML = '';
  favorites.forEach(city => {
    const li = document.createElement('li');
    li.textContent = city;
    favoritesList.appendChild(li);
  });
}

function storeCitySession(city) {
  sessionStorage.setItem('selectedCity', city);
}

function getSelectedCity() {
  return sessionStorage.getItem('selectedCity');
}
