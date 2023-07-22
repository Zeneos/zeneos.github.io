document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const query = document.getElementById('search-input').value;
    fetch(`https://springbok-umbrella.cyclic.app/skins/search?q=${query}`)
        .then(response => response.json())
        .then(skins => {
            const resultsList = document.getElementById('results-list');
            // Clear old results
            while (resultsList.firstChild) {
                resultsList.firstChild.remove();
            }
            // Add new results
            for (let skin of skins) {
                const li = document.createElement('li');
                const img = document.createElement('img');
                img.alt = `${skin.champion} ${skin.skinName} splash art`;
                li.textContent = `${skin.champion}: ${skin.skinName}`;

                // Construct the local image file path
                let localImagePath = `images/${skin.champion}_${skin.skinName}.jpg`;
                img.src = localImagePath;

                li.appendChild(img);
                resultsList.appendChild(li);
            }
        });
});
