export type Note = { tone: 'ok' | 'yet' | 'fix'; text: string; href?: string };

const starterCss = `body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  background: #faf7f2;
  color: #1a1712;
}
`;

function learnerName() {
  return localStorage.getItem('again-name')?.trim() || 'Your Name';
}

function escapeText(value: string) {
  return value.replace(/[&<>]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[char] ?? char);
}

function starterHtml() {
  const name = learnerName();
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${name}</title>
  <link rel="stylesheet" href="yourname.css">
</head>
<body>

</body>
</html>
`;
}

function block(css: string, selector: string) {
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(esc + '\\s*\\{([^}]*)\\}', 'i');
  return (css.match(re)?.[1] ?? '').toLowerCase();
}

function clean(source: string) {
  return source.replace(/```[a-z]*\n?/gi, '').replace(/```/g, '').trim();
}

export function check(html: string, css: string): Note[] {
  const notes: Note[] = [];
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const style = doc.querySelector('style');

  if (!/<!doctype html>/i.test(html) || !doc.querySelector('head') || !doc.querySelector('body')) {
    notes.push({
      tone: 'yet',
      href: '/profile/skeleton',
      text: 'The skeleton is missing. A page starts with <!DOCTYPE html>, then html, head, and body. Put the starter back, or open the skeleton lesson.',
    });
  } else {
    notes.push({ tone: 'ok', text: 'The skeleton is there: doctype, head, and body.' });
  }

  const link = doc.querySelector('link[rel="stylesheet"]');
  const href = link?.getAttribute('href') ?? '';
  if (!link) {
    notes.push({
      tone: 'yet',
      href: '/profile/files',
      text: 'There is no link to a CSS file. In the head, add <link rel="stylesheet" href="yourname.css">. The paint stays in the CSS box, not in the page.',
    });
  } else if (/\s/.test(href)) {
    notes.push({
      tone: 'fix',
      href: '/profile/files',
      text: `The CSS file name has a space (${href}). Use one word, such as yourname.css.`,
    });
  } else if (!href.toLowerCase().endsWith('.css')) {
    notes.push({
      tone: 'fix',
      href: '/profile/files',
      text: 'The link is there, but href should end in .css. Point it at your paint file.',
    });
  } else {
    notes.push({ tone: 'ok', text: `The page points at ${href}. That is the external file the brief wants.` });
  }

  if (style && (style.textContent?.trim().length ?? 0) > 0) {
    notes.push({
      tone: 'fix',
      href: '/profile/files',
      text: 'There is a style label in the page. That is the internal method. Move that paint into the CSS box and delete the style label.',
    });
  }

  const header = doc.querySelector('header');
  const h1 = doc.querySelector('h1');
  if (!header) {
    notes.push({
      tone: 'yet',
      href: '/profile/header',
      text: 'There is no header yet. The header is the band at the top. It holds an h1 with your name, and a short paragraph under it.',
    });
  } else if (!header.querySelector('h1')) {
    notes.push({
      tone: 'fix',
      href: '/profile/header',
      text: 'The header is there, and the h1 is outside it or missing. Your name, as an h1, goes inside the header.',
    });
  } else if (!header.querySelector('p')) {
    notes.push({
      tone: 'yet',
      href: '/profile/header',
      text: 'The name is there. Add the short description as a paragraph inside the header, under the h1.',
    });
  } else {
    notes.push({ tone: 'ok', text: 'The header has your name as an h1, and a short line under it.' });
  }

  if (header) {
    const rule = block(css, 'header');
    const missing: string[] = [];
    if (!rule.includes('background')) missing.push('background');
    if (!rule.includes('color')) missing.push('color');
    if (!rule.includes('text-align') || !rule.includes('center')) missing.push('text-align: center');
    if (!rule.includes('padding')) missing.push('padding');
    if (!rule.includes('border-bottom')) missing.push('border-bottom');
    if (!rule) {
      notes.push({
        tone: 'yet',
        href: '/profile/header',
        text: 'The header has no paint yet. Add a header { } rule with background #1a1712, color #faf7f2, text-align: center, padding, and border-bottom.',
      });
    } else if (missing.length) {
      notes.push({
        tone: 'yet',
        href: '/profile/header',
        text: `The header rule is missing ${missing.join(', ')}. Each of those is one line in the brief: a background, contrasting text, centered, padding, and a border at the bottom.`,
      });
    } else {
      notes.push({ tone: 'ok', text: 'The header paint covers the brief: background, light text, centered, padding, and a bottom border.' });
    }
  }

  const nav = doc.querySelector('nav');
  if (!nav) {
    notes.push({
      tone: 'yet',
      href: '/profile/menu',
      text: 'There is no menu yet. Add a nav with four links: Home, About, Skills, Contact.',
    });
  } else {
    const buttons = nav.querySelectorAll('button').length;
    const links = [...nav.querySelectorAll('a')];
    const texts = links.map((a) => (a.textContent || '').toLowerCase());
    const missing = ['home', 'about', 'skills', 'contact'].filter((word) => !texts.some((text) => text.includes(word)));
    const withoutHref = links.filter((a) => !a.getAttribute('href'));
    if (buttons && links.length < 4) {
      notes.push({
        tone: 'fix',
        href: '/profile/menu',
        text: 'The menu is using button labels. A button stays on the page. Change them to links, an a with an href, and paint the links so they look like buttons.',
      });
    } else if (missing.length) {
      notes.push({
        tone: 'yet',
        href: '/profile/menu',
        text: `The menu is missing ${missing.join(', ')}. The four words are Home, About, Skills, and Contact.`,
      });
    } else if (withoutHref.length) {
      notes.push({
        tone: 'fix',
        href: '/profile/menu',
        text: 'A menu link has no href. A link with nowhere to go does not count. Use href="#about" and give the about section id="about".',
      });
    } else {
      notes.push({ tone: 'ok', text: 'The menu has the four links.' });
    }
    if (links.length >= 4) {
      const rule = block(css, 'nav');
      const item = block(css, 'nav a');
      const missingPaint: string[] = [];
      if (!rule.includes('background')) missingPaint.push('a background on nav');
      if (!rule.includes('padding') && !item.includes('padding')) missingPaint.push('padding');
      if (!item.includes('border')) missingPaint.push('a border on nav a');
      if (!item.includes('margin')) missingPaint.push('margin on nav a');
      if (!item.includes('color') && !rule.includes('color')) missingPaint.push('a text colour');
      if (missingPaint.length) {
        notes.push({
          tone: 'yet',
          href: '/profile/menu',
          text: `The menu paint still needs ${missingPaint.join(', ')}.`,
        });
      } else if (rule || item) {
        notes.push({ tone: 'ok', text: 'The menu paint has a background, padding, borders, margins, and a text colour.' });
      }
    }
  }

  const about = doc.querySelector('.about');
  if (!about) {
    notes.push({
      tone: 'yet',
      href: '/profile/about',
      text: 'There is no about box yet. Add a section with class="about", an h2, and a paragraph in your own words.',
    });
  } else if (!about.querySelector('h2') || !about.querySelector('p')) {
    notes.push({
      tone: 'yet',
      href: '/profile/about',
      text: 'The about box needs both a heading (h2) and a paragraph.',
    });
  } else {
    const rule = block(css, '.about');
    const missing: string[] = [];
    if (!rule.includes('background')) missing.push('background');
    if (!rule.includes('border')) missing.push('border');
    if (!rule.includes('padding')) missing.push('padding');
    if (!rule.includes('margin')) missing.push('margin');
    if (missing.length) {
      notes.push({
        tone: 'yet',
        href: '/profile/about',
        text: `About still needs ${missing.join(', ')}. The background has to differ from the page. The page is #faf7f2, so the box can be #ffffff.`,
      });
    } else {
      notes.push({ tone: 'ok', text: 'About has a heading, a paragraph, and the four pieces of paint: background, border, padding, margin.' });
    }
  }

  const bodyRule = block(css, 'body');
  const aboutRule = block(css, '.about');
  if (about && aboutRule.includes('background')) {
    const pageIsWhite = !bodyRule.includes('background') || /#fff(?:fff)?\b/.test(bodyRule);
    const aboutIsWhite = /#fff(?:fff)?\b/.test(aboutRule);
    if (pageIsWhite && aboutIsWhite) {
      notes.push({
        tone: 'fix',
        href: '/colours',
        text: 'The page and the about box look the same colour. Set the body background to #faf7f2 and leave the about box white. Different background is one of the marks.',
      });
    }
  }

  const skills = [...doc.querySelectorAll('.skill')];
  if (skills.length < 3) {
    notes.push({
      tone: 'yet',
      href: '/profile/skills',
      text: `I can see ${skills.length} skill box${skills.length === 1 ? '' : 'es'}. You need three, each with class="skill", a heading, and a short description.`,
    });
  } else {
    const thin = skills.filter((box) => !box.querySelector('h2, h3') || !box.querySelector('p'));
    if (thin.length) {
      notes.push({
        tone: 'yet',
        href: '/profile/skills',
        text: 'Each skill box needs a heading and a short paragraph. One of them is missing a piece.',
      });
    } else {
      notes.push({ tone: 'ok', text: 'Three skill boxes, each with a heading and a description.' });
    }
    const rule = block(css, '.skill');
    const missing: string[] = [];
    if (!rule.includes('border')) missing.push('border');
    if (!rule.includes('background')) missing.push('background');
    if (!rule.includes('padding')) missing.push('padding');
    if (!rule.includes('margin')) missing.push('margin');
    if (missing.length) {
      notes.push({
        tone: 'yet',
        href: '/profile/skills',
        text: `The .skill rule still needs ${missing.join(', ')}.`,
      });
    }
  }

  const contact = doc.querySelector('.contact');
  if (!contact) {
    notes.push({
      tone: 'yet',
      href: '/profile/contact',
      text: 'There is no contact section yet. Add a section with class="contact", bars for name, email, and phone, and a button that says Send Message.',
    });
  } else {
    const email = contact.querySelector('input[type="email"]');
    const tel = contact.querySelector('input[type="tel"]');
    const text = contact.querySelector('input[type="text"]');
    const button = contact.querySelector('button');
    const label = (button?.textContent || '').toLowerCase();
    const missing: string[] = [];
    if (!text) missing.push('a name bar (type="text")');
    if (!email) missing.push('an email bar (type="email")');
    if (!tel) missing.push('a phone bar (type="tel")');
    if (!button || !label.includes('send')) missing.push('a button that says Send Message');
    if (missing.length) {
      notes.push({ tone: 'yet', href: '/profile/contact', text: `Contact still needs ${missing.join(', ')}.` });
    } else {
      notes.push({ tone: 'ok', text: 'Contact has a name, an email, a phone, and Send Message.' });
    }
    const rule = block(css, '.contact');
    const paintMissing = ['background', 'border', 'margin', 'padding'].filter((key) => !rule.includes(key));
    if (paintMissing.length) {
      notes.push({
        tone: 'yet',
        href: '/profile/contact',
        text: `The contact box still needs ${paintMissing.join(', ')}.`,
      });
    }
  }

  const footer = doc.querySelector('footer');
  const footerText = footer?.textContent ?? '';
  if (!footer) {
    notes.push({
      tone: 'yet',
      href: '/profile/footer',
      text: 'There is no footer yet. The last band says © 2026 My Personal Profile.',
    });
  } else if (!/2026/.test(footerText) || !/profile/i.test(footerText)) {
    notes.push({
      tone: 'yet',
      href: '/profile/footer',
      text: 'The footer is there. The brief wants this line: © 2026 My Personal Profile.',
    });
  } else {
    notes.push({ tone: 'ok', text: 'The footer has the 2026 line.' });
  }

  const name = learnerName();
  const heading = h1?.textContent?.trim() ?? '';
  if (header && /your name/i.test(heading) && name.toLowerCase() !== 'your name') {
    notes.push({
      tone: 'yet',
      href: '/profile/header',
      text: `The heading still says Your Name. Change it to ${escapeText(name)}. The title in the head should match.`,
    });
  }

  return notes;
}

