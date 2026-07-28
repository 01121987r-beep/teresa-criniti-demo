const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const modal = document.querySelector('[data-modal]');
const toast = document.querySelector('[data-toast]');
const contactForms = document.querySelectorAll('[data-contact-form]');
const serviceModal = document.querySelector('[data-service-modal]');
const serviceModalTitle = document.querySelector('[data-service-title]');
const serviceModalBody = document.querySelector('[data-service-body]');
const serviceModalKicker = document.querySelector('[data-service-kicker]');
const approachRotator = document.querySelector('[data-approach-rotator]');
let activeServiceLabel = '';
let toastTimer;

const serviceDetails = {
  ansia: {
    kicker: 'Ansia e regolazione emotiva',
    title: 'Ansia e attacchi di panico',
    paragraphs: [
      'Quando l’allarme interno diventa intenso, anche situazioni quotidiane possono essere vissute con forte preoccupazione o con la paura di perdere il controllo.',
      'Il percorso esplora pensieri, sensazioni corporee, emozioni e significati personali che accompagnano l’ansia, rispettando la storia e i tempi della persona.'
    ]
  },
  doc: {
    kicker: 'Pensieri e comportamenti ricorrenti',
    title: 'Disturbo ossessivo-compulsivo',
    paragraphs: [
      'Pensieri intrusivi, dubbi persistenti e rituali possono assorbire tempo ed energie, creando un forte impatto sulla quotidianità e sulle relazioni.',
      'Il lavoro terapeutico considera il modo personale in cui questi vissuti vengono interpretati e mantenuti, costruendo insieme una comprensione più flessibile dell’esperienza.'
    ]
  },
  depressione: {
    kicker: 'Umore e momenti di crisi',
    title: 'Depressione e momenti di crisi',
    paragraphs: [
      'Perdita di interesse, stanchezza emotiva, senso di vuoto o difficoltà a riconoscersi possono emergere nei periodi di crisi e cambiamento.',
      'La terapia offre uno spazio in cui dare voce alla sofferenza, comprendere ciò che sta accadendo e integrare l’esperienza nella propria storia personale.'
    ]
  },
  fobie: {
    kicker: 'Paure ed evitamento',
    title: 'Fobie',
    paragraphs: [
      'Una paura intensa e circoscritta può portare a evitare luoghi, situazioni o esperienze, restringendo progressivamente la libertà nella vita quotidiana.',
      'Il percorso permette di comprendere il significato della paura e il rapporto con le situazioni temute, lavorando in modo graduale e rispettoso.'
    ]
  },
  emdr: {
    kicker: 'Trauma e rielaborazione',
    title: 'Traumi ed EMDR',
    paragraphs: [
      'Alcune esperienze difficili possono continuare a essere vissute come emotivamente presenti, influenzando il modo di percepire sé, gli altri e le relazioni.',
      'L’EMDR, per cui la Dott.ssa Criniti è formata al primo e secondo livello, può essere integrato nel percorso in modo attento e personalizzato, valorizzando le risorse della persona.'
    ]
  },
  sessuologia: {
    kicker: 'Benessere sessuale e relazionale',
    title: 'Sessuologia clinica',
    paragraphs: [
      'Sessualità, intimità e desiderio fanno parte del benessere complessivo della persona e possono attraversare momenti di difficoltà o cambiamento.',
      'La consulenza sessuologica offre alla persona e alla coppia uno spazio rispettoso e non giudicante per comprendere vissuti, bisogni e comunicazione affettiva.'
    ]
  }
};

const approachValues = [
  {
    label: 'Ascolto',
    description: 'Accogliere ciò che porti, senza interpretazioni affrettate, per comprendere davvero il modo unico in cui vivi emozioni, relazioni ed esperienze.'
  },
  {
    label: 'Rispetto',
    description: 'Ogni storia ha tempi, confini e sensibilità propri. Il percorso si costruisce senza giudizio, nel rispetto della persona e delle sue scelte.'
  },
  {
    label: 'Consapevolezza',
    description: 'Riconoscere i significati, i bisogni e gli schemi che orientano il presente apre uno sguardo più chiaro su di sé e sulle proprie possibilità.'
  },
  {
    label: 'Possibilità',
    description: 'Dalla comprensione possono nascere nuove prospettive e modi più flessibili di affrontare ciò che accade, ritrovando libertà di scelta.'
  }
];

