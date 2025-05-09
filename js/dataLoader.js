// dataLoader.js
window.allGames = [];

const loadAllGames = () => {
    return fetch("../json/allGames.json")
        .then(res => res.json())
        .then(data => {
            window.allGames = data;
            return data;
        });
};
