document.addEventListener('DOMContentLoaded',()=>{

window.showSection=id=>{
  document.querySelectorAll('section').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

window.showTool=tool=>{
  const box=document.getElementById('toolBox'); box.innerHTML='';
  switch(tool){
    case 'Level Downloader':
      box.innerHTML=`<h3>Level Downloader</h3>
      <input id="levelLink" placeholder="Enter Grab level link">
      <input id="levelName" placeholder="Optional: File Name">
      <button class="action" onclick="downloadLevel()">Download</button>
      <div id="downloadOutput"></div>`;
      break;
    case 'Player Lookup':
      box.innerHTML=`<h3>Player Lookup</h3>
      <input id="playerUsername" placeholder="Enter Player Username">
      <button class="action" onclick="playerLookup()">Search</button>
      <div id="playerOutput"></div>`;
      break;
    case 'OBJ→SGM Converter':
      box.innerHTML=`<h3>OBJ→SGM Converter</h3><p>Import OBJ file to convert into GrabVR level format (SGM).</p>`;
      break;
    case 'Image→3D Map':
      box.innerHTML=`<h3>Image→3D Map</h3><p>Import image to create 3D map using AI analysis.</p>`;
      break;
    case 'Pixel Art Level':
      box.innerHTML=`<h3>Pixel Art Level</h3><p>Import an image to generate a fun GrabVR pixel art level (useless tool).</p>`;
      break;
    case 'Grab Complexity Analyzer':
      box.innerHTML=`<h3>Grab Complexity Analyzer</h3><p>Analyze level complexity (useless tool, max 2000).</p>`;
      break;
    default:
      box.innerHTML='<p>This tool will be available soon...</p>';
  }
}

window.downloadLevel=()=>{
  const link=document.getElementById('levelLink').value.trim();
  const name=document.getElementById('levelName').value.trim()||'level';
  if(!link){alert('Enter a link'); return;}
  const a=document.createElement('a'); a.href=link; a.download=name+'.level'; a.click();
  document.getElementById('downloadOutput').textContent='Download started: '+name+'.level';
}

window.playerLookup=()=>{
  const user=document.getElementById('playerUsername').value.trim();
  if(!user){alert('Enter username'); return;}
  const output=document.getElementById('playerOutput');
  output.textContent='Fetching user data...';
  setTimeout(()=>{output.textContent=`Levels for ${user}:\n- Level1\n- Level2\n- Level3`},800);
}

window.showLogin=()=>{document.getElementById('loginBox').style.display='flex';}

document.getElementById('themeToggle').onclick=()=>{
  document.body.classList.toggle('night');
  document.getElementById('themeToggle').textContent=document.body.classList.contains('night')?'Day':'Night';
}

const canvas=document.getElementById('gameCanvas');
if(canvas){const ctx=canvas.getContext('2d'); ctx.fillStyle='#0077cc'; ctx.fillRect(0,0,canvas.width,canvas.height);}
