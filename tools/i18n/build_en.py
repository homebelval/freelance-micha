import re,json,html,sys,os
sys.path.insert(0,os.path.dirname(__file__))
from tr import TR
SP=os.path.dirname(__file__)
os.chdir(os.path.join(SP,'..','..'))
fr=open('index.html',encoding='utf-8').read()

# ---- FR page: hreflang + language switch (idempotent) ----
if 'hreflang="en"' not in fr:
    fr=fr.replace('<link rel="canonical" href="https://conseil.huxa.io/">','<link rel="canonical" href="https://conseil.huxa.io/">\n<link rel="alternate" hreflang="fr" href="https://conseil.huxa.io/">\n<link rel="alternate" hreflang="en" href="https://conseil.huxa.io/en/">\n<link rel="alternate" hreflang="x-default" href="https://conseil.huxa.io/">',1)
    a='        <li><a href="#contact" class="btn btn-primary">Me contacter</a></li>'
    assert fr.count(a)==1
    fr=fr.replace(a,'        <li><a href="en/" class="lang" hreflang="en" lang="en" data-lang="en" title="English version">EN</a></li>\n'+a)
    open('index.html','w',encoding='utf-8').write(fr)

s=fr
s=s.replace('<html lang="fr">','<html lang="en">')
s=s.replace('<a href="en/" class="lang" hreflang="en" lang="en" data-lang="en" title="English version">EN</a>','<a href="../" class="lang" hreflang="fr" lang="fr" data-lang="fr" title="Version française">FR</a>')
# ---- head ----
H=[('<title>Huxa Conseil — Michaël Belval · Transformation Digitale, IA & Automatisation</title>','<title>Huxa Conseil — Michaël Belval · Digital Transformation, AI & Automation</title>'),
 ('<meta property="og:title" content="Huxa Conseil — Michaël Belval · Transformation Digitale, IA & Automatisation">','<meta property="og:title" content="Huxa Conseil — Michaël Belval · Digital Transformation, AI & Automation">'),
 ('<meta property="og:url" content="https://conseil.huxa.io/">','<meta property="og:url" content="https://conseil.huxa.io/en/">'),
 ('<link rel="canonical" href="https://conseil.huxa.io/">','<link rel="canonical" href="https://conseil.huxa.io/en/">'),
 ('<meta property="og:locale" content="fr_FR">','<meta property="og:locale" content="en_GB">\n<meta property="og:locale:alternate" content="fr_FR">'),
 ('<meta property="og:image:alt" content="Huxa Conseil — Michaël Belval, du besoin métier à la mise en production">','<meta property="og:image:alt" content="Huxa Conseil — Michaël Belval, from business need to production">'),
 ('<link rel="stylesheet" href="styles.css">','<link rel="stylesheet" href="../styles.css">'),
 ('<meta property="og:image" content="https://conseil.huxa.io/og-image.jpg">','<meta property="og:image" content="https://conseil.huxa.io/og-image-en.jpg">'),
 ('<meta name="twitter:image" content="https://conseil.huxa.io/og-image.jpg">','<meta name="twitter:image" content="https://conseil.huxa.io/og-image-en.jpg">'),
]
for a,b in H:
    assert s.count(a)==1,a; s=s.replace(a,b)
s=re.sub(r'<meta name="description" content="[^"]*">','<meta name="description" content="Huxa Conseil — Michaël Belval, computer engineer and senior project manager: 18 years of experience in digital transformation, applied AI, data and process automation. Based in the South of France (Aix – Avignon – Marseille), working on site and remotely.">',s,count=1)
s=re.sub(r'<meta property="og:description" content="[^"]*">','<meta property="og:description" content="18 years of project management, from defence and telecoms to digital transformation. From business need to production.">',s,count=1)
# JSON-LD
m=re.search(r'<script type="application/ld\+json">(.*?)</script>',s,re.S)
ld=json.loads(m.group(1))
ld[0]['url']='https://conseil.huxa.io/en/'
ld[0]['founder']['jobTitle']='Senior project manager — Digital transformation, AI & Automation'
ld[0]['founder']['knowsAbout']=['Artificial intelligence','Generative AI','Data','Process automation','Digital transformation','Project management','Product Ownership']
ld[0]['knowsAbout']=['Generative AI','Data sovereignty','Automation','Data','Digital transformation']
ld[0]['areaServed']=["Provence-Alpes-Côte d'Azur",'France','Europe']
for q in ld[1]['mainEntity']:
    q['name']=html.unescape(TR[html.escape(q['name'],quote=False)])
    q['acceptedAnswer']['text']=html.unescape(TR[html.escape(q['acceptedAnswer']['text'],quote=False)])
