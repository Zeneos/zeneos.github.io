const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search');
const resultsList = document.getElementById('results');

searchButton.addEventListener('click', async () => {
    const query = searchInput.value;
    const response = await fetch(`https://leagueskindatabase-b3d3c4a5ccc1.herokuapp.com/skins/search?q=${query}`);
    const skins = await response.json();
    resultsList.innerHTML = '';
    for (let skin of skins) {
        const li = document.createElement('li');
        li.textContent = `${skin.champion}: ${skin.skinName}`;
        resultsList.appendChild(li);
    }
});
