/* Crypto IDX Mobile Monitor V4. Free offline-first visual demo journal.
   No Binomo APIs, trading orders or remote screenshot uploads. */
(() => {
  'use strict';
  const $m = id => document.getElementById(id);
  const storeKey='cryptoIDXMobileSnapshotsV4';
  let snapshots=[];
  let lastStatus='';
  try { snapshots=JSON.parse(localStorage.getItem(storeKey)||'[]'); if(!Array.isArray(snapshots))snapshots=[]; }catch{snapshots=[];}
  const time=t=>new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(t));
  const stamp=t=>new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',dateStyle:'medium',timeStyle:'medium'}).format(new Date(t));
  function render() {
    const live=s.mode==='live';
    const frameAge=live ? Date.now()-s.lastFrame : Infinity;
    const fresh=live && !document.hidden && frameAge<=5500 && s.video?.readyState >= 2;
    const motionOK=fresh && (!s.lastMotion || Date.now()-s.lastMotion<=25000);
    const image=s.mode==='image' && !!s.image;
    let ready='NO LIVE DATA'; let status='Upload a recent Crypto IDX 1m screenshot to study visible candle history.'; let color='warn';
    if(live && motionOK){
      ready='LIVE FRAME · TEST';color='good';
      status='Screen capture currently active. Crop and clock must be verified before any directional hypothesis. Switching away from this page can suspend monitoring.';
    }else if(live){
      ready='WAIT · STALE';color='bad';
      status='Screen video is stale, frozen or backgrounded. No live decision should be used.';
    }else if(image){
      ready='SCREENSHOT ONLY';
      status='Screenshot loaded. Historical observations only: not live; automatic WIN/LOSS is unavailable without reliable continuous observation.';
    }
    $m('mobileReady').className='badge '+color;
    $m('mobileReady').textContent=ready;
    if(status!==lastStatus){$m('mobileConnection').textContent=status;lastStatus=status;}
    $m('quickOneTime').textContent=$m('oneWindow').textContent.replace(' IST','');
    $m('quickFourTime').textContent=$m('fourWindow').textContent.replace(' IST','');
    for(const [tag,source] of [['quickOne','oneDir'],['quickFour','fourDir']]){
      const direction=(live&&motionOK) ? $m(source).textContent.trim() : 'WAIT';
      const value=['UP','DOWN'].includes(direction)?direction:'WAIT';
      $m(tag).textContent=value;
      $m(tag).className=value.toLowerCase();
    }
    $m('saveSnapshot').disabled = !image || !s.candles?.length;
    $m('snapshotCount').textContent=snapshots.length+' saved notes';
    if(image && s.candles?.length){
      const bars=s.candles;
      const closed=bars.slice(0,-1);
      const green=closed.slice(-8).filter(x=>x.color==='G').length;
      const red=closed.slice(-8).filter(x=>x.color==='R').length;
      const votes=s.lastAnalysis?.v;
      const data=`Historical screenshot — ${bars.length} candle-like bars detected, ${closed.length} inferred closed. Last 8 closed: ${green} green / ${red} red. `+
        (votes?`Visual votes ${votes.up} UP / ${votes.down} DOWN / ${votes.flat} neutral. `:'More clear candles needed. ')+
        `No price feed, exact OHLC, current-candle identity or next-candle outcome verified.`;
      $m('mobileSnapshot').textContent=data;
    }
  }
  function saveSnapshot(){
    if(s.mode!=='image'||!s.candles?.length)return;
    const closed=s.candles.slice(0,-1);const v=s.lastAnalysis?.v;
    const note={id:Date.now().toString(),importedAt:Date.now(),asset:'Binomo Crypto IDX — user-uploaded visual',timeframe:'1m assumed (not verified)',
      closedCount:closed.length,last8Colors:closed.slice(-8).map(x=>x.color).join(''),
      pixelVoteUp:v?.up??null,pixelVoteDown:v?.down??null,source:'Manual image import',
      signal:'WAIT',outcome:'UNVERIFIED',caution:'Historical pixels, no authenticated candle times; not an automatic result'};
    snapshots.unshift(note);snapshots=snapshots.slice(0,400);
    try{localStorage.setItem(storeKey,JSON.stringify(snapshots))}catch(e){$m('mobileConnection').textContent='Cannot save in browser storage. Export your notes.'}
    $m('mobileSnapshot').textContent='Saved historical visual observation at '+stamp(note.importedAt)+'. No live trade result claimed.';
    render();
  }
  function exportSnapshots(){
    const blob=new Blob([JSON.stringify({app:'Crypto IDX Mobile Monitor V4',exportedAt:new Date().toISOString(),snapshots},null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='crypto-idx-mobile-notes-v4.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);
  }
  async function acceptImage(file){
    if(!file){$m('mobileConnection').textContent='No image found. Choose Screenshot instead.';return;}
    if(!file.type.startsWith('image/')){$m('mobileConnection').textContent='Only image files are supported.';return;}
    await uploadImage({target:{files:[file]}});
    render();
  }
  async function pasteImage(){
    if(!navigator.clipboard?.read){$m('mobileConnection').textContent='Image paste unavailable in this browser. Use Choose Screenshot.';return;}
    try{
      const items=await navigator.clipboard.read();
      for(const item of items){
        const kind=item.types.find(t=>t.startsWith('image/'));
        if(kind){const blob=await item.getType(kind);await acceptImage(new File([blob],'pasted-crypto-idx-'+Date.now()+'.png',{type:kind}));return;}
      }
      $m('mobileConnection').textContent='Clipboard has no image. Take a screenshot, then Choose Screenshot.';
    }catch(e){$m('mobileConnection').textContent='Paste permission not available ('+(e.name||'error')+'). Use Choose Screenshot.';}
  }
  $m('mobileStartLive').addEventListener('click',()=>{
    // Use direct user interaction for browser's required transient activation.
    if(!navigator.mediaDevices?.getDisplayMedia){
      $m('mobileConnection').textContent='This iPhone browser does not expose screen capture. Use Choose Screenshot; no automatic background monitoring is possible here.';
      return;
    }
    begin();
  });
  $m('pasteImage').addEventListener('click',pasteImage);
  $m('saveSnapshot').addEventListener('click',saveSnapshot);
  $m('exportSnapshots').addEventListener('click',exportSnapshots);
  $m('upload').addEventListener('change',()=>{setTimeout(render,300);setTimeout(render,1200);});
  document.addEventListener('paste',async e=>{const files=Array.from(e.clipboardData?.files||[]);if(files.length)await acceptImage(files[0]);});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden && s.mode==='live'){
      resetSignals();s.lastAnalysis=null;s.stableCount=0;s.priorDir='';
    }
    if(!document.hidden){
      // No automatic claim that an old prediction survived a background interval.
      if(s.mode==='live' && Date.now()-s.lastFrame>3500){resetSignals();s.lastAnalysis=null;s.stableCount=0;}
      render();
    }
  });
  window.addEventListener('pageshow',render);
  setInterval(render,1200);
  render();
})();