s=s[:m.start(1)]+json.dumps(ld,ensure_ascii=False)+s[m.end(1):]

# ---- body ----
bi=s.index('<body>'); si=s.index('<script>\n/* Contenu')
body=s[bi:si]
used=set()
def tnode(mo):
    raw=mo.group(1); k=raw.strip()
    if k in TR:
        used.add(k); lead=raw[:len(raw)-len(raw.lstrip())]; trail=raw[len(raw.rstrip()):]
        return '>'+lead+TR[k]+trail+'<'
    return mo.group(0)
# protect svg
svgs=[]
body=re.sub(r'<svg.*?</svg>',lambda m:(svgs.append(m.group(0)),'<svgph %d>'%(len(svgs)-1))[1],body,flags=re.S)
body=re.sub(r'>([^<]+)<',tnode,body)
def attr(mo):
    k=mo.group(2)
    if k in TR: used.add(k); return '%s="%s"'%(mo.group(1),TR[k])
    return mo.group(0)
body=re.sub(r'(alt|aria-label|placeholder|title)="([^"]+)"',attr,body)
body=re.sub(r'<svgph (\d+)>',lambda m:svgs[int(m.group(1))],body)
# paths
for a,b in [('src="brand/','src="../brand/'),('href="brand/','href="../brand/'),('src="photo.jpg"','src="../photo.jpg"'),('src="photo-portrait.jpg"','src="../photo-portrait.jpg"'),('href="notes/','href="../notes/'),('href="mentions-legales.html"','href="../mentions-legales.html"'),('href="confidentialite.html"','href="../confidentialite.html"')]:
    body=body.replace(a,b)
# mailto subjects
from urllib.parse import quote,unquote
def mailto(mo):
    q=mo.group(1); params=dict(p.split('=',1) for p in q.split('&'))
    subj=unquote(params.get('subject',''))
    SUBJ={'Prise de contact — Huxa Conseil':'Getting in touch — Huxa Conseil',"Demande d'appel de 30 min":'30-minute call request',
          'Huxa Conseil — Diagnostic IA & Data':'Huxa Conseil — AI & Data assessment','Huxa Conseil — POC IA vers la production':'Huxa Conseil — From AI POC to production',
          'Huxa Conseil — Automatisation des processus':'Huxa Conseil — Process automation','Huxa Conseil — Mission de chef de projet / PO':'Huxa Conseil — Interim project manager / PO'}
    out='subject='+quote(SUBJ[subj])
    if 'body' in params: out+='&body='+quote("Hello Michaël,\n\nI'd like a 30-minute call about: \n\nMy availability: \n\nBest regards,")
    return 'mailto:michael.belval@huxa.io?'+out+'"'
body=re.sub(r'mailto:michael\.belval@huxa\.io\?([^"]+)"',mailto,body)
s=s[:bi].replace('href="brand/','href="../brand/').replace('src="analytics.js"','src="../analytics.js"')+body+open(os.path.join(SP,'site_en.js'),encoding='utf-8').read()+'</body>\n</html>\n'
os.makedirs('en',exist_ok=True)
open('en/index.html','w',encoding='utf-8').write(s)

# ---- leftovers report ----
FRW=re.compile(r"[éèêàùçôîâœ]|\b(le|la|les|des|du|une|et|pour|avec|sans|dans|sur|vos|votre|nous|vous|je|est)\b",re.I)
left=set()
for mo in re.finditer(r'>([^<]+)<',re.sub(r'<svg.*?</svg>','',body,flags=re.S)):
    t=mo.group(1).strip()
    if t and FRW.search(t): left.add(t)
for mo in re.finditer(r'(?:alt|aria-label|placeholder|title)="([^"]+)"',body):
    if FRW.search(mo.group(1)): left.add(mo.group(1))
print('unused keys:',[k for k in TR if k not in used])
print('possible FR leftovers:'); [print(' ',repr(x)) for x in sorted(left)]