function icon(tone: Note['tone']) {
  if (tone === 'ok') {
    return '<svg class="mark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 .01 20A10 10 0 0 0 12 2zm-1.1 13.6-3.5-3.5 1.4-1.4 2.1 2.1 4.7-4.7 1.4 1.4-6.1 6.1z"/></svg>';
  }
  return '<svg class="mark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 8a4 4 0 1 0 .01 8A4 4 0 0 0 12 8z"/></svg>';
}

export function mount() {
  const htmlBox = document.querySelector<HTMLTextAreaElement>('#html');
  const cssBox = document.querySelector<HTMLTextAreaElement>('#css');
  const preview = document.querySelector<HTMLIFrameElement>('#preview');
  const checks = document.querySelector<HTMLElement>('#checks');
  const tabHtml = document.querySelector<HTMLButtonElement>('#tab-html');
  const tabCss = document.querySelector<HTMLButtonElement>('#tab-css');
  const panelHtml = document.querySelector<HTMLElement>('#panel-html');
  const panelCss = document.querySelector<HTMLElement>('#panel-css');
  if (!htmlBox || !cssBox || !preview || !checks || !tabHtml || !tabCss || !panelHtml || !panelCss) return;

  if (!localStorage.getItem('again-html')) localStorage.setItem('again-html', starterHtml());
  if (!localStorage.getItem('again-css')) localStorage.setItem('again-css', starterCss);
  htmlBox.value = localStorage.getItem('again-html') || '';
  cssBox.value = localStorage.getItem('again-css') || '';

  const paint = () => {
    const html = clean(htmlBox.value);
    const css = clean(cssBox.value);
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const title = doc.querySelector('title')?.textContent ?? '';
    const safeCss = css.replace(/<\/style/gi, '<\\/style');
    preview.srcdoc = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title.replace(/[&<>]/g, '')}</title><style>${safeCss}</style></head><body>${doc.body.innerHTML}</body></html>`;
  };

  const save = () => {
    localStorage.setItem('again-html', htmlBox.value);
    localStorage.setItem('again-css', cssBox.value);
    paint();
  };

  htmlBox.addEventListener('input', save);
  cssBox.addEventListener('input', save);

  const select = (which: 'html' | 'css') => {
    const htmlOn = which === 'html';
    tabHtml.setAttribute('aria-selected', htmlOn ? 'true' : 'false');
    tabCss.setAttribute('aria-selected', htmlOn ? 'false' : 'true');
    panelHtml.hidden = !htmlOn;
    panelCss.hidden = htmlOn;
  };
  tabHtml.addEventListener('click', () => select('html'));
  tabCss.addEventListener('click', () => select('css'));

  document.querySelector('#check')?.addEventListener('click', () => {
    const all = check(clean(htmlBox.value), clean(cssBox.value));
    const gap = all.findIndex((note) => note.tone !== 'ok');
    const notes = gap === -1 ? all : all.slice(0, gap + 1);
    const later = gap === -1 ? 0 : all.length - notes.length;
    const waiting = gap !== -1;
    checks.innerHTML = notes
      .map((note) => {
        const more = note.href && note.tone !== 'ok' ? ` <a href="${note.href}">Open that lesson.</a>` : '';
        return `<li class="${note.tone}">${icon(note.tone)}<p>${note.text}${more}</p></li>`;
      })
      .join('');
    if (later > 0) {
      checks.insertAdjacentHTML(
        'beforeend',
        `<li class="yet">${icon('yet')}<p>${later} more ${later === 1 ? 'piece comes' : 'pieces come'} after this. Fix this one, then check again.</p></li>`,
      );
    }
    if (!waiting) {
      checks.insertAdjacentHTML(
        'afterbegin',
        `<li class="ok">${icon('ok')}<p>Every piece the brief asks for is on the page. Read your sentences out loud. If they are still the example, change them into your own words before you submit.</p></li>`,
      );
    }
    checks.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });

  document.querySelector('#reset')?.addEventListener('click', () => {
    const ok = confirm('Put the empty starter back? The page you typed on this phone will be replaced.');
    if (!ok) return;
    htmlBox.value = starterHtml();
    cssBox.value = starterCss;
    save();
    checks.innerHTML = '';
  });

  paint();
}
