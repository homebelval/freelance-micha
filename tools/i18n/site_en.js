<script>
/* English content — the logic lives in app.js */
window.SITE={
  /* Booking link. Leave empty to fall back to e-mail. */
  bookingUrl:'https://bookings.cloud.microsoft/bookwithme/user/a078e81a7920433cb3ad9487d0a54044@huxa.io/meetingtype/LyDhICp1G0Cq14pFqhDhfg2?anonymous&ismsaljsauthenabled&ep=mlink',
  langHint:{when:'fr',href:'../',lang:'fr',text:'Ce site existe aussi en français.',cta:'Passer en français',close:'Fermer'},
  locale:'en-GB',
  units:{h:' h',cur:'€{n}',pct:'{n}%'},
  words:['Generative AI & LLMs','Data & KPIs','Process automation','Data sovereignty','Digital transformation','Product Ownership'],
  t:{
    trending:'Trending',whyNow:'Why it matters now',delivered:"What I've delivered",seeProjects:'See related projects →',
    recommendation:'Recommendation',quotes:['“','”'],
    bookLink:'book a 30-minute call',
    botHello:"Hi 👋 I answer common questions about Michaël's background and services. Pick a question or type your own.",
    botFallback:"Good question! I don't have a ready-made answer, but Michaël will reply personally: you can {BOOK} or write to <a href=\"mailto:michael.belval@huxa.io\">michael.belval@huxa.io</a>."
  },
  /* Recommendations: add entries to show the section
     e.g. {q:"Recommendation text", n:"First Last", r:"Role, Company"} */
  testimonials:[],
  topics:[
    {id:'ia',label:'Generative AI & LLMs',hot:true,
     why:"Companies are moving from demos to <b>real production use</b>. The challenge is no longer to try AI, but to industrialise it with <b>measurable ROI</b> and data you control.",
     kpi:['~2 FTE','of time given back to teams: repetitive tasks automated, expertise refocused on higher-value work'],
     kw:['LLM','Regex + AI','Deep learning','POC → production','ROI'],
     proofs:[['DICTANOT','From idea to market: POC, industrialisation and commercial launch in January 2026.'],
             ['Official Journal POC','Automatic analysis of publications (regex + AI), validated by the business.'],
             ['Real-estate reference database','Deep learning replacing a costly tool — measured ROI, deployed across the group.'],
             ['Knowing when to say no','Two AI studies stopped at an early stage: estimated ROI too low.']]},
    {id:'souv',label:'Sovereignty & compliance',hot:true,
     why:"GDPR, the <b>EU AI Act</b>, sensitive data: the question is no longer just “what can AI do?” but “<b>where does our data go?</b>”.",
     kpi:['0','data exposure to third-party services across the data & AI scope'],
     kw:['GDPR','EU AI Act','DLP / MFA','On-premise AI','DPO'],
     proofs:[['Data sovereignty','Collection, transformation and models handled in-house, with no third-party service.'],
             ['Industrialised DPO workflow','SMART GDPR platform, appointment booking, surveys, CRM and invoicing.'],
             ['Secured Microsoft 365','DLP / MFA pilot tenant that laid the groundwork for the group migration.']]},
    {id:'data',label:'Data & KPIs',
     why:"Without reliable data, there is no useful AI and no steering. The real work: <b>master data, quality and KPIs</b> used every day.",
     kpi:['95%','of business data under control, starting from scratch'],
     kw:['ETL','Master data','KPIs','Dataiku','Dashboards'],
     proofs:[['ADNOV DATA project','KPIs and dashboards in production, used daily to run the business.'],
             ['Customer master data V1 & V2','Automatic customer codes, CRM sync, Dynamics 365 export.'],
             ['Adonix ERP exit','Full data migration and process redesign.']]},
    {id:'auto',label:'Automation & low-code',hot:true,
     why:"n8n, Power Automate, AI agents: automating repetitive processes has become <b>affordable and fast</b> — as long as the landscape is well designed.",
     kpi:['0','manual processing in the customer invoicing chain'],
     kw:['n8n','Power Automate','REST APIs','Low-code','AI-assisted dev'],
     proofs:[['Paperless customer invoicing','Automated extraction, integration with master data and the ERP.'],
             ['DPO workflow','Automated appointments, satisfaction surveys, CRM and invoicing.'],
             ['Customer master data','End-to-end automated invoicing.']]},
    {id:'transfo',label:'Digital transformation',
     why:"Tools are not enough: success depends on <b>adoption</b>. Scoping, change management and vendor management make the difference.",
     kpi:['100+','agents equipped with group-wide ticketing, live in 9 months'],
     kw:['CRM','Ticketing','Modern workplace','Change management','Agile'],
     proofs:[['ADSN Direct (Freshdesk)','Ticketing for 100+ agents and every notary in France.'],
             ['Group CRM & ERP exit','First phase of the group CRM, zero service disruption when leaving Adonix.'],
             ['Jira & Confluence cloud','Migration of the entire technical department, structured backlogs and roadmap.']]}
  ],
  /* Assistant: q = suggested question, k = keywords (word start), a = answer. {BOOK} = booking link. */
  qa:[
    {q:'Who are you?',k:['who','background','experience','profile','cv','resume','about','introduce'],a:"Michaël Belval, computer engineer (ISEN Toulon) and senior project manager. 18 years of experience: systems engineering (Thales, Airbus, SFR, RATP), then digital transformation, data and AI since 2015. I founded Huxa Conseil to help companies go <a href=\"#parcours\">from business need to production</a>."},
    {q:'What services do you offer?',k:['service','offer','mission','help','do you do','engagement','consult'],a:"Four formats: AI & Data assessment, from AI POC to production, process automation, and interim project manager / Product Owner. <a href=\"#offres\">See services</a>."},
    {q:'Have you put AI into production?',k:['ai','artificial','llm','genai','chatgpt','production','poc','dictanot','journal','machine learning'],a:"Yes. DICTANOT, from POC to commercial launch in January 2026; a regex + AI POC on the French Official Journal that frees up about 2 FTE of repetitive work for higher-value tasks; a deep-learning real-estate reference database deployed across the group. And two studies stopped in time for lack of ROI."},
    {q:'How do you protect data?',k:['data','gdpr','sovereign','confidential','security','secure','privacy','ai act','cloud','nda'],a:"In my last role, the entire data & AI scope was handled in-house, with no exposure to third-party services. I build GDPR and EU AI Act requirements in from the scoping phase, and an NDA can be signed from the first conversation."},
    {q:'Where do you work?',k:['where','location','located','based','on site','onsite','travel','france','provence','marseille','aix','avignon','remote','abroad','international','english'],a:"On site in the South of France (Aix, Avignon, Marseille) and remotely everywhere else, in French or English."},
    {q:'Which tools do you know?',k:['tool','stack','tech','n8n','power automate','dataiku','jira','salesforce','fresh','microsoft','365','api'],a:"Jira & Confluence, Freshworks suite, Salesforce, Microsoft 365 & Power Automate, Dataiku, n8n, REST APIs, Brevo… and applied AI (LLMs, deep learning). <a href=\"#expertise\">See expertise</a>."},
    {q:'What are your rates?',k:['rate','price','pricing','cost','fee','budget','how much','quote','daily'],a:"Fixed price for an assessment or a well-scoped automation, daily rate for an interim engagement. I send a costed proposal after a first call: you can {BOOK}."},
    {q:'Are you available?',k:['available','availability','when','start','begin','free'],a:"Yes, I'm available for new projects, full-time or part-time. The easiest way: {BOOK}."},
    {q:'How can I contact you?',k:['contact','reach','mail','email','call','meeting','appointment','linkedin','phone'],a:"You can {BOOK}, e-mail me at <a href=\"mailto:michael.belval@huxa.io\">michael.belval@huxa.io</a> or reach out on <a href=\"https://www.linkedin.com/in/micha%C3%ABl-belval-90940841/\" target=\"_blank\" rel=\"noopener\">LinkedIn</a>."}
  ]
};
</script>
<script src="../app.js"></script>
