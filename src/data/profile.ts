import type { Step } from './types';

const skeleton = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Your Name</title>
  <link rel="stylesheet" href="yourname.css">
</head>
<body>

</body>
</html>`;

const headerHtml = `<header id="top">
  <h1>Your Name</h1>
  <p>Graphic Designer and Web Developer.</p>
</header>`;

const headerCss = `header {
  background: #1a1712;
  color: #faf7f2;
  text-align: center;
  padding: 48px 20px;
  border-bottom: 4px solid #c0532e;
}

header h1 {
  margin: 0 0 8px;
  font-size: 36px;
}

header p {
  margin: 0;
  font-size: 18px;
}`;

const menuHtml = `<nav id="menu">
  <a href="#top">Home</a>
  <a href="#about">About</a>
  <a href="#skills">Skills</a>
  <a href="#contact">Contact</a>
</nav>`;

const menuCss = `nav {
  background: #f4ede6;
  padding: 12px;
  text-align: center;
}

nav a {
  display: inline-block;
  color: #1a1712;
  text-decoration: none;
  background: #ffffff;
  border: 1px solid #e4d9ce;
  padding: 10px 14px;
  margin: 6px;
}`;

const aboutHtml = `<section class="about" id="about">
  <h2>About Me</h2>
  <p>I am learning to design pages and to build them with HTML and CSS. This page is my personal profile.</p>
</section>`;

const aboutCss = `.about {
  background: #ffffff;
  border: 1px solid #e4d9ce;
  padding: 20px;
  margin: 20px;
}

.about h2 {
  margin-top: 0;
  font-size: 28px;
}

.about p {
  margin: 0;
  font-size: 18px;
  line-height: 1.5;
}`;

const skillsHtml = `<section class="skills" id="skills">
  <h2>Skills</h2>
  <div class="skill">
    <h3>Graphic Design</h3>
    <p>Posters, logos, and page layouts.</p>
  </div>
  <div class="skill web">
    <h3>Web Design</h3>
    <p>Pages built with HTML and CSS.</p>
  </div>
  <div class="skill photo">
    <h3>Photography</h3>
    <p>Pictures chosen and cropped for a page.</p>
  </div>
</section>`;

const skillsCss = `.skills {
  margin: 20px;
}

.skills h2 {
  margin-top: 0;
  font-size: 28px;
}

.skill {
  display: inline-block;
  width: 260px;
  max-width: calc(100% - 16px);
  box-sizing: border-box;
  vertical-align: top;
  margin: 8px;
  padding: 16px;
  border: 1px solid #c0532e;
  background: #f8e8e1;
  color: #8c3a1e;
}

.skill h3 {
  margin: 0 0 8px;
  font-size: 20px;
}

.skill p {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
}

.skill.web {
  border-color: #14613a;
  background: #e7f5ee;
  color: #14613a;
}

.skill.photo {
  border-color: #1e4a73;
  background: #e8eef6;
  color: #1e4a73;
}`;

const contactHtml = `<section class="contact" id="contact">
  <h2>Contact</h2>
  <form action="#contact">
    <label>Name <input type="text" name="name"></label>
    <label>Email <input type="email" name="email"></label>
    <label>Phone number <input type="tel" name="phone"></label>
    <button type="submit">Send Message</button>
  </form>
</section>`;

const contactCss = `.contact {
  background: #ffffff;
  border: 1px solid #e4d9ce;
  margin: 20px;
  padding: 20px;
}

.contact h2 {
  margin-top: 0;
  font-size: 28px;
}

.contact label {
  display: block;
  margin-bottom: 12px;
}

.contact input {
  display: block;
  width: 100%;
  max-width: 420px;
  margin-top: 6px;
  padding: 10px;
  border: 1px solid #e4d9ce;
  font: inherit;
  font-size: 16px;
}

.contact button {
  background: #c0532e;
  color: #faf7f2;
  border: 0;
  padding: 12px 18px;
  font: inherit;
}`;

const footerHtml = `<footer id="foot">
  <p>© 2026 My Personal Profile</p>
</footer>`;

const footerCss = `footer {
  background: #1a1712;
  color: #faf7f2;
  text-align: center;
  padding: 20px;
}

