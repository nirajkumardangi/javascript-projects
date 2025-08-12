// Football team object
const footballTeam = {
  team: 'FC Exampleton',
  year: 2025,
  headCoach: 'Alex Thompson',
  players: [
    { name: 'John Rivera', position: 'forward', isCaptain: false },
    { name: 'Liam Bennett', position: 'midfielder', isCaptain: true },
    { name: 'Omar Sanchez', position: 'defender', isCaptain: false },
    { name: 'Ethan Lee', position: 'goalkeeper', isCaptain: false },
    { name: 'Noah Patel', position: 'forward', isCaptain: false },
  ],
};

// Display team info
document.getElementById('team').textContent = footballTeam.team;
document.getElementById('year').textContent = footballTeam.year;
document.getElementById('head-coach').textContent = footballTeam.headCoach;

const playerCardsContainer = document.getElementById('player-cards');

// Function to render players
function renderPlayers(positionFilter = 'all') {
  playerCardsContainer.innerHTML = '';

  const filteredPlayers = footballTeam.players.filter((player) => {
    return positionFilter === 'all' || player.position === positionFilter;
  });

  filteredPlayers.forEach((player) => {
    const card = document.createElement('div');
    card.classList.add('player-card');

    const nameHeading = document.createElement('h2');
    if (player.isCaptain) {
      nameHeading.textContent = `(Captain) ${player.name}`;
    } else {
      nameHeading.textContent = player.name;
    }

    const positionParagraph = document.createElement('p');
    positionParagraph.textContent = `Position: ${player.position}`;

    card.appendChild(nameHeading);
    card.appendChild(positionParagraph);

    playerCardsContainer.appendChild(card);
  });
}

// Initial render
renderPlayers();

// Dropdown filter
document.getElementById('players').addEventListener('change', function () {
  const selectedValue = this.value;
  renderPlayers(selectedValue);
});
