const leaderboardData = [
    { name: "Alex", points: 90 },
    { name: "Daniel", points: 75 },
    { name: "Chris", points: 60 }
];

document.addEventListener("DOMContentLoaded", () => {
    const leaderboardElement = document.getElementById("leaderboard");
    leaderboardData.forEach(user => {
        let li = document.createElement("li");
        li.textContent = `${user.name} - ${user.points} pts 🏅`;
        leaderboardElement.appendChild(li);
    });
});

function startChallenge() {
    alert("Challenge started! Get moving! 🚀");
}

document.addEventListener("DOMContentLoaded", () => {
    fetch("data/users.json") // Replace with LocalStorage logic if needed
        .then(response => response.json())
        .then(users => {
            const leaderboardData = document.getElementById("leaderboard-data");
            users.sort((a, b) => b.steps - a.steps); // Sort by step count descending
            users.forEach((user, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `<td>${index + 1}</td><td>${user.name}</td><td>${user.steps}</td>`;
                leaderboardData.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching leaderboard:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    fetch("data/users.json") // Replace with LocalStorage logic if needed
        .then(response => response.json())
        .then(user => {
            document.getElementById("steps-count").textContent = user.steps;
            document.getElementById("calories-burned").textContent = user.caloriesBurned;
            document.getElementById("workouts-count").textContent = user.workouts;

            const badgeContainer = document.getElementById("badge-container");
            user.badges.forEach(badge => {
                const badgeElement = document.createElement("div");
                badgeElement.classList.add("badge");
                badgeElement.textContent = badge;
                badgeContainer.appendChild(badgeElement);
            });
        })
        .catch(error => console.error("Error loading profile data:", error));
});