footer p {
  margin: 0;
}`;

export const profileSteps: Step[] = [
  {
    slug: 'tag',
    title: 'A tag is a label',
    summary: 'The smallest piece of a web page.',
    tellings: [
      'A web page is a text file the browser reads. You wrap words in labels so the browser knows what they are. A paragraph label looks like this: <p>Hello</p>. The name of that label is p.',
      'The < starts a label. The p is its name. The > finishes the opening. Hello is the words a person sees. </p> closes the label. The slash means stop. If you open a label, you close it.',
      'Markers look at whether the labels are real and closed. <p> is a paragraph. <h1> is the main heading. Invented names, or a label you forget to close, make the rest of the page fall into the wrong place.',
    ],
    preview: { kind: 'tag' },
    html: `<p>Hello</p>`,
    lines: [
      { code: '<p>', says: 'Open the paragraph. The browser gets ready for a block of text.' },
      { code: 'Hello', says: 'The words a person actually sees. Labels are instructions. This part is the content.' },
      { code: '</p>', says: 'Close it. The slash is the only difference from the opening. Close every label you open.' },
    ],
  },
  {
    slug: 'files',
    title: 'Two files',
    summary: 'The writing in one file. The paint in another.',
    tellings: [
      'HTML is the writing: the headings, the menu, the paragraphs. CSS is the paint: colours, space, borders. This project wants them in two files. The writing file points at the paint file by name.',
      'The writing file is index.html. The paint file is yourname.css, using your own first name, one word, no spaces. Inside the head of the HTML file, one line calls the paint: the link label. href is the file name. If the names do not match, including capital letters, the page stays unpainted.',
      'Paint written inside a <style> label is the internal method. The brief asks for one external CSS file. A marker looks for the link line, then opens the .css file. No style label. No CSS sitting in the HTML.',
    ],
    preview: { kind: 'files' },
    html: `<link rel="stylesheet" href="yourname.css">`,
    lines: [
      { code: 'link', says: 'A link in the head connects this page to another file. It is not the menu. The menu comes later, in the body.' },
      { code: 'rel="stylesheet"', says: 'Says what the other file is for. stylesheet means paint.' },
      { code: 'href="yourname.css"', says: 'The file name. Yours might be ada.css. The HTML and the file on disk must use the same name.' },
    ],
  },
  {
    slug: 'skeleton',
    title: 'The skeleton',
    summary: 'The same first lines, on every page you ever make.',
    tellings: [
      'Every page starts with the same bones. A first line that says this is HTML. Then html, which holds the whole page. Inside it, head and body. Head is information. Body is what a person sees.',
      'The title lives in the head. It is the name on the browser tab, not the big heading. The big heading is an h1, and it goes in the body. The link to your CSS also lives in the head, so the paint loads before the page is shown.',
      'A page with no doctype, no head, or no title looks unfinished before the marker reads a word of content. Copy this skeleton every time. Then add the pieces inside the body.',
    ],
    preview: { kind: 'skeleton' },
    html: skeleton,
    lines: [
      { code: '<!DOCTYPE html>', says: 'The first line. It tells the browser which kind of HTML this is. Copy it. It has no closing label.' },
      { code: '<html lang="en">', says: 'The page. lang="en" says the words are English.' },
      { code: '<head>', says: 'Hidden information: the title, and the link to the paint. Nothing in the head is drawn on the page.' },
      { code: '<title>Your Name</title>', says: 'The browser tab. Replace Your Name. This is not the h1.' },
      { code: '<link rel="stylesheet" href="yourname.css">', says: 'Calls the paint file. This label does not close with a second link label.' },
      { code: '<body>', says: 'Everything from the header to the footer goes between body and /body.' },
    ],
  },
  {
    slug: 'header',
    title: 'The header',
    summary: 'Your name, one short line, and a dark band.',
    brief: 'Your name as an h1. A short description such as “Graphic Designer and Web Developer.” A background colour. White or contrasting text. Center-aligned text. Padding around the content. A border at the bottom.',
    briefFrom: 'The project brief',
    tellings: [
      'The header is the band at the top. It holds two things: your name, and a short line about what you do. The name is the h1, the biggest heading. A page gets one h1.',
      'The paint does five jobs, and they match the brief one for one. background is the band colour. color is the text, paper on ink so it contrasts. text-align: center puts the words in the middle. padding is space inside the band, around the words. border-bottom is the line along the bottom edge only.',
      'If the text is dark on a dark band, the contrast mark goes. If the words sit on the left, the center mark goes. If the band touches the words with no padding, that mark goes. If the line is around the whole box instead of along the bottom, read the brief again: a border at the bottom.',
    ],
    preview: { kind: 'page', src: '/study/profile/index.html#top', title: 'The header on the example profile' },
    html: headerHtml,
    css: headerCss,
    lines: [
      { code: '<header>', says: 'The band. CSS can style header directly, because the page has only one.' },
      { code: '<h1>Your Name</h1>', says: 'The main heading. Put your name here, not in the title only. One h1 on the page.' },
      { code: '<p>Graphic Designer and Web Developer.</p>', says: 'The short description. The brief gives this as an example. You may keep it, or write your own short line.' },
      { code: 'background: #1a1712;', says: 'Ink. The band goes dark.' },
      { code: 'color: #faf7f2;', says: 'Paper. Light text on the dark band. The brief calls this white or contrasting text.' },
      { code: 'text-align: center;', says: 'Centers the name and the line. Without this, they sit on the left.' },
      { code: 'padding: 48px 20px;', says: 'Space inside the band. 48px above and below, 20px on the sides. The words no longer touch the edges.' },
      { code: 'border-bottom: 4px solid #c0532e;', says: 'A clay line, 4px thick, along the bottom only. That is the border the brief asks for.' },
    ],
  },
  {
    slug: 'menu',
    title: 'The menu',
    summary: 'Four links, painted to look like buttons.',
    brief: 'Home, About, Skills, Contact. A background colour. Padding. Borders between or around menu items. Appropriate text colour. Margins between the items.',
    briefFrom: 'The project brief',
    tellings: [
      'The menu is a nav. Inside it, four links: Home, About, Skills, Contact. This profile is one page, so each link jumps to a spot on the page. A jump looks like href="#about". The spot it jumps to has id="about". The # and the id must match.',
      'A link is an a label, not a button. A button does something on the page. A link goes somewhere. You then paint the link so it looks like a button: a white box, a border, padding inside, margin outside so the boxes do not touch. text-decoration: none takes off the underline the browser adds to every link.',
      'The marker looks for the four words, for a background on the bar, for padding, for borders on the items, for a text colour that can be read, and for margins so the items are not stuck together. Links with no href do not count as a menu.',
    ],
    preview: { kind: 'page', src: '/study/profile/index.html#menu', title: 'The menu on the example profile' },
    html: menuHtml,
    css: menuCss,
    lines: [
      { code: '<nav>', says: 'The menu. One nav on the page, so the CSS says nav and means it.' },
      { code: 'href="#about"', says: 'A jump on this same page. #about finds the label that has id="about". Home uses #top, which is the header.' },
      { code: 'background: #f4ede6;', says: 'Ghost, a light warm bar. It must not be the same dark colour as the header, or the two bands merge.' },
      { code: 'padding: 12px;', says: 'Space inside the bar, around the items.' },
      { code: 'border: 1px solid #e4d9ce;', says: 'A border around each item. The brief allows borders between or around. Around is the clearer one.' },
      { code: 'margin: 6px;', says: 'Space outside each item, so the boxes do not touch. Padding is inside. Margin is outside.' },
      { code: 'color: #1a1712;', says: 'Ink text on the light boxes. Appropriate means readable.' },
      { code: 'text-decoration: none;', says: 'Removes the underline. The border is what shows that the word can be tapped.' },
    ],
  },
  {
    slug: 'about',
    title: 'About me',
    summary: 'A heading, a paragraph, and a box that is not the page colour.',
    brief: 'A heading and a paragraph. A different background colour. A border. Padding inside the section. Margin around the section. A styled heading and paragraph.',
    briefFrom: 'The project brief',
    tellings: [
      'About is a section with a heading and one paragraph. The heading is an h2. You already used h1 for your name. h2 is the next size down, for a section. Write the paragraph in your own words. The example sentence is only a start.',
      'class="about" is a name you invent. The CSS finds it with a dot: .about. The page background is paper, #faf7f2. This box is white. That difference is the whole point. If both are white, the marker cannot see a different background. Padding is space inside the border. Margin is space outside the border, between this box and the things around it.',
      'The mark needs the heading, the paragraph, a background that is not the page colour, a border, padding, and margin. A heading with no paragraph, or a box with no space inside, drops the easy marks.',
    ],
    preview: { kind: 'page', src: '/study/profile/index.html#about', title: 'The about section on the example profile' },
    html: aboutHtml,
    css: aboutCss,
    lines: [
      { code: 'class="about"', says: 'A name you made up. You could call it about-me. Then the CSS must use the same name.' },
      { code: 'id="about"', says: 'The spot the menu jumps to. The menu says href="#about".' },
      { code: '<h2>About Me</h2>', says: 'The section heading. h2, not another h1. The page already has its h1.' },
      { code: '<p>', says: 'The paragraph. Replace the example with two or three true sentences about you.' },
      { code: 'background: #ffffff;', says: 'White. The page is paper. White is different, so the box reads as its own section.' },
      { code: 'border: 1px solid #e4d9ce;', says: 'A thin line around the whole section.' },
      { code: 'padding: 20px;', says: 'Space inside, so the words do not touch the border.' },
      { code: 'margin: 20px;', says: 'Space outside, so the box does not touch the menu or the skills.' },
    ],
  },
  {
    slug: 'skills',
    title: 'Three skill boxes',
    summary: 'Same shape, three colours.',
    brief: 'Three skill boxes, for example Graphic Design, Web Design, Photography. Each box has a border, a background colour, padding, margin, a heading, and a short description.',
    briefFrom: 'The project brief',
    tellings: [
      'You need three boxes. Each box has a heading and a short description. h3 is the heading inside a box, because h2 is already the heading for the whole Skills section. Graphic Design, Web Design, and Photography are the examples in the brief. You may use them.',
      'Write the shared paint once, on .skill: border, padding, margin, and a width. display: inline-block lets the boxes sit side by side and wrap on a phone. Then two extra rules change only the colours. .skill.web is a box that has both names, skill and web. Same shape, different colour, so they belong together and can still be told apart.',
      'One box, or three boxes with no heading, or three boxes with no padding, will not pass this part. The marker should be able to count three, and see a border, a fill, space inside, and space between them.',
    ],
    preview: { kind: 'page', src: '/study/profile/index.html#skills', title: 'The skill boxes on the example profile' },
    html: skillsHtml,
    css: skillsCss,
    lines: [
      { code: '<h2>Skills</h2>', says: 'The section heading. The menu jumps to id="skills" on this section.' },
      { code: '<div class="skill">', says: 'One box. A div is a plain box you can paint. The heading and the description go inside it.' },
      { code: '<h3>', says: 'The box heading. Smaller than the section heading. One h3 in each box.' },
      { code: 'class="skill web"', says: 'Two names on one box. It gets the .skill paint, then the .skill.web paint replaces the colours.' },
      { code: 'display: inline-block;', says: 'Lets the boxes sit next to each other. On a narrow phone they wrap instead of overflowing.' },
      { code: 'width: 260px;', says: 'Each box is the same width, so they look like a set.' },
      { code: 'padding and margin', says: '16px inside each box. 8px outside, which becomes the gap between boxes. The section also has margin: 20px so the group sits away from the screen edge.' },
      { code: '.skill.web and .skill.photo', says: 'Leaf green, then sky blue. Clay, leaf, and sky. Do not give all three the same fill, or they look copied.' },
    ],
  },
  {
    slug: 'contact',
    title: 'Contact',
    summary: 'Name, email, phone, and a button.',
    brief: 'Name, email, phone number, and a Send Message button. Style the section with background, border, margin, and padding.',
    briefFrom: 'The project brief',
    tellings: [
      'The contact section is a box with three bars and a button. A bar the person types in is an input. The word next to the bar is a label. Put the input inside the label, so the word and the bar belong together. On a phone, tapping the word then focuses the bar.',
      'type="text" is a normal bar, for the name. type="email" is the email bar. type="tel" is the phone bar. tel means telephone. The button text is Send Message, because that is what the brief calls it. type="submit" means it belongs to the form. This page does not really send an email. There is no server in this assignment. The button only has to be there, styled, with those words.',
      'The section itself needs a background, a border, margin, and padding, same idea as About. Inside it the marker looks for the three facts, name, email, and phone, and for a button that says Send Message.',
    ],
    preview: { kind: 'page', src: '/study/profile/index.html#contact', title: 'The contact section on the example profile' },
    html: contactHtml,
    css: contactCss,
    lines: [
      { code: '<form action="#contact">', says: 'The form groups the bars and the button. action="#contact" keeps the person on this page. Nothing is stored.' },
      { code: '<label>Name <input type="text" name="name"></label>', says: 'The word Name and the bar are one label. type="text" is a typing bar. name is the bar’s own name, for the form.' },
      { code: 'type="email"', says: 'An email bar. The phone uses type="tel". Use the type that matches the fact.' },
      { code: '<button type="submit">Send Message</button>', says: 'The words on the button are Send Message. type="submit" is the right type inside a form.' },
      { code: '.contact background, border, margin, padding', says: 'White box, thin line, space outside, space inside. Same four ideas as About. The brief lists them again here, so do them again.' },
      { code: '.contact button', says: 'Clay background, paper text, padding so the words have room. A button with no padding is a thin strip and looks unfinished.' },
    ],
  },
  {
    slug: 'footer',
    title: 'The footer',
    summary: 'The last band. The year and the line from the brief.',
    brief: 'A footer containing “© 2026 My Personal Profile”.',
    briefFrom: 'The project brief',
    tellings: [
      'The footer is the last band on the page. It is not a heading and it is not the contact box. It sits after everything else. The brief gives you the words to put there: © 2026 My Personal Profile.',
      '© is the copyright sign. You can type it, or copy it from the example. 2026 is the year in the brief. Keep the year. Paint the footer with the same ink and paper as the header, so the page starts dark and ends dark.',
      'A page with no footer drops this mark even if everything else is right. The words need to be readable, so light text on the dark band, with padding so they do not touch the edge.',
    ],
    preview: { kind: 'page', src: '/study/profile/index.html#foot', title: 'The footer on the example profile' },
    html: footerHtml,
    css: footerCss,
    lines: [
      { code: '<footer>', says: 'The last band. It comes after the contact section, still inside the body.' },
      { code: '© 2026 My Personal Profile', says: 'The line from the brief. Keep the year. The © sign is part of the line.' },
      { code: 'background: #1a1712;', says: 'Ink, the same dark band as the header. The page closes the way it opened.' },
      { code: 'color: #faf7f2;', says: 'Paper text, so the line can be read on the dark band.' },
      { code: 'text-align: center;', says: 'The line sits in the middle, like the header.' },
      { code: 'padding: 20px;', says: 'Space inside the band, around the line.' },
    ],
  },
  {
    slug: 'colours',
    title: 'The colours',
    summary: 'One set. Paper, ink, and clay.',
    tellings: [
      'Use one set. Ink is the dark brown-black, #1a1712. Paper is the warm off-white, #faf7f2. Clay is the burnt orange, #c0532e. Ghost is the menu bar. White is for About and Contact. The three skill boxes are clay wash, leaf green, and sky blue.',
      'The page background has to be paper, not white. About is white. If the page is also white, “a different background” disappears. Clay shows up three times only: the line under the header, the first skill border, and the button. A colour used on everything stops pointing at anything.',
      'The brief does not give you hex codes. It gives you jobs: a background, contrasting text, a different background, borders. This set does those jobs, and the text stays readable. You do not need a second palette. The full list, with a patch of each colour, is on the colours page.',
    ],
    preview: { kind: 'page', src: '/study/profile/index.html', title: 'The example profile in the colour set' },
    lines: [
      { code: '#1a1712 ink', says: 'Header background, footer background, text on light areas, menu text.' },
      { code: '#faf7f2 paper', says: 'Page background, and the text on the header and footer.' },
      { code: '#c0532e clay', says: 'Header’s bottom border, Graphic Design border, Send Message button. Three times.' },
      { code: '#f4ede6 ghost', says: 'Menu bar only.' },
      { code: '#ffffff white', says: 'About and Contact, so they differ from the paper page.' },
      { code: '#f8e8e1, #e7f5ee, #e8eef6', says: 'The three box fills: clay wash, leaf, sky. Borders are #c0532e, #14613a, and #1e4a73.' },
    ],
  },
  {
    slug: 'marker',
    title: 'Read it like a marker',
    summary: 'Top to bottom, once, with the brief beside you.',
    tellings: [
      'A marker reads the page the way a person does, then checks the file. Open the page. Read the header, the menu, About, the three boxes, Contact, the footer. Then open the HTML and look for the link line. Then open the CSS file and check it is a separate file.',
      'While you look, ask one question per band. Header: is my name the h1, is the text light, is it centered, is there space inside, is there a line along the bottom? Menu: are there four links, with borders and gaps? About: is the box a different colour from the page? Skills: can I count three boxes? Contact: name, email, phone, Send Message? Footer: the 2026 line?',
      'If the heading still says Your Name, it is the example, not your page. Change the name, the about paragraph, and the skill sentences into your own words. The labels and the colours can stay. The sentences should become yours before you submit.',
    ],
    preview: { kind: 'page', src: '/study/profile/index.html', title: 'The finished example profile' },
    lines: [
      { code: 'One h1, and it is your name', says: 'The title in the head is the browser tab. The h1 is the heading a person sees. Both should be your name.' },
      { code: 'The link line is in the head', says: 'href points at your css file. There is no style label full of paint in the HTML.' },
      { code: 'Four menu words', says: 'Home, About, Skills, Contact. Each one is an a with an href.' },
      { code: 'About is not the page colour', says: 'Paper page, white box, a border, padding, margin, a heading, a paragraph.' },
      { code: 'Three boxes', says: 'Each one has a heading, a short description, a border, a fill, padding, and margin.' },
      { code: 'Contact has four controls', says: 'Name, email, phone, and a button that says Send Message.' },
      { code: 'Footer line', says: '© 2026 My Personal Profile. Dark band, light text.' },
      { code: 'Your sentences', says: 'Replace the example about-me and the example skill lines. Leave the labels alone.' },
    ],
  },
];
