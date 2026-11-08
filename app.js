/* Huxa Conseil — logique commune aux versions FR et EN.
   Tous les textes viennent de window.SITE, défini dans chaque page (index.html, en/index.html). */
(function(){
  var S=window.SITE||{},T=S.t||{};
  function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;');}
  var BOOKING_URL=S.bookingUrl||'';
  if(BOOKING_URL)document.querySelectorAll('.js-book').forEach(function(a){a.href=BOOKING_URL;a.target='_blank';a.rel='noopener';});

  var root=document.documentElement;
  try{var th=localStorage.getItem('theme');if(th)root.setAttribute('data-theme',th);}catch(e){}
  document.getElementById('themeToggle').addEventListener('click',function(){
    var cur=root.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
    var next=cur==='dark'?'light':'dark';root.setAttribute('data-theme',next);
    try{localStorage.setItem('theme',next);}catch(e){}
  });
  /* Mémorise la langue choisie via le sélecteur FR / EN */
  document.querySelectorAll('[data-lang]').forEach(function(a){a.addEventListener('click',function(){try{localStorage.setItem('lang',a.dataset.lang);}catch(e){}});});

  /* Suggestion discrète de l'autre langue si le navigateur ne correspond pas à la page */
  (function(h){
    if(!h)return;var chosen=null;try{chosen=localStorage.getItem('lang');}catch(e){}
    if(chosen)return;
    var langs=(navigator.languages||[navigator.language||'']).map(function(l){return String(l).toLowerCase();});
    var prefersFr=langs.length&&langs[0].indexOf('fr')===0;
    if(h.when==='notFr'?prefersFr:!prefersFr)return;
    var d=document.createElement('div');d.className='lang-hint';d.setAttribute('role','note');
    d.innerHTML=esc(h.text)+' <a href="'+h.href+'" data-lang="'+h.lang+'" hreflang="'+h.lang+'">'+esc(h.cta)+'</a><button type="button" aria-label="'+esc(h.close)+'">×</button>';
    d.querySelector('button').addEventListener('click',function(){d.remove();try{localStorage.setItem('lang',document.documentElement.lang);}catch(e){}});
    d.querySelector('a').addEventListener('click',function(){try{localStorage.setItem('lang',h.lang);}catch(e){}});
    document.body.appendChild(d);
  })(S.langHint);

  var menu=document.getElementById('menu'),mt=document.getElementById('menuToggle');
  mt.addEventListener('click',function(){var o=menu.classList.toggle('open');mt.setAttribute('aria-expanded',o);});
  menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){menu.classList.remove('open');mt.setAttribute('aria-expanded','false');});});

  var nav=document.getElementById('nav');
  addEventListener('scroll',function(){nav.classList.toggle('scrolled',scrollY>8);},{passive:true});

  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  function filterProjects(f){
    document.querySelectorAll('.chip').forEach(function(x){x.setAttribute('aria-pressed',String(x.dataset.f===f));});
    document.querySelectorAll('.project').forEach(function(p){
      var show=f==='all'||p.dataset.cat.split(' ').indexOf(f)>-1;
      p.classList.toggle('hidden',!show);
      p.classList.toggle('feature',show&&f==='all'&&p.id==='p-dictanot');
      if(show)p.classList.add('in');
    });
  }
  document.querySelectorAll('.chip').forEach(function(c){
    c.addEventListener('click',function(){filterProjects(c.dataset.f);});
  });

  /* Mot d'expertise qui défile */
  var words=S.words||[];
  var rw=document.getElementById('rotWord'),wi=0;
  if(!reduce&&words.length>1){
    (function cycle(){
      var target=words[wi=(wi+1)%words.length],cur=rw.textContent;
      (function del(){
        if(cur.length){cur=cur.slice(0,-1);rw.textContent=cur;setTimeout(del,28);}
        else (function type(i){rw.textContent=target.slice(0,i);if(i<target.length)setTimeout(function(){type(i+1);},55);else setTimeout(cycle,2200);})(1);
      })();
    })();
  }

  /* Compteurs animés */
  function count(el){
    var to=+el.dataset.count;if(reduce){el.textContent=to;return;}
    var t0=null,d=1400;
    (function step(t){if(!t0)t0=t;var k=Math.min(1,(t-t0)/d);el.textContent=Math.round(to*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(step);})(performance.now());
  }

  /* Sujets d'actualité */
  var TOPICS=S.topics||[];
  var tabs=document.getElementById('topicTabs'),panel=document.getElementById('topicPanel'),cur=0,timer=null,CYCLE=7000,userPicked=false,visible=false;
  TOPICS.forEach(function(t,i){
    var b=document.createElement('button');b.className='topic-tab';b.setAttribute('role','tab');b.id='tab-'+t.id;
    b.innerHTML=esc(t.label)+(t.hot?' <span class="hot">'+esc(T.trending)+'</span>':'')+'<span class="prog"></span>';
    b.addEventListener('click',function(){userPicked=true;show(i);});
    tabs.appendChild(b);
  });
  function show(i){
    cur=i;var t=TOPICS[i];
    tabs.querySelectorAll('.topic-tab').forEach(function(b,j){
      b.setAttribute('aria-selected',String(j===i));b.tabIndex=j===i?0:-1;
      var pr=b.querySelector('.prog');pr.classList.remove('run');void pr.offsetWidth;
      if(j===i&&!userPicked&&!reduce&&visible)pr.classList.add('run');
    });
    var ab=tabs.children[i];if(tabs.scrollWidth>tabs.clientWidth)tabs.scrollTo({left:ab.offsetLeft-16,behavior:reduce?'auto':'smooth'});
    panel.setAttribute('aria-labelledby','tab-'+t.id);
    panel.innerHTML='<div><div class="eyebrow">'+esc(T.whyNow)+'</div><h3>'+esc(t.label)+'</h3><p class="why">'+t.why+'</p>'
      +'<div class="kw">'+t.kw.map(function(k){return '<span>'+esc(k)+'</span>';}).join('')+'</div>'
      +'<div class="topic-kpi"><span class="v">'+esc(t.kpi[0])+'</span><span class="l">'+esc(t.kpi[1])+'</span></div>'
      +'<a href="#projets" class="btn btn-primary" data-go="'+t.id+'">'+esc(T.seeProjects)+'</a></div>'
      +'<div><div class="eyebrow" style="margin-bottom:12px">'+esc(T.delivered)+'</div><ul class="proofs">'
      +t.proofs.map(function(p){return '<li><b>'+esc(p[0])+'</b>'+esc(p[1])+'</li>';}).join('')+'</ul></div>';
    panel.classList.remove('swap');void panel.offsetWidth;panel.classList.add('swap');
    panel.querySelector('[data-go]').addEventListener('click',function(e){
      e.preventDefault();userPicked=true;clearTimeout(timer);filterProjects(t.id);
      document.getElementById('projets').scrollIntoView({behavior:reduce?'auto':'smooth'});
      document.querySelectorAll('.project:not(.hidden)').forEach(function(p){p.classList.remove('lit');void p.offsetWidth;p.classList.add('lit');});
    });
    clearTimeout(timer);
    if(!userPicked&&!reduce&&visible)timer=setTimeout(function(){show((cur+1)%TOPICS.length);},CYCLE);
  }
  if(TOPICS.length){
    tabs.addEventListener('keydown',function(e){
      var k=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(!k)return;
      userPicked=true;var n=(cur+k+TOPICS.length)%TOPICS.length;show(n);tabs.children[n].focus();
    });
    tabs.style.setProperty('--cycle',CYCLE+'ms');
    show(0);
    if('IntersectionObserver' in window){
      new IntersectionObserver(function(es){es.forEach(function(e){visible=e.isIntersecting;if(!userPicked)show(cur);else clearTimeout(timer);});},{threshold:.35}).observe(document.getElementById('actualite'));
    }
  }

  /* Apparition au défilement */
  var io='IntersectionObserver' in window?new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');
      e.target.querySelectorAll('.bar i').forEach(function(b){b.style.width=b.dataset.w+'%';});
      e.target.querySelectorAll('[data-count]').forEach(count);
      io.unobserve(e.target);}});
  },{threshold:.12}):null;
  document.querySelectorAll('.reveal').forEach(function(el){
    if(io)io.observe(el);else{el.classList.add('in');el.querySelectorAll('.bar i').forEach(function(b){b.style.width=b.dataset.w+'%';});el.querySelectorAll('[data-count]').forEach(function(c){c.textContent=c.dataset.count;});}
  });
  document.getElementById('yr').textContent=new Date().getFullYear();

  /* Calculateur */
  var LOC=S.locale||'fr-FR',U=S.units||{h:' h',cur:'{n} €',pct:'{n} %'};
  var fmt=function(n,d){return n.toLocaleString(LOC,{maximumFractionDigits:d||0,minimumFractionDigits:d||0});};
  var cP=document.getElementById('cP'),cH=document.getElementById('cH'),cC=document.getElementById('cC'),cA=document.getElementById('cA'),
      oP=document.getElementById('oP'),oH=document.getElementById('oH'),oC=document.getElementById('oC'),oA=document.getElementById('oA'),
      rH=document.getElementById('rH'),rT=document.getElementById('rT'),rE=document.getElementById('rE');
  function calc(){
    var P=+cP.value,H=+cH.value,C=+cC.value,A=+cA.value;
    [cP,cH,cC,cA].forEach(function(r){r.style.setProperty('--pct',((r.value-r.min)/(r.max-r.min)*100)+'%');});
    oP.textContent=P;oH.textContent=H+U.h;oC.textContent=U.cur.replace('{n}',C);oA.textContent=U.pct.replace('{n}',A);
    var hours=P*H*45*A/100;
    rH.textContent=fmt(Math.round(hours));rT.textContent=fmt(hours/1607,1);rE.textContent=fmt(Math.round(hours*C/50)*50);
  }
  if(cP){[cP,cH,cC,cA].forEach(function(r){r.addEventListener('input',calc);});calc();}

  /* Recommandations : la section reste masquée tant que la liste est vide */
  var TESTIMONIALS=S.testimonials||[];
  if(TESTIMONIALS.length){
    var qs=document.getElementById('quotes'),qi=0,qt,Q=T.quotes||['« ',' »'];
    qs.innerHTML=TESTIMONIALS.map(function(t,i){return '<figure class="quote'+(i?'':' on')+'"><blockquote>'+Q[0]+esc(t.q)+Q[1]+'</blockquote><cite><b>'+esc(t.n)+'</b> — '+esc(t.r)+'</cite></figure>';}).join('')
      +(TESTIMONIALS.length>1?'<div class="qdots">'+TESTIMONIALS.map(function(t,i){return '<button aria-label="'+esc(T.recommendation)+' '+(i+1)+'"'+(i?'':' aria-current="true"')+'></button>';}).join('')+'</div>':'');
    var goQ=function(i){qi=i;qs.querySelectorAll('.quote').forEach(function(q,j){q.classList.toggle('on',j===i);});qs.querySelectorAll('.qdots button').forEach(function(b,j){b.setAttribute('aria-current',String(j===i));});};
    qs.querySelectorAll('.qdots button').forEach(function(b,i){b.addEventListener('click',function(){clearInterval(qt);goQ(i);});});
    if(TESTIMONIALS.length>1&&!reduce)qt=setInterval(function(){goQ((qi+1)%TESTIMONIALS.length);},7000);
    document.getElementById('recommandations').hidden=false;
  }

  /* Halo qui suit la souris */
  if(matchMedia('(hover:hover) and (pointer:fine)').matches){
    document.addEventListener('pointermove',function(e){
      var c=e.target.closest&&e.target.closest('.project,.offer,.exp,.note,.edu');if(!c)return;
      var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px');
    },{passive:true});
  }

  /* Assistant (réponses préparées, sans IA ni envoi de données). {BOOK} est remplacé par le lien de réservation. */
  var BOOK=BOOKING_URL||'mailto:michael.belval@huxa.io';
  var LINK_BOOK='<a href="'+BOOK+'" target="_blank" rel="noopener">'+esc(T.bookLink)+'</a>';
  var fill=function(h){return String(h).split('{BOOK}').join(LINK_BOOK);};
  var QA=S.qa||[];
  var bot=document.getElementById('bot'),botBtn=document.getElementById('botBtn'),log=document.getElementById('botLog'),sugg=document.getElementById('botSugg'),bin=document.getElementById('botIn'),started=false;
  function say(html,who){var d=document.createElement('div');d.className='msg '+who;d.innerHTML=html;log.appendChild(d);log.scrollTop=log.scrollHeight;}
  function norm(t){return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');}
  function answer(text){
    say(esc(text),'u');
    var n=norm(text),best=null,score=0;
    QA.forEach(function(x){var sc=x.k.reduce(function(a,k){return a+(new RegExp('(^|[^a-z0-9])'+norm(k).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).test(n)?1:0);},0);if(sc>score){score=sc;best=x;}});
    setTimeout(function(){say(fill(best?best.a:T.botFallback),'b');},reduce?0:350);
  }
  QA.forEach(function(x){var b=document.createElement('button');b.type='button';b.textContent=x.q;b.addEventListener('click',function(){answer(x.q);});sugg.appendChild(b);});
  function toggleBot(open){
    bot.hidden=!open;botBtn.setAttribute('aria-expanded',String(open));
    if(open){if(!started){started=true;say(fill(T.botHello),'b');}bin.focus();}
    else botBtn.focus();
  }
  botBtn.addEventListener('click',function(){toggleBot(bot.hidden);});
  document.getElementById('botClose').addEventListener('click',function(){toggleBot(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!bot.hidden)toggleBot(false);});
  document.getElementById('botForm').addEventListener('submit',function(e){e.preventDefault();var v=bin.value.trim();if(v){answer(v);bin.value='';}});
})();
