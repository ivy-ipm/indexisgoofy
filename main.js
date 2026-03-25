document.addEventListener('DOMContentLoaded', () => {
const sections = document.querySelectorAll('section');
const toolButtons = [
  'Level Downloader', 'Player Lookup', 'OBJ→SGM Converter',
  'Image→3D Map', 'Pixel Art Level', 'Grab Complexity Analyzer'
];
const toolBox = document.getElementById('toolBox');
const toolButtonsContainer = document.getElementById('toolButtons');

// Function to hide all sections
function hideSections() { sections.forEach(s => s.classList.remove('active')); }

// Show section
window.showSection = id => { hideSections(); document.getElementById(id).classList.add('active'); }
window.showLogin = () => { document.getElementById('loginBox').style.display = 'flex'; }

// Theme toggle
const themeBtn = document.getElementById('themeToggle');
themeBtn.onclick = () => {
  document.body.classList.toggle('night');
  themeBtn.textContent = document.body.classList.contains('night') ? 'Day' : 'Night';
}

// Build tool buttons dynamically
toolButtons.forEach(tool => {
  const btn = document.createElement('button');
  btn.textContent = tool;
  btn.className = 'action';
  btn.addEventListener('click', () => showTool(tool));
  toolButtonsContainer.appendChild(btn);
});

// Show tool content
window.showTool = tool => {
  toolBox.innerHTML = '';
  switch (tool) {
    case 'Level Downloader':
      toolBox.innerHTML = `
        <h3>Level Downloader</h3>
        <input id="levelLink" placeholder="Enter Grab level link">
        <input id="levelName" placeholder="Optional: File Name">
        <button class="action" id="downloadBtn">Queue Download</button>
        <div id="downloadOutput"></div>`;
      document.getElementById('downloadBtn').addEventListener('click', downloadLevel);
      break;

    case 'Player Lookup':
      toolBox.innerHTML = `
        <h3>Player Lookup</h3>
        <input id="playerUsername" placeholder="Enter Player Username">
        <button class="action" id="playerBtn">Search</button>
        <div id="playerOutput"></div>`;
      document.getElementById('playerBtn').addEventListener('click', playerLookup);
      break;

    case 'OBJ→SGM Converter':
      toolBox.innerHTML = `<h3>OBJ→SGM Converter</h3><p>Import OBJ file to convert into GrabVR level format (SGM).</p>`;
      break;

    case 'Image→3D Map':
      toolBox.innerHTML = `<h3>Image→3D Map</h3><p>Import image to create 3D map using AI analysis.</p>`;
      break;

    case 'Pixel Art Level':
      toolBox.innerHTML = `<h3>Pixel Art Level</h3><p>Import an image to generate a fun GrabVR pixel art level (useless tool).</p>`;
      break;

    case 'Grab Complexity Analyzer':
      toolBox.innerHTML = `<h3>Grab Complexity Analyzer</h3><p>Analyze level complexity (useless tool, max 2000).</p>`;
      break;
  }
}

// Level Downloader function
window.downloadLevel = () => {
  const link = document.getElementById('levelLink').value.trim();
  const name = document.getElementById('levelName').value.trim() || 'level';
  if (!link) { alert('Enter a link'); return; }
  const a = document.createElement('a');
  a.href = link;
  a.download = name + '.level';
  a.click();
  document.getElementById('downloadOutput').textContent = 'Download started: ' + name + '.level';
}

// Player Lookup dummy
window.playerLookup = () => {
  const user = document.getElementById('playerUsername').value.trim();
  if (!user) { alert('Enter username'); return; }
  const output = document.getElementById('playerOutput');
  output.textContent = 'Fetching user data...';
  setTimeout(() => { output.textContent = `Levels for ${user}:\n- Level1\n- Level2\n- Level3`; }, 800);
}

// GRABcraft Canvas
const canvas = document.getElementById('gameCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0077cc';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Navbar buttons
document.getElementById('navHome').addEventListener('click', () => showSection('homepage'));
document.getElementById('navTools').addEventListener('click', () => showSection('tools'));
document.getElementById('navGames').addEventListener('click', () => showSection('games'));
document.getElementById('navLogin').addEventListener('click', showLogin);
});