if (approachRotator) {
  const approachWord = approachRotator.querySelector('[data-approach-word]');
  const approachDescription = approachRotator.querySelector('[data-approach-description]');
  const approachButtons = [...approachRotator.querySelectorAll('[data-approach-index]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let approachIndex = 0;
  let approachInterval;
  let approachWordTimer;
  let approachTextTimer;

  const scheduleApproach = () => {
    window.clearInterval(approachInterval);
    if (!reduceMotion) {
      approachInterval = window.setInterval(() => changeApproach((approachIndex + 1) % approachValues.length), 4800);
    }
  };

  const updateApproachButtons = () => {
    approachButtons.forEach((button, index) => {
      const isActive = index === approachIndex;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  };

  const changeApproach = (nextIndex) => {
    if (nextIndex === approachIndex || !approachValues[nextIndex]) return;
    window.clearTimeout(approachWordTimer);
    window.clearTimeout(approachTextTimer);

    if (reduceMotion) {
      approachIndex = nextIndex;
      approachWord.textContent = approachValues[approachIndex].label;
      approachWord.classList.toggle('is-long', approachValues[approachIndex].label.length > 12);
      approachDescription.textContent = approachValues[approachIndex].description;
      updateApproachButtons();
      return;
    }

    approachWord.classList.add('is-leaving');
    approachWordTimer = window.setTimeout(() => {
      approachIndex = nextIndex;
      approachWord.textContent = approachValues[approachIndex].label;
      approachWord.classList.toggle('is-long', approachValues[approachIndex].label.length > 12);
      approachWord.classList.remove('is-leaving');
      updateApproachButtons();

      approachTextTimer = window.setTimeout(() => {
        approachDescription.classList.add('is-leaving');
        approachTextTimer = window.setTimeout(() => {
          approachDescription.textContent = approachValues[approachIndex].description;
          approachDescription.classList.remove('is-leaving');
        }, 300);
      }, 110);
    }, 300);
  };

  approachButtons.forEach((button) => button.addEventListener('click', () => {
    changeApproach(Number(button.dataset.approachIndex));
    scheduleApproach();
  }));

  approachRotator.addEventListener('mouseenter', () => window.clearInterval(approachInterval));
  approachRotator.addEventListener('mouseleave', scheduleApproach);
  approachRotator.addEventListener('focusin', () => window.clearInterval(approachInterval));
  approachRotator.addEventListener('focusout', scheduleApproach);
  scheduleApproach();
}

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 4200);
};

const closeMenu = () => {
  nav.classList.remove('open');
  header.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('modal-open');
};

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
  header.classList.toggle('menu-open', !isOpen);
  document.body.classList.toggle('modal-open', !isOpen);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

const openModal = () => {
  closeMenu();
  modal.showModal();
  document.body.classList.add('modal-open');
};

const closeModal = () => {
  modal.close();
  document.body.classList.remove('modal-open');
};

document.querySelectorAll('[data-open-modal]').forEach((button) => button.addEventListener('click', openModal));
document.querySelector('[data-close-modal]').addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

modal.addEventListener('close', () => document.body.classList.remove('modal-open'));

const issueSelect = modal.querySelector('[data-issue-select]');
const issueTrigger = modal.querySelector('[data-issue-trigger]');
const issueLabel = modal.querySelector('[data-issue-label]');
const issueValue = modal.querySelector('[data-issue-value]');
const issueOptions = [...modal.querySelectorAll('[data-issue-option]')];

const closeIssueSelect = () => {
  issueSelect.classList.remove('is-open');
  issueTrigger.setAttribute('aria-expanded', 'false');
};

const openIssueSelect = () => {
  issueSelect.classList.add('is-open');
  issueTrigger.setAttribute('aria-expanded', 'true');
};

const setIssue = (value = '') => {
  issueValue.value = value;
  issueLabel.textContent = value || 'Seleziona un’area';
  issueOptions.forEach((option) => option.setAttribute('aria-selected', String(option.dataset.issueOption === value)));
  issueSelect.classList.remove('is-invalid');
};

issueTrigger.addEventListener('click', () => {
  if (issueSelect.classList.contains('is-open')) closeIssueSelect();
  else openIssueSelect();
});

issueOptions.forEach((option) => option.addEventListener('click', () => {
  setIssue(option.dataset.issueOption);
  closeIssueSelect();
  issueTrigger.focus();
}));

document.addEventListener('click', (event) => {
  if (!issueSelect.contains(event.target)) closeIssueSelect();
});

issueSelect.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeIssueSelect();
    issueTrigger.focus();
  }
});

