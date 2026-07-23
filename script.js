const container = document.getElementById('fixtures-container');

// All 48 Official FIFA 2026 teams and their official flags and abbrevations
const countryCodes = {
  // Group A
  "Mexico": "mx", "South Africa": "za", "Korea Republic": "kr", "South Korea": "kr", "Czechia": "cz", "Czech Republic": "cz",
  
  // Group B
  "Switzerland": "ch", "Canada": "ca", "Bosnia and Herzegovina": "ba", "Bosnia & Herz.": "ba", "Qatar": "qa",
  
  // Group C
  "Brazil": "br", "Morocco": "ma", "Scotland": "gb-sct", "Haiti": "ht",
  
  // Group D
  "United States": "us", "Australia": "au", "Paraguay": "py", "Turkiye": "tr", "Turkey": "tr",
  
  // Group E
  "Germany": "de", "Cote d'Ivoire": "ci", "Ivory Coast": "ci", "Ecuador": "ec", "Curacao": "cw", "Curaçao": "cw",
  
  // Group F
  "Netherlands": "nl", "Japan": "jp", "Sweden": "se", "Tunisia": "tn",
  
  // Group G
  "Belgium": "be", "Egypt": "eg", "Iran": "ir", "IR Iran": "ir", "New Zealand": "nz",
  
  // Group H
  "Spain": "es", "Cape Verde": "cv", "Cabo Verde": "cv", "Uruguay": "uy", "Saudi Arabia": "sa",
  
  // Group I
  "France": "fr", "Norway": "no", "Senegal": "sn", "Iraq": "iq",
  
  // Group J
  "Argentina": "ar", "Austria": "at", "Algeria": "dz", "Jordan": "jo",
  
  // Group K
  "Colombia": "co", "Portugal": "pt", "DR Congo": "cd", "Congo DR": "cd", "Uzbekistan": "uz",
  
  // Group L
  "England": "gb-eng", "Croatia": "hr", "Ghana": "gh", "Panama": "pa"
};

//  A Helper function to generate the flag URL
function getFlagUrl(teamName) {
  const code = countryCodes[teamName];
  if (code) {
    return `https://flagcdn.com/w160/${code}.png`;
  }
  // A Fallback image if a team name somehow doesn't match
  return `https://ui-avatars.com/api/?name=${teamName}&background=0D1B2A&color=00ff87&rounded=true&bold=true`;
}

async function fetchWorldCupFixtures() {
  try {
    const response = await fetch('https://www.thestatsapi.com/world-cup/data/fixtures.json');
    const data = await response.json();
    
    // This Clear the loading spinner
    container.innerHTML = '';

    // This Increased to 24 so you can see more of the group stage matches
    const matches = data.fixtures.slice(0, 24);

    // This Render each match card
    matches.forEach((match, index) => {
      
      const matchDate = new Date(match.kickoffUtc).toLocaleString([], { 
        weekday: 'short', month: 'short', day: 'numeric', 
        hour: '2-digit', minute: '2-digit' 
      });

      // This Fetch the flags using the dictionary
      const homeFlag = getFlagUrl(match.homeTeam);
      const awayFlag = getFlagUrl(match.awayTeam);

      // An animation delay for a cool loading effect
      const cardHTML = `
        <div class="card" style="animation-delay: ${index * 0.05}s">
          <div class="match-group">Group ${match.group || 'TBD'} • Match ${match.matchNumber}</div>
          
          <div class="match-teams">
            <div class="team">
              <img src="${homeFlag}" alt="${match.homeTeam} flag">
              <span class="team-name">${match.homeTeam}</span>
            </div>
            
            <span class="vs-badge">VS</span>
            
            <div class="team">
              <img src="${awayFlag}" alt="${match.awayTeam} flag">
              <span class="team-name">${match.awayTeam}</span>
            </div>
          </div>

          <div class="match-info">
            <p>📅 ${matchDate}</p>
          </div>
        </div>
      `;

      container.innerHTML += cardHTML;
    });

  } catch (error) {
    console.error('Error fetching World Cup data:', error);
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; color: #ff4757;">
        <h3>⚠️ Connection Failed</h3>
        <p>Could not fetch match data. Please try again later.</p>
      </div>
    `;
  }
}

fetchWorldCupFixtures();