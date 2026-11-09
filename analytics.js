/* Mesure d'audience Matomo — configuration exemptée de consentement (recommandations CNIL) :
   - aucun cookie (disableCookies), donc pas de bandeau à afficher ;
   - respect de « Do Not Track » ;
   - opposition possible depuis la page Confidentialité (stockée dans le navigateur, clé "huxa-no-track") ;
   - l'anonymisation des adresses IP se règle dans Matomo : Administration → Confidentialité → Anonymiser les données. */
(function(){
  var optedOut=false;
  try{optedOut=localStorage.getItem('huxa-no-track')==='1';}catch(e){}
  window._paq=window._paq||[];
  /* Petit utilitaire pour les événements (clics, calculateur…), sans effet si la mesure est refusée */
  window.huxaTrack=function(category,action,name){
    if(optedOut)return;
    var e=['trackEvent',category,action];if(name)e.push(String(name).slice(0,100));
    window._paq.push(e);
  };
  if(optedOut)return;
  var _paq=window._paq;
  _paq.push(['disableCookies']);
  _paq.push(['setDoNotTrack',true]);
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  var u='https://huxa.matomo.cloud/';
  _paq.push(['setTrackerUrl',u+'matomo.php']);
  _paq.push(['setSiteId','1']);
  var d=document,g=d.createElement('script'),s=d.getElementsByTagName('script')[0];
  g.async=true;g.src='https://cdn.matomo.cloud/huxa.matomo.cloud/matomo.js';s.parentNode.insertBefore(g,s);
})();
