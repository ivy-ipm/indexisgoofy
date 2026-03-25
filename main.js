// main.js
const mainJS = (() => {
  let currentTool = null;
  let user = null;
  let theme = 'day';
  const toolBox = document.getElementById('toolBox');

  // Update JS status
  document.getElementById('jsStatus')?.textContent = "main.js is running ✅";

  // Section switching
  function showSection(sectionID) {
    document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
    const sec = document.getElementById(sectionID);
    if(sec) sec.classList.add('active');
  }

  // Theme toggle
  function toggleTheme() {
    if(theme==='day'){
      document.body.setAttribute('data-theme','night');
      document.getElementById('themeToggle').textContent='☀️';
      theme='night';
    }else{
      document.body.setAttribute('data-theme','day');
      document.getElementById('themeToggle').textContent='🌙';
      theme='day';
    }
  }

  // User login modal
  function openLogin(){document.getElementById('loginBox').style.display='flex';}
  function closeLogin(){document.getElementById('loginBox').style.display='none';}

  async function guessUserID(){
    const username = document.getElementById('loginUsername').value.trim();
    if(!username){alert("Enter username"); return;}
    // Simulate API call
    try{
      // Replace with actual API call
      const response = await fetch(`https://api.slin.dev/grab/v1/user/${username}`);
      const data = await response.json();
      document.getElementById('loginUserID').value = data.id || "unknown";
      document.getElementById('guessBtn').style.display='none';
      document.getElementById('loginBtn').style.display='inline-block';
    }catch(e){
      alert("Failed to fetch user ID");
    }
  }

  function loginUser(){
    const username = document.getElementById('loginUsername').value.trim();
    const id = document.getElementById('loginUserID').value.trim();
    if(!username||!id){alert("Invalid login"); return;}
    user={username,id};
    closeLogin();
    alert(`Logged in as ${username}`);
  }

  // Tool injection
  function showTool(tool){
    currentTool=tool;
    toolBox.innerHTML='';
    switch(tool){
      case 'levelDownloader':
        renderLevelDownloader();
        break;
      case 'playerLookup':
        renderPlayerLookup();
        break;
      case 'complexityAnalyzer':
        toolBox.innerHTML='<p>Level Complexity Analyzer is useless (for fun).</p>';
        break;
      case 'pixelArt':
        toolBox.innerHTML='<p>Pixel-Art Level Creator is useless (import image to create JSON levels).</p>';
        break;
      case 'objToSgm':
        renderObjToSgm();
        break;
      case 'image3DMap':
        renderImage3DMap();
        break;
      default:
        toolBox.innerHTML='<p>Select a tool above.</p>';
    }
  }

  // Level Downloader
  function renderLevelDownloader(){
    const html=`
      <h3>Level Downloader</h3>
      <input id="levelLink" placeholder="Enter Grab level link">
      <input id="levelName" placeholder="Optional: File Name">
      <button class="action" onclick="mainJS.downloadLevel()">Download</button>
      <div id="downloadOutput" class="output"></div>
    `;
    toolBox.innerHTML=html;
  }

  async function downloadLevel(){
    const link=document.getElementById('levelLink').value.trim();
    const name=document.getElementById('levelName').value.trim();
    const out=document.getElementById('downloadOutput');
    out.textContent='';
    if(!link){out.textContent='Enter a level link';return;}
    try{
      const url=new URL(link);
      const levelParam=url.searchParams.get('level');
      if(!levelParam){out.textContent='Invalid link';return;}
      const parts=levelParam.split(':');
      const userID=parts[0],timestamp=parts[1];
      const fileName=name?name:`grab-level-${timestamp}.level`;
      const downloadURL=`https://api.slin.dev/grab/v1/download/${userID}/${timestamp}/1/${fileName}`;
      const a=document.createElement('a');
      a.href=downloadURL;
      a.download=fileName;
      a.click();
      out.textContent=`Download started: ${fileName}`;
    }catch(e){out.textContent='Failed to process level link';}
  }

  // Player Lookup
  function renderPlayerLookup(){
    const html=`
      <h3>Player Lookup</h3>
      <input id="lookupUser" placeholder="Enter Player Username">
      <button class="action" onclick="mainJS.lookupPlayer()">Lookup</button>
      <div id="lookupOutput" class="output"></div>
    `;
    toolBox.innerHTML=html;
  }

  async function lookupPlayer(){
    const username=document.getElementById('lookupUser').value.trim();
    const out=document.getElementById('lookupOutput');
    out.textContent='';
    if(!username){out.textContent='Enter username';return;}
    try{
      const res=await fetch(`https://api.slin.dev/grab/v1/user/${username}`);
      const data=await res.json();
      out.textContent=`User ID: ${data.id}\nLevels:\n${data.levels?.join('\n')||'No levels found'}`;
    }catch(e){out.textContent='Failed to fetch user';}
  }

  // OBJ→SGM converter
  function renderObjToSgm(){toolBox.innerHTML='<p>OBJ→SGM Converter (upload OBJ to convert) - coming soon</p>';}
  // Image→3D Map generator
  function renderImage3DMap(){toolBox.innerHTML='<p>Image→3D Map Generator (upload image to convert) - coming soon</p>';}

  // Complexity analyzer placeholder
  function analyzeComplexity(level){return Math.min(Math.floor(Math.random()*2000),2000);}

  return {showSection,toggleTheme,openLogin,closeLogin,showTool,downloadLevel,guessUserID,loginUser,analyzeComplexity,lookupPlayer};
})();