const closeServiceModal = () => {
  serviceModal.close();
  document.body.classList.remove('modal-open');
};

document.querySelectorAll('[data-service]').forEach((card) => card.addEventListener('click', () => {
  const detail = serviceDetails[card.dataset.service];
  if (!detail) return;

  activeServiceLabel = detail.title;
  serviceModalKicker.textContent = detail.kicker;
  serviceModalTitle.textContent = detail.title;
  serviceModalBody.replaceChildren(...detail.paragraphs.map((copy) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = copy;
    return paragraph;
  }));
  serviceModal.showModal();
  document.body.classList.add('modal-open');
}));

document.querySelector('[data-close-service]').addEventListener('click', closeServiceModal);

serviceModal.addEventListener('click', (event) => {
  if (event.target === serviceModal) closeServiceModal();
});

serviceModal.addEventListener('close', () => document.body.classList.remove('modal-open'));

document.querySelector('[data-service-contact]').addEventListener('click', () => {
  closeServiceModal();
  openModal();
  const matchingOption = issueOptions.find((option) => option.dataset.issueOption === activeServiceLabel);
  if (matchingOption) setIssue(matchingOption.dataset.issueOption);
});

contactForms.forEach((form) => form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (form.closest('[data-modal]') && !issueValue.value) {
    issueSelect.classList.add('is-invalid');
    openIssueSelect();
    issueTrigger.focus();
    return;
  }
  if (form.closest('[data-modal]')) closeModal();
  form.reset();
  if (form.closest('[data-modal]')) setIssue();
  showToast('Grazie. Questa è una demo: il modulo non invia ancora dati.');
}));

document.querySelectorAll('[data-demo-whatsapp]').forEach((button) => button.addEventListener('click', () => {
  showToast('Il collegamento WhatsApp sarà attivato con il numero reale della professionista.');
}));

document.querySelectorAll('[data-demo-social]').forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  showToast(`Il collegamento ${link.dataset.demoSocial} sarà attivato con il profilo reale della professionista.`);
}));

const floatingWhatsapp = document.querySelector('.whatsapp-float');
const footer = document.querySelector('.site-footer');

if (floatingWhatsapp && footer) {
  const footerObserver = new IntersectionObserver(([entry]) => {
    floatingWhatsapp.classList.toggle('is-near-footer', entry.isIntersecting);
  }, { threshold: 0.08 });

  footerObserver.observe(footer);
}

const emdrIllustration = document.querySelector('[data-emdr-illustration]');

if (emdrIllustration && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const emdrBubbleLeft = emdrIllustration.querySelector('[data-emdr-bubble-left]');
  const emdrBubbleRight = emdrIllustration.querySelector('[data-emdr-bubble-right]');
  const emdrBubblePairs = [
    ['Ascolto', 'Presenza'],
    ['Ricordo', 'Risorsa'],
    ['Emozione', 'Significato'],
    ['Qui e ora', 'Possibilità']
  ];
  let emdrBubbleIndex = 0;

  window.setInterval(() => {
    emdrBubbleLeft.classList.add('is-changing');
    emdrBubbleRight.classList.add('is-changing');

    window.setTimeout(() => {
      emdrBubbleIndex = (emdrBubbleIndex + 1) % emdrBubblePairs.length;
      [emdrBubbleLeft.textContent, emdrBubbleRight.textContent] = emdrBubblePairs[emdrBubbleIndex];
      emdrBubbleLeft.classList.remove('is-changing');
      emdrBubbleRight.classList.remove('is-changing');
    }, 280);
  }, 3600);
}

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 40);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const profileSection = document.querySelector('[data-profile-section]');

if (profileSection) {
  const profileObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    profileSection.classList.add('is-profile-visible');
    profileObserver.unobserve(profileSection);
  }, { threshold: 0.18, rootMargin: '0px 0px -60px' });

  profileObserver.observe(profileSection);
}
