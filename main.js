const mainJS = (() => {
let user = { username:'', userID:'' };
const toolBox = document.getElementById('toolBox');

function toggleTheme(){
  const body = document.body;
  const current = body.dataset.theme;
  const newTheme = current==='day'?'night':'day';
  body.dataset.theme = newTheme;
  document.getElementById('themeToggle').textContent = newTheme==='day'?'🌙':'☀️';
}

function showSection(id){
  document.querySelectorAll('section').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function openLogin(){document.getElementById('loginBox').style.display='flex';}
function closeLogin(){document.getElementById('loginBox').style.display='none';}

function showTool(tool){
  toolBox.innerHTML='';
  if(tool==='levelDownloader'){
    toolBox.innerHTML=`
      <h3>Level Downloader</h3>
      <input id="levelLink" placeholder="Enter Grab Level Link">
      <input id="levelName" placeholder="Custom Filename (optional)">
      <button class="action" onclick="mainJS.downloadLevel()">Download</button>
      <div id="levelOutput" class="output"></div>
    `;
  }else if(tool==='playerLookup'){
    toolBox.innerHTML=`
      <h3>Player Lookup</h3>
      <input id="playerName" placeholder="Enter Player Username">
      <button class="action" onclick="mainJS.lookupPlayer()">Search</button>
      <div id="playerOutput" class="output"></div>
    `;
  }else if(tool==='complexityAnalyzer'){
    toolBox.innerHTML=`
      <h3>Level Complexity Analyzer</h3>
      <input id="complexityLink" placeholder="Enter Level Link">
      <button class="action" onclick="mainJS.analyzeComplexity()">Analyze</button>
      <div id="complexityOutput" class="output"></div>
    `;
  }else{
    toolBox.innerHTML=`<p>Tool placeholder</p>`;
  }
}

// Example: Level Downloader
async function downloadLevel(){
  const link = document.getElementById('levelLink').value.trim();
  const nameInput = document.getElementById('levelName').value.trim() || 'level.level';
  if(!link) return alert("Enter a level link");

  // Example: extract IDs from GrabVR link
  const levelParam = link.split('level=')[1];
  if(!levelParam) return alert("Invalid link");
  const parts = levelParam.split(':');
  const userID = parts[0], timestamp=parts[1], version=1;

  // Build backend call
  const res = await fetch(`/api/download?userID=${userID}&timestamp=${timestamp}&version=${version}&name=${encodeURIComponent(nameInput)}`);
  const data = await res.json();

  const a = document.createElement('a');
  a.href = data.url;
  a.download = nameInput;
  a.click();

  const out = document.getElementById('levelOutput');
  out.textContent = `Download started: ${nameInput}`;
}

// User Login
async function guessUserID(){
  const username = document.getElementById('loginUsername').value.trim();
  if(!username) return alert("Enter a username");
  const res = await fetch(`/api/player?username=${username}`);
  const data = await res.json();
  if(data.userID){
    document.getElementById('loginUserID').value=data.userID;
    document.getElementById('guessBtn').style.display='none';
    document.getElementById('loginBtn').style.display='inline-block';
  }else{
    alert("User not found");
  }
}
function loginUser(){
  const username=document.getElementById('loginUsername').value;
  const userID=document.getElementById('loginUserID').value;
  if(!username||!userID) return;
  user.username=username;
  user.userID=userID;
  localStorage.setItem('grabUser',JSON.stringify(user));
  closeLogin();
  alert(`Logged in as ${username}`);
}

// Complexity Analyzer
function analyzeComplexity(){
  const link=document.getElementById('complexityLink').value.trim();
  if(!link) return alert("Enter a level link");
  const complexity=Math.floor(Math.random()*2000)+1;
  document.getElementById('complexityOutput').textContent=`Level Complexity: ${complexity}/2000`;
}

// Player Lookup
async function lookupPlayer(){
  const name=document.getElementById('playerName').value.trim();
  if(!name) return alert("Enter player username");
  const res=await fetch(`/api/player?username=${name}`);
  const data=await res.json();
  const out=document.getElementById('playerOutput');
  if(data.levels){
    out.textContent=`Levels for ${name}:\n`+data.levels.map(l=>`${l.name} (${l.timestamp})`).join('\n');
  }else{
    out.textContent="No levels found.";
  }
}

// Expose public functions
return {toggleTheme, showSection, openLogin, closeLogin, showTool, downloadLevel, guessUserID, loginUser, analyzeComplexity, lookupPlayer};

  // Update JS Status
document.getElementById('jsStatus').textContent = "main.js is running ✅";
})();
