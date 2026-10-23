export type Miss = { why: string; do: string; remember: string };

export type Rule =
  | { op: 'has'; text: string; miss: Miss }
  | { op: 'lacks'; text: string; miss: Miss }
  | { op: 'count'; text: string; min: number; miss: Miss };

export type Choice = {
  text: string;
  right?: boolean;
  why: string;
  do: string;
  remember: string;
};

export type Drill = {
  practice: {
    prompt: string;
    starter: string;
    empty: Miss;
    pass: { why: string; remember: string };
    rules: Rule[];
  };
  questions: { ask: string; choices: Choice[] }[];
};

const close: Miss = {
  why: 'The paragraph is opened and never stopped. The browser then treats the rest of the page as part of that paragraph.',
  do: 'After the words, add </p>. The slash is the stop.',
  remember: 'Every label you open, you close.',
};

export const drills: Record<string, Drill> = {
  'profile:tag': {
    practice: {
      prompt: 'This paragraph was left open. Close it, then check.',
      starter: '<p>Hello',
      empty: {
        why: 'The box is empty, so there is no paragraph to close.',
        do: 'Type <p>Hello</p> . That is an opening, the word, and a stop.',
        remember: 'A tag is a label around the words.',
      },
      pass: {
        why: 'The paragraph opens, says Hello, and stops. The browser knows where it ends.',
        remember: 'The slash means stop.',
      },
      rules: [
        { op: 'has', text: '<p', miss: { why: 'There is no opening label, so this is not a paragraph yet.', do: 'Start with <p> then the word Hello.', remember: 'The label name for a paragraph is p.' } },
        { op: 'has', text: '</p>', miss: close },
        { op: 'has', text: 'hello', miss: { why: 'The labels are there, and the word a person should see is missing.', do: 'Put Hello between <p> and </p>.', remember: 'Labels are instructions. The words in the middle are the content.' } },
      ],
    },
    questions: [
      {
        ask: 'What does </p> mean?',
        choices: [
          { text: 'Start a new paragraph.', why: 'A start has no slash. <p> starts it.', do: 'Use </p> only when the paragraph is finished.', remember: 'No slash means start. Slash means stop.' },
          { text: 'Stop the paragraph.', right: true, why: 'The slash tells the browser the paragraph is finished.', do: 'Keep using </p> after the words.', remember: 'The slash means stop.' },
          { text: 'Make the words bold.', why: 'Nothing in <p> changes the weight of the letters. It only marks a paragraph.', do: 'Use </p> to end the paragraph, not to style it.', remember: 'p means paragraph, not bold.' },
        ],
      },
      {
        ask: 'Which one is a finished paragraph?',
        choices: [
          { text: '<p>Hello', why: 'It opens and never stops.', do: 'Add </p> after Hello.', remember: 'An opened label must be closed.' },
          { text: '<p>Hello</p>', right: true, why: 'It opens, shows the word, and stops.', do: 'Copy this shape whenever you write a paragraph.', remember: 'Open, words, close.' },
          { text: '<p>Hello<p>', why: 'The second label is another start. There is still no stop.', do: 'The closing label needs a slash: </p>.', remember: 'A second <p> does not close the first one.' },
        ],
      },
    ],
  },

  'profile:files': {
    practice: {
      prompt: 'The paint file is named badly. Fix the link so it can load.',
      starter: '<link rel="stylesheet" href="home page.css">',
      empty: {
        why: 'Without the link, the page never calls the paint file.',
        do: 'Put back <link rel="stylesheet" href="yourname.css"> with no space in the name.',
        remember: 'The link lives in the head. It is not the menu.',
      },
      pass: {
        why: 'The page points at one CSS file, and the name has no space, so the browser can find it.',
        remember: 'href and the file name must match exactly.',
      },
      rules: [
        { op: 'has', text: '<link', miss: { why: 'A style block inside the page is the internal method. This project wants a separate file.', do: 'Use a link label, not a style label.', remember: 'External means a second file.' } },
        { op: 'has', text: 'stylesheet', miss: { why: 'The link does not say the other file is paint.', do: 'Add rel="stylesheet".', remember: 'stylesheet means the paint file.' } },
        { op: 'lacks', text: 'home page', miss: { why: 'The file name has a space. The browser looks for that exact name and often fails.', do: 'Use yourname.css, one word, no space.', remember: 'No spaces in the CSS file name.' } },
        { op: 'has', text: '.css', miss: { why: 'href does not point at a CSS file.', do: 'End the name with .css.', remember: 'The paint file ends in .css.' } },
      ],
    },
    questions: [
      {
        ask: 'Where should the colours and spacing be written?',
        choices: [
          { text: 'Inside a style label on the page.', why: 'That is the internal method. The brief asks for external.', do: 'Move the paint into a .css file and link it.', remember: 'One external CSS file.' },
          { text: 'In a separate .css file, called from the head.', right: true, why: 'The HTML holds the writing. The CSS file holds the paint. The link connects them.', do: 'Keep the link in the head.', remember: 'Head calls the paint. Body shows the page.' },
          { text: 'Inside the h1, next to your name.', why: 'The h1 is your name, the words people read. Paint does not go there.', do: 'Leave the h1 as text, and put colours in the CSS file.', remember: 'Content and paint are two files.' },
        ],
      },
      {
        ask: 'The link says href="Home Page.CSS". What goes wrong?',
        choices: [
          { text: 'Nothing. Capital letters do not matter.', why: 'They do matter. Home Page.CSS is not the same name as home-page.css.', do: 'Make the href and the real file name the same, including capitals.', remember: 'The names must match exactly.' },
          { text: 'The space and the capitals may stop the file from loading.', right: true, why: 'The browser looks for the exact name. A space or a different capital is a different file.', do: 'Use one lowercase name, such as yourname.css.', remember: 'Exact name, no spaces.' },
          { text: 'href is only allowed on the menu.', why: 'href means “the place to open”. The link in the head uses it for the paint file. The menu uses it too, later.', do: 'Keep href on the stylesheet link.', remember: 'href is the address of the other file.' },
        ],
      },
    ],
  },

  'profile:skeleton': {
    practice: {
      prompt: 'The bones are almost right. The first line is missing. Add it.',
      starter: `<html lang="en">
<head>
  <title>Ada</title>
  <link rel="stylesheet" href="yourname.css">
</head>
<body>
</body>
</html>`,
      empty: {
        why: 'An empty box is not a page.',
        do: 'Start with <!DOCTYPE html>, then html, head, and body.',
        remember: 'Every page begins with the same bones.',
      },
      pass: {
        why: 'The browser is told this is HTML, and the head holds the title and the paint link.',
        remember: 'Doctype, then html, then head and body.',
      },
      rules: [
        { op: 'has', text: '<!doctype html>', miss: { why: 'Without the doctype, the browser has to guess which kind of HTML this is.', do: 'Make <!DOCTYPE html> the first line. It has no closing label.', remember: 'The first line is the doctype.' } },
        { op: 'has', text: '<head', miss: { why: 'There is no head, so the title and the paint link have nowhere to live.', do: 'Add a head before the body.', remember: 'Head is information. Body is what people see.' } },
        { op: 'has', text: '<title', miss: { why: 'The browser tab has no name. The title is not the same as the h1.', do: 'Put <title>Your Name</title> inside the head.', remember: 'Title is the tab. h1 is the heading on the page.' } },
        { op: 'has', text: '<body', miss: { why: 'There is no body, so the header and the rest have nowhere to go.', do: 'Add <body> after the head, and close it with </body>.', remember: 'What people see goes in the body.' } },
      ],
    },
    questions: [
      {
        ask: 'What is the title for?',
        choices: [
          { text: 'The big heading at the top of the page.', why: 'That heading is the h1, and it goes in the body.', do: 'Put the title in the head. Put the h1 in the body.', remember: 'Title is the tab. h1 is the page.' },
          { text: 'The name on the browser tab.', right: true, why: 'People see the title on the tab, not as the banner of the page.', do: 'Keep a title in the head on every page.', remember: 'The title lives in the head.' },
          { text: 'The paint file.', why: 'The paint file is called with link rel="stylesheet".', do: 'Leave the title as the tab name.', remember: 'Title names the tab.' },
        ],
      },
      {
        ask: 'Which line has no closing label?',
        choices: [
          { text: '<title>', why: 'Title wraps the tab name and closes with </title>.', do: 'Close the title. The doctype is the one that stays open.', remember: 'Title opens and closes.' },
          { text: '<!DOCTYPE html>', right: true, why: 'It is a declaration, not a wrapper. Nothing sits inside it.', do: 'Put it first, and do not add a second doctype line to close it.', remember: 'The doctype does not close.' },
          { text: '<body>', why: 'The body wraps everything people see, and it closes with </body>.', do: 'Close the body at the end of the page.', remember: 'Body opens and closes.' },
        ],
      },
    ],
  },

  'profile:header': {
    practice: {
      prompt: 'The words are fine. The text colour is the same as the band, so the name disappears. Fix the header rule.',
      starter: `header {
  background: #1a1712;
  color: #1a1712;
  text-align: center;
  padding: 48px 20px;
  border-bottom: 4px solid #c0532e;
}`,
      empty: {
        why: 'With no header rule, the band has no colour, no centering, and no bottom line.',
        do: 'Write a header rule: dark background #1a1712, text #faf7f2, centered, with padding and a border-bottom.',
        remember: 'Five jobs: background, contrasting text, center, padding, bottom border.',
      },
      pass: {
        why: 'The band is dark, the words are light, they sit in the middle, they have room, and the line is only along the bottom.',
        remember: 'Paper text on an ink band. Border on the bottom only.',
      },
      rules: [
        { op: 'has', text: 'color: #faf7f2', miss: { why: 'The text is ink on an ink band, so the name cannot be read. The brief asks for white or contrasting text.', do: 'Change color to #faf7f2.', remember: 'Text and background must not be the same colour.' } },
        { op: 'lacks', text: 'color: #1a1712', miss: { why: 'The dark text colour is still in the rule, so it can still win.', do: 'Delete color: #1a1712 and keep color: #faf7f2.', remember: 'One text colour, and it has to contrast.' } },
        { op: 'has', text: 'text-align: center', miss: { why: 'Without centering, the name sits on the left. The brief asks for center-aligned text.', do: 'Add text-align: center.', remember: 'Center is text-align, not a label.' } },
        { op: 'has', text: 'padding', miss: { why: 'The words will touch the edges of the band.', do: 'Add padding, for example padding: 48px 20px.', remember: 'Padding is space inside the band.' } },
        { op: 'has', text: 'border-bottom', miss: { why: 'A border around the whole box is not what the brief asked for. It asked for a border at the bottom.', do: 'Use border-bottom, not border on all four sides.', remember: 'Bottom only.' } },
      ],
    },
    questions: [
      {
        ask: 'The header background is #1a1712. Which text colour meets the brief?',
        choices: [
          { text: '#1a1712', why: 'That is the same colour as the band. The name vanishes.', do: 'Use a light colour on the dark band.', remember: 'Contrast means the text and the band are different.' },
          { text: '#faf7f2', right: true, why: 'Paper on ink is light on dark. A person can read it.', do: 'Set color: #faf7f2 on the header.', remember: 'Dark band, light words.' },
          { text: 'No colour. The browser default is enough.', why: 'The default text is dark. On a dark band it fails the contrast line of the brief.', do: 'Set the text colour yourself.', remember: 'If you paint the band, paint the text too.' },
        ],
      },
      {
        ask: 'Which rule is a border at the bottom?',
        choices: [
          { text: 'border: 4px solid #c0532e;', why: 'That draws the line on all four sides.', do: 'Use border-bottom when the brief says the bottom.', remember: 'border is the whole box. border-bottom is one edge.' },
          { text: 'border-bottom: 4px solid #c0532e;', right: true, why: 'Only the bottom edge is drawn. That matches the brief.', do: 'Keep border-bottom on the header.', remember: 'The header line is the bottom edge.' },
          { text: 'margin-bottom: 4px;', why: 'Margin is empty space outside the band. It does not draw a line.', do: 'Use border-bottom for the line, padding for space inside.', remember: 'A border draws. A margin only pushes.' },
        ],
      },
    ],
  },

  'profile:menu': {
    practice: {
      prompt: 'These look like buttons, and they go nowhere. Turn them into links.',
      starter: `<nav>
  <button>Home</button>
  <button>About</button>
  <button>Skills</button>
  <button>Contact</button>
</nav>`,
      empty: {
        why: 'There is no menu.',
        do: 'Add a nav with four links: Home, About, Skills, Contact. Each one needs an href.',
        remember: 'A menu item that moves you is a link.',
      },
      pass: {
        why: 'The four words are links with somewhere to go. You can still paint them to look like buttons.',
        remember: 'Looks like a button. Works as a link. The href is the mark.',
      },
      rules: [
        { op: 'lacks', text: '<button', miss: { why: 'A button stays on this page. It does not jump to About or Contact.', do: 'Change each button into <a href="#about"> and the other three spots.', remember: 'Button does an action. Link goes somewhere.' } },
        { op: 'has', text: '<a', miss: { why: 'The words are not links yet.', do: 'Wrap each word in an <a> label.', remember: 'The menu label is a, inside nav.' } },
        { op: 'has', text: 'href', miss: { why: 'A link with no href has nowhere to go, so the marker will not count it.', do: 'Add href="#top", href="#about", href="#skills", and href="#contact".', remember: 'The # name must match the id on the page.' } },
        { op: 'has', text: 'home', miss: { why: 'Home is missing from the menu.', do: 'Add a link whose text is Home.', remember: 'The four words are Home, About, Skills, Contact.' } },
        { op: 'has', text: 'about', miss: { why: 'About is missing.', do: 'Add the About link.', remember: 'Four words, all present.' } },
        { op: 'has', text: 'skills', miss: { why: 'Skills is missing.', do: 'Add the Skills link.', remember: 'Four words, all present.' } },
        { op: 'has', text: 'contact', miss: { why: 'Contact is missing.', do: 'Add the Contact link.', remember: 'Four words, all present.' } },
      ],
    },
    questions: [
      {
        ask: 'On this one-page profile, what does href="#skills" do?',
        choices: [
          { text: 'Opens a file called skills.', why: 'A file would be skills.html, with no hash.', do: 'Keep the # when you mean a spot on this page.', remember: '# means a spot on this page. .html means another file.' },
          { text: 'Jumps to the element with id="skills".', right: true, why: 'The hash and the id are a pair. They must be the same word.', do: 'Put id="skills" on the skills section.', remember: 'href="#skills" finds id="skills".' },
          { text: 'Paints the word blue.', why: 'Colour comes from CSS. href only says where the link goes.', do: 'Leave href as the destination.', remember: 'href is a destination, not a colour.' },
        ],
      },
      {
        ask: 'The brief shows boxes that look like buttons. What should the HTML be?',
        choices: [
          { text: '<button>Skills</button>', why: 'It looks right and goes nowhere.', do: 'Use a link, then paint it with border, padding, and margin.', remember: 'Paint can make a link look like a button.' },
          { text: '<a href="#skills">Skills</a>, painted with a border and padding.', right: true, why: 'The link does the job. The CSS does the look.', do: 'Keep the href, and style nav a.', remember: 'Job first, then paint.' },
          { text: '<a>Skills</a> with no href.', why: 'Without href it is not a working link.', do: 'Add the href.', remember: 'No href, no mark.' },
        ],
      },
    ],
  },

  'profile:about': {
    practice: {
      prompt: 'The box is the same colour as the page, so the “different background” disappears. Change the fill.',
      starter: `.about {
  background: #faf7f2;
  border: 1px solid #e4d9ce;
  padding: 20px;
  margin: 20px;
}`,
      empty: {
        why: 'Without an .about rule, the section has no box of its own.',
        do: 'Give .about a white background, a border, padding, and margin.',
        remember: 'The page is paper. The about box is white.',
      },
      pass: {
        why: 'White on a paper page is a different background, and the box still has a border and space inside and outside.',
        remember: 'If the page and the box match, the mark disappears.',
      },
      rules: [
        { op: 'has', text: '#ffffff', miss: { why: 'The box is paper, and the page is paper. The brief wants a different background.', do: 'Set background to #ffffff.', remember: 'Page #faf7f2. About box #ffffff.' } },
        { op: 'lacks', text: '#faf7f2', miss: { why: 'The page colour is still on the box.', do: 'Remove #faf7f2 from .about and keep #ffffff.', remember: 'The box must not copy the page.' } },
        { op: 'has', text: 'border', miss: { why: 'The brief asks for a border around the section.', do: 'Add border: 1px solid #e4d9ce.', remember: 'Border draws the edge.' } },
        { op: 'has', text: 'padding', miss: { why: 'Padding is the space inside the border. Without it the words touch the line.', do: 'Add padding: 20px.', remember: 'Padding is inside.' } },
        { op: 'has', text: 'margin', miss: { why: 'Margin is the space outside the box. Without it the box touches the menu.', do: 'Add margin: 20px.', remember: 'Margin is outside.' } },
      ],
    },
    questions: [
      {
        ask: 'The page background is #faf7f2. What should .about use?',
        choices: [
          { text: '#faf7f2, so it blends in.', why: 'Blending in deletes the “different background” mark.', do: 'Use white for the box.', remember: 'Different means you can see the box.' },
          { text: '#ffffff.', right: true, why: 'White is not paper. The box becomes visible.', do: 'Keep background: #ffffff on .about.', remember: 'Paper page, white about box.' },
          { text: 'No background. A border is enough.', why: 'The brief lists a different background and a border. A border alone drops one of them.', do: 'Set both.', remember: 'Background and border are two marks.' },
        ],
      },
      {
        ask: 'Which one is space inside the box?',
        choices: [
          { text: 'margin', why: 'Margin is outside the border, between this box and the next thing.', do: 'Use padding for the inside.', remember: 'Margin outside. Padding inside.' },
          { text: 'padding', right: true, why: 'Padding sits between the words and the border.', do: 'Keep padding on .about.', remember: 'Padding is inside.' },
          { text: 'border', why: 'Border is the line itself, not the room around the words.', do: 'Keep the border, and add padding as well.', remember: 'The line and the space are different.' },
        ],
      },
    ],
  },

  'profile:skills': {
    practice: {
      prompt: 'Two boxes will not pass. Add the third, with its own heading and sentence.',
      starter: `<div class="skill">
  <h3>Graphic Design</h3>
  <p>Posters and logos.</p>
</div>
<div class="skill web">
  <h3>Web Design</h3>
  <p>Pages in HTML and CSS.</p>
</div>`,
      empty: {
        why: 'There are no boxes to count.',
        do: 'Write three divs with class="skill". Each needs an h3 and a p.',
        remember: 'The marker counts to three.',
      },
      pass: {
        why: 'There are three boxes, and each one has a heading and a short description.',
        remember: 'Three boxes. Same shape. You can change the colours.',
      },
      rules: [
        { op: 'count', text: 'class="skill', min: 3, miss: { why: 'The brief asks for three skill boxes. Fewer than three drops the mark even if the ones you have look good.', do: 'Add a third <div class="skill"> with an h3 and a p. Photography is the example.', remember: 'Count them. Three.' } },
        { op: 'count', text: '<h3', min: 3, miss: { why: 'A box without a heading is just a coloured rectangle. Each box needs its own heading.', do: 'Put an h3 inside every box.', remember: 'h2 names the section. h3 names each box.' } },
        { op: 'count', text: '<p', min: 3, miss: { why: 'Each box needs a short description, not only a title.', do: 'Add a p under each h3.', remember: 'Heading and description, in every box.' } },
      ],
    },
    questions: [
      {
        ask: 'Why is the box heading an h3, not another h1?',
        choices: [
          { text: 'The page already used h1 for your name.', right: true, why: 'One h1. The section is h2. The box is h3. The sizes tell the marker what contains what.', do: 'Keep a single h1 on the page.', remember: 'h1 name, h2 section, h3 box.' },
          { text: 'h3 is the only label that can sit in a div.', why: 'A div can hold any heading. The reason is the order of the page, not a rule about div.', do: 'Use h3 because it is inside the Skills section.', remember: 'Smaller heading, smaller idea.' },
          { text: 'h1 is for CSS colours.', why: 'h1 is the main heading. Colour is paint, in the CSS file.', do: 'Leave colour in the stylesheet.', remember: 'Headings are structure. CSS is paint.' },
        ],
      },
      {
        ask: 'The three boxes should look related. What stays the same?',
        choices: [
          { text: 'The words. Copy one sentence into all three.', why: 'The words are the thing that should change. Graphic design is not photography.', do: 'Write a different short description in each box.', remember: 'Same shape, different words.' },
          { text: 'The padding, the border, and the width. The colours can change.', right: true, why: 'Shared spacing makes them a set. Different fills stop them looking copied.', do: 'Keep one .skill rule for the shape, and extra rules for the colours.', remember: 'Same padding. Three fills.' },
          { text: 'Nothing. Each box should use a new font and a new size.', why: 'That stops looking like one profile and starts looking unfinished.', do: 'Repeat the shape.', remember: 'A set matches.' },
        ],
      },
    ],
  },

  'profile:contact': {
    practice: {
      prompt: 'The bars are fine. The button says the wrong words. The brief names the button.',
      starter: `<label>Name <input type="text" name="name"></label>
<label>Email <input type="email" name="email"></label>
<label>Phone number <input type="tel" name="phone"></label>
<button type="submit">Submit</button>`,
      empty: {
        why: 'There is no contact block.',
        do: 'Add a name bar, an email bar, a phone bar, and a button that says Send Message.',
        remember: 'The button text is part of the mark.',
      },
      pass: {
        why: 'Name, email, phone, and a button that says Send Message. That is the contact list in the brief.',
        remember: 'The words on the button are Send Message.',
      },
      rules: [
        { op: 'has', text: 'type="text"', miss: { why: 'The name needs a typing bar.', do: 'Add an input with type="text" inside the Name label.', remember: 'The word and the bar sit in one label.' } },
        { op: 'has', text: 'type="email"', miss: { why: 'Email is not a plain bar in this project. type="email" says what the bar is for.', do: 'Set the email input to type="email".', remember: 'The type matches the fact.' } },
        { op: 'has', text: 'type="tel"', miss: { why: 'The phone bar should be type="tel". tel means telephone.', do: 'Change the phone input to type="tel".', remember: 'tel means telephone.' } },
        { op: 'has', text: 'send message', miss: { why: 'The brief asks for a Send Message button. Submit is a different label, and a marker looking for those words will not find them.', do: 'Change the button text to Send Message.', remember: 'Use the brief’s words on the button.' } },
      ],
    },
    questions: [
      {
        ask: 'Why is the input inside the label?',
        choices: [
          { text: 'So the word and the bar are one control. Tapping the word focuses the bar.', right: true, why: 'On a phone, the word Name is easier to hit than the thin bar. Wrapping them makes both work.', do: 'Keep the input between <label> and </label>.', remember: 'The word and the bar are one label.' },
          { text: 'Labels are only allowed to hold buttons.', why: 'A label is for a control the person fills in. The input belongs there.', do: 'Put the input inside the label.', remember: 'Label wraps the bar.' },
          { text: 'It changes the bar’s colour.', why: 'Colour comes from CSS. The label is structure.', do: 'Leave the colour in the stylesheet.', remember: 'Label means “this word belongs to this bar”.' },
        ],
      },
      {
        ask: 'This page does not really send email. What still has to be true?',
        choices: [
          { text: 'The button must connect to a real inbox or it scores zero.', why: 'This assignment has no server. The marker looks at the labels, not at a sent message.', do: 'Show the bars and the button. Do not build a mail server.', remember: 'The mark is that the controls are there.' },
          { text: 'The button can say anything, because it does nothing.', why: 'The brief names the button. The words are the mark.', do: 'Write Send Message on the button.', remember: 'The words matter even when nothing is sent.' },
          { text: 'The button says Send Message, and the three bars are name, email, and phone.', right: true, why: 'That is the whole contact requirement. Nothing is stored.', do: 'Keep those four controls.', remember: 'Name, email, phone, Send Message.' },
        ],
      },
    ],
  },

  'profile:footer': {
    practice: {
      prompt: 'The footer is the right band, with the wrong year and the wrong words. Match the brief.',
      starter: '<footer><p>Copyright 2024 My Page</p></footer>',
      empty: {
        why: 'A page with no footer drops the last mark.',
        do: 'Add a footer whose text is © 2026 My Personal Profile.',
        remember: 'The brief wrote the line. Use it.',
      },
      pass: {
        why: 'The last band carries the line from the brief, including 2026.',
        remember: '© 2026 My Personal Profile.',
      },
      rules: [
        { op: 'has', text: '<footer', miss: { why: 'A paragraph at the bottom is not a footer until it is inside the footer label.', do: 'Wrap the line in <footer>.', remember: 'Footer is the last band, its own label.' } },
        { op: 'has', text: '2026', miss: { why: 'The brief says 2026. Another year is a different line.', do: 'Change the year to 2026.', remember: 'Use the year in the brief.' } },
        { op: 'has', text: 'my personal profile', miss: { why: 'The brief gives the words, not a shorter version.', do: 'Write © 2026 My Personal Profile.', remember: 'Copy this line. Then change your own sentences elsewhere, not this one.' } },
      ],
    },
    questions: [
      {
        ask: 'Where does the footer sit?',
        choices: [
          { text: 'Inside the header, under your name.', why: 'The header is the top band. The footer is the last thing in the body.', do: 'Put the footer after contact.', remember: 'Header first. Footer last.' },
          { text: 'After the contact section, still inside the body.', right: true, why: 'It closes the page. It is not a second contact form.', do: 'Leave it last.', remember: 'Last band in the body.' },
          { text: 'In the head, next to the title.', why: 'The head is not drawn on the page. A footer people can read belongs in the body.', do: 'Move it into the body.', remember: 'If people should see it, it is in the body.' },
        ],
      },
      {
        ask: 'Which line matches the brief?',
        choices: [
          { text: 'Copyright 2024 My Page', why: 'The year is wrong, and the words are not the brief’s words.', do: 'Use the 2026 line.', remember: 'The brief wrote this one out.' },
          { text: '© 2026 My Personal Profile', right: true, why: 'Year and words match.', do: 'Keep this line in the footer.', remember: '© 2026 My Personal Profile.' },
          { text: 'Send Message', why: 'Those words belong on the contact button, not in the footer.', do: 'Put Send Message on the button, and the 2026 line in the footer.', remember: 'Each band has its own words.' },
        ],
      },
    ],
  },

  'profile:colours': {
    practice: {
      prompt: 'Blue and yellow will not be the set. Paint the header with ink and paper.',
      starter: `header {
  background: blue;
  color: yellow;
}`,
      empty: {
        why: 'No colours are set, so the header is not the set you were given.',
        do: 'Set the header background to #1a1712 and the text to #faf7f2.',
        remember: 'Ink band. Paper text. You do not invent a new pair.',
      },
      pass: {
        why: 'The header uses the set: ink behind the words, paper for the words.',
        remember: 'Clay is extra, and only in three places. The header pair is ink and paper.',
      },
      rules: [
        { op: 'has', text: '#1a1712', miss: { why: 'blue is a named colour, and it is not the set. The header band is ink.', do: 'Set background to #1a1712.', remember: 'Use the hex from the set, not colour names.' } },
        { op: 'has', text: '#faf7f2', miss: { why: 'Yellow on a dark band is readable and still the wrong set. The text is paper.', do: 'Set color to #faf7f2.', remember: 'Paper text on the ink header.' } },
        { op: 'lacks', text: 'blue', miss: { why: 'blue is still in the rule.', do: 'Delete the word blue.', remember: 'One background colour.' } },
        { op: 'lacks', text: 'yellow', miss: { why: 'yellow is still in the rule.', do: 'Delete the word yellow.', remember: 'One text colour.' } },
      ],
    },
    questions: [
      {
        ask: 'How many times should clay, #c0532e, appear?',
        choices: [
          { text: 'On every box, so the page feels warm.', why: 'A colour used everywhere stops pointing at anything.', do: 'Keep clay to the header line, the first skill border, and the button.', remember: 'Clay, three times.' },
          { text: 'Three times: the header line, the first skill border, and the button.', right: true, why: 'Those three jobs need one strong colour. The rest stay quiet.', do: 'Do not add clay to the menu or the footer text.', remember: 'Three times, no more.' },
          { text: 'Never. It is too strong.', why: 'The header needs a bottom border colour, and the button needs to be findable.', do: 'Use it in those three places.', remember: 'Strong, and rare.' },
        ],
      },
      {
        ask: 'The page is #faf7f2. About is also #faf7f2. What did you lose?',
        choices: [
          { text: 'Nothing. Matching colours look calm.', why: 'Calm, and invisible. The brief wants a different background on About.', do: 'Make About white.', remember: 'Same colour means the difference is gone.' },
          { text: 'The “different background” mark.', right: true, why: 'A marker cannot see a box that is the same colour as the page.', do: 'Set .about to #ffffff.', remember: 'Paper page. White about box.' },
          { text: 'The footer.', why: 'The footer is a separate band. This mistake is about About.', do: 'Change the about background, and leave the footer ink.', remember: 'Check About against the page colour.' },
        ],
      },
    ],
  },

  'profile:marker': {
    practice: {
      prompt: 'This is still the example. Put a real first name in the h1. Any name but Your Name.',
      starter: `<h1>Your Name</h1>
<p>I am learning to design pages.</p>`,
      empty: {
        why: 'There is no heading for a marker to read.',
        do: 'Write <h1> and your name, then </h1>.',
        remember: 'If it still says Your Name, it is the example.',
      },
      pass: {
        why: 'The h1 is no longer the example words. A marker can see a person, not the worksheet.',
        remember: 'Change the name and the sentences. Leave the labels.',
      },
      rules: [
        { op: 'has', text: '<h1', miss: { why: 'The name has to be the h1, the main heading.', do: 'Wrap the name in <h1> and </h1>.', remember: 'One h1, and it is the name.' } },
        { op: 'lacks', text: 'your name', miss: { why: 'It still says Your Name. That is the example, so it is not your page yet.', do: 'Replace Your Name with a real name.', remember: 'The example name does not get the mark.' } },
      ],
    },
    questions: [
      {
        ask: 'You finished the labels. What do you still change before you submit?',
        choices: [
          { text: 'The label names. Invent your own word instead of header.', why: 'header, nav, and footer are real labels. Inventing names breaks the page.', do: 'Keep the labels. Change the sentences.', remember: 'Labels stay. Sentences become yours.' },
          { text: 'Your name, and the about and skill sentences.', right: true, why: 'Those are the words that should be true of you. The structure can stay.', do: 'Read the page out loud and replace anything that is still the example.', remember: 'Your name. Your sentences.' },
          { text: 'Nothing. The example already passes.', why: 'A page that says Your Name is still the worksheet.', do: 'Change the name at least.', remember: 'The example is for learning, not for handing in.' },
        ],
      },
      {
        ask: 'A marker looks for the paint. Where do they look?',
        choices: [
          { text: 'In a style label in the HTML.', why: 'That is the internal method. This project asked for a file.', do: 'Keep the paint in the CSS file.', remember: 'External file.' },
          { text: 'In the CSS file named by the link in the head.', right: true, why: 'They open the HTML, find the link, then open that file.', do: 'Check the href and the file name match.', remember: 'Link in the head, paint in the file.' },
          { text: 'In the footer.', why: 'The footer is the copyright line, not the colours.', do: 'Leave the footer as the 2026 line.', remember: 'Paint is the CSS file.' },
        ],
      },
    ],
  },

  'exam:pages': {
    practice: {
      prompt: 'Each exam page must call the same paint file. This one calls a spaced name. Fix the link.',
      starter: '<link rel="stylesheet" href="home page.css">',
      empty: {
        why: 'No link means each page is unpainted, or painted inside the file.',
        do: 'Add <link rel="stylesheet" href="company.css"> in the head.',
        remember: 'Five pages. One CSS file.',
      },
      pass: {
        why: 'The page calls company.css, one word, the shared paint file.',
        remember: 'The same href on all five pages.',
      },
      rules: [
        { op: 'has', text: 'company.css', miss: { why: 'A different file name on each page lets the menu drift, and a space in the name often fails to load.', do: 'Point href at company.css.', remember: 'One shared file. No spaces.' } },
        { op: 'lacks', text: 'home page', miss: { why: 'The name still has a space.', do: 'Delete the space. company.css is one word.', remember: 'No spaces in file names.' } },
        { op: 'has', text: 'stylesheet', miss: { why: 'The link does not say this file is the paint.', do: 'Add rel="stylesheet".', remember: 'stylesheet means paint.' } },
      ],
    },
    questions: [
      {
        ask: 'The profile was one page. What is different on this paper?',
        choices: [
          { text: 'Still one page, with five headings.', why: 'The paper asks for five webpages, linked.', do: 'Make five HTML files.', remember: 'Five files, one paint file.' },
          { text: 'Five HTML files, and one CSS file linked from each.', right: true, why: 'Each menu word opens a file. The paint stays shared so the menu looks the same.', do: 'Use index, about, services, clients, and contact.', remember: 'Five pages. One company.css.' },
          { text: 'Five CSS files, and one HTML file.', why: 'That is the opposite. The writing is five files. The paint is one.', do: 'Duplicate the HTML, not the CSS.', remember: 'Pages multiply. Paint stays one file.' },
        ],
      },
      {
        ask: 'The paper describes four jobs and five buttons. What is the fifth page for?',
        choices: [
          { text: 'Leave Our Services empty. The button can go nowhere.', why: 'A button that goes nowhere fails the “linked” line.', do: 'Give services.html a real heading and some content. Three boxes are enough.', remember: 'Every button opens a page.' },
          { text: 'Our Services still needs a real page, because the button exists.', right: true, why: 'The paper names the button even though it barely describes the page.', do: 'Put three service boxes on that page.', remember: 'A named button needs a file.' },
          { text: 'Skip Contact. Social pictures can live in the head.', why: 'The head is not visible. Social pictures are a page.', do: 'Put them on the contact page, each one inside a link.', remember: 'Visible content goes in the body.' },
        ],
      },
    ],
  },

  'exam:menu': {
    practice: {
      prompt: 'The paper drew buttons. These are real buttons, so they do not open the other files. Fix the menu.',
      starter: `<button>Home</button>
<button>About Us</button>
<button>Our Services</button>
<button>Our Clients</button>
<button>Contact Us</button>`,
      empty: {
        why: 'There is no menu, so the five pages are not linked.',
        do: 'Write five <a> labels. href is the file name, such as about.html.',
        remember: 'A link opens a file. A button does not.',
      },
      pass: {
        why: 'Each word is a link to a file in the same folder. That is the menu the paper can click.',
        remember: 'href="about.html" opens a file. href="#about" only jumps on one page.',
      },
      rules: [
        { op: 'lacks', text: '<button', miss: { why: 'A button does not open about.html. The paper says the pages must be linked.', do: 'Replace each button with an <a href="about.html"> style link.', remember: 'Paint can look like a button. The label stays a link.' } },
        { op: 'has', text: 'about.html', miss: { why: 'About Us has to open the about file. A # jump stays on this page, and this paper is five files.', do: 'Set one href to about.html.', remember: 'This menu uses file names, not # jumps.' } },
        { op: 'has', text: 'index.html', miss: { why: 'Home has to open the home file.', do: 'Add href="index.html" on Home.', remember: 'index.html is Home.' } },
        { op: 'has', text: 'services.html', miss: { why: 'Our Services has no file to open.', do: 'Add href="services.html".', remember: 'One href per word.' } },
        { op: 'has', text: 'clients.html', miss: { why: 'Our Clients has no file to open.', do: 'Add href="clients.html".', remember: 'The form lives on the clients file.' } },
        { op: 'has', text: 'contact.html', miss: { why: 'Contact Us has no file to open.', do: 'Add href="contact.html".', remember: 'Five hrefs, five files.' } },
      ],
    },
    questions: [
      {
        ask: 'You click About Us and nothing happens. What is the usual cause?',
        choices: [
          { text: 'The words are a button, or a link with no href.', right: true, why: 'The marker tests the click. A button stays put. A link without href stays put.', do: 'Use <a href="about.html">About Us</a>.', remember: 'The test is the click.' },
          { text: 'The CSS file is missing a colour.', why: 'Colour does not decide whether a click opens a file.', do: 'Fix the href first. Paint second.', remember: 'Destination first.' },
          { text: 'The heading is an h2.', why: 'The heading size is unrelated to the menu.', do: 'Leave the h2, and fix the menu links.', remember: 'The menu is the nav, not the heading.' },
        ],
      },
      {
        ask: 'What does class="here" do?',
        choices: [
          { text: 'It opens the page.', why: 'Opening is the href. The class is only a name the CSS can see.', do: 'Keep the href. Use the class for the dark “you are here” paint.', remember: 'class is paint. href is the trip.' },
          { text: 'It marks the current page so the CSS can paint that one link dark.', right: true, why: 'On about.html, class="here" sits on About Us, and comes off Home.', do: 'Move the class when you copy the menu onto the next file.', remember: 'One “here” per page, on the page you are on.' },
          { text: 'It is required or the link is invalid.', why: 'A link is valid with only an href. The class is optional paint.', do: 'Do not drop the href just because the class is there.', remember: 'href is required. class="here" is the marker colour.' },
        ],
      },
    ],
  },

  'exam:home': {
    practice: {
      prompt: 'The three facts are buried in one paragraph. Give each fact the paper’s word as a heading.',
      starter: '<p>The office is 18 Marina Road, Lagos. Call 0802 000 1122. Email info@cmsl.test.</p>',
      empty: {
        why: 'The home page does not show the three facts.',
        do: 'Add three h2 headings: Office address, Telephone, Email address. Put each fact in a p under its heading.',
        remember: 'Use the paper’s words as headings so they can be found.',
      },
      pass: {
        why: 'Address, telephone, and email each have a heading. A marker can find them without reading a story.',
        remember: 'One heading per fact the paper names.',
      },
      rules: [
        { op: 'count', text: '<h2', min: 3, miss: { why: 'One paragraph hides the three facts. The paper names address, telephone, and email, and a heading for each makes them obvious.', do: 'Add three h2 labels, one for each fact.', remember: 'Say the paper’s words in the headings.' } },
        { op: 'has', text: 'address', miss: { why: 'The word address is missing, so the office fact is easy to miss.', do: 'Use a heading that says Office address, then the address in a paragraph.', remember: 'Address is its own fact.' } },
        { op: 'has', text: 'telephone', miss: { why: 'The paper says telephone. “Call” is not the word they will scan for.', do: 'Add an h2 that says Telephone, then the number.', remember: 'Use telephone, not only the number.' } },
        { op: 'has', text: 'email', miss: { why: 'The email fact has no heading.', do: 'Add an h2 that says Email address, then the email.', remember: 'Email is the third fact.' } },
      ],
    },
    questions: [
      {
        ask: 'The paper does not give the real office address. What do you do?',
        choices: [
          { text: 'Leave the home page blank until you find the real one.', why: 'The paper says use your discretion. A blank home page drops the marks.', do: 'Write a reasonable sample address, phone, and email.', remember: 'Sample details are allowed. The three facts are required.' },
          { text: 'Invent a plain address, phone, and email, each under its own heading.', right: true, why: 'Discretion means you may choose the details. The three facts still have to be on the page.', do: 'Keep the headings. The story above them can be two sentences.', remember: 'Three facts. Headings that use the paper’s words.' },
          { text: 'Copy a friend’s company history, including their address.', why: 'Their paragraph may be wrong, and it may not even be a marketing company.', do: 'Write your own two sentences, and your own sample details.', remember: 'Do not borrow a friend’s paragraph.' },
        ],
      },
      {
        ask: 'Which set of headings matches the paper?',
        choices: [
          { text: 'Our story, Our team, Our promise.', why: 'Those are fine extra headings. They are not the three required facts.', do: 'Add Office address, Telephone, and Email address.', remember: 'Required words first.' },
          { text: 'Office address, Telephone, Email address.', right: true, why: 'A marker scanning the page finds the words the paper used.', do: 'Keep those three h2s.', remember: 'Address. Telephone. Email.' },
          { text: 'One h1 that includes the address, the phone, and the email.', why: 'The h1 is the company name. Stuffing the facts into it makes them harder to see, and you only get one h1.', do: 'Leave the company name as the h1. Put the facts in h2s.', remember: 'h1 is the company. h2s are the facts.' },
        ],
      },
    ],
  },

  'exam:form': {
    practice: {
      prompt: 'The radios are not one question, the file bar has a placeholder that does nothing, and PhD is missing. Fix this piece.',
      starter: `ND/NCE <input type="radio">
HND/B.Sc. <input type="radio">
MBA/M.Sc. <input type="radio">
<input type="file" placeholder="Upload Passport">`,
      empty: {
        why: 'The qualification question is gone.',
        do: 'Write four radios with the same name="qualification", include PhD, and use type="file" with no placeholder.',
        remember: 'Same name makes radios one question.',
      },
      pass: {
        why: 'The four qualifications are one question, PhD is there, and the file control does not pretend a placeholder works.',
        remember: 'Radios share a name. type="file" is the browse button by itself.',
      },
      rules: [
        { op: 'count', text: 'name="qualification"', min: 4, miss: { why: 'Radios with no shared name are separate questions, so more than one can stay chosen. The paper wants one qualification.', do: 'Add name="qualification" to every radio. There are four of them.', remember: 'Same name, one question, one answer.' } },
        { op: 'lacks', text: 'placeholder', miss: { why: 'A file control ignores placeholder. The browser already draws the browse button.', do: 'Delete placeholder. Leave type="file".', remember: 'type="file" is the browse button. You do not label it with placeholder.' } },
        { op: 'has', text: 'phd', miss: { why: 'The paper lists four qualifications, and PhD is the fourth. A shorter list is a different question.', do: 'Add a fourth radio whose text is PhD, with the same name.', remember: 'ND/NCE, HND/B.Sc., MBA/M.Sc., PhD.' } },
      ],
    },
    questions: [
      {
        ask: 'Gender is a checkbox. Qualification is a radio. What is the difference?',
        choices: [
          { text: 'There is no difference. Use whichever you like.', why: 'The paper chose. Checkbox for gender, radio for qualification.', do: 'Follow the paper’s word for each control.', remember: 'The paper picks the type.' },
          { text: 'A checkbox can be ticked with another. Radios with the same name allow only one.', right: true, why: 'That is why the shared name on the radios matters, and why gender can be a checkbox as asked.', do: 'Give the four radios one name. Leave gender as checkboxes.', remember: 'Checkbox, more than one. Radio, one of the group.' },
          { text: 'Radios are for files. Checkboxes are for dates.', why: 'Files are type="file". Dates are type="date". Radios and checkboxes are choices.', do: 'Use type="date" for the birthday and type="file" for the passport.', remember: 'Each fact has the type the paper named.' },
        ],
      },
      {
        ask: 'State of origin must be South East states only. Which control does that?',
        choices: [
          { text: 'A text bar with a placeholder.', why: 'A text bar accepts Kano, or anything else. Placeholder is only a hint.', do: 'Use a select whose options are Abia, Anambra, Ebonyi, Enugu, and Imo.', remember: 'A select is a closed list.' },
          { text: 'A select with those five states.', right: true, why: 'The person can only pick what you listed.', do: 'Keep the five options, and no others.', remember: 'Abia, Anambra, Ebonyi, Enugu, Imo.' },
          { text: 'A datalist, so they can also type a state.', why: 'A datalist still allows typing. The paper said only those states.', do: 'Use select, not a free text bar.', remember: 'Only means they cannot type a sixth state.' },
        ],
      },
    ],
  },

  'exam:table': {
    practice: {
      prompt: 'The first row is labels, but every cell is an ordinary td. Make the first row headings.',
      starter: `<table>
  <tr>
    <td>Branch Manager</td>
    <td>Location</td>
    <td>Phone No.</td>
  </tr>
  <tr>
    <td>Mr. Remi Alalade</td>
    <td>Gbagi Market, Ibadan, Oyo State</td>
    <td>08130304598</td>
  </tr>
</table>`,
      empty: {
        why: 'There is no table.',
        do: 'Add a table. First row: three th cells. Then one tr per person, with td cells.',
        remember: 'th is a heading cell. td is an ordinary cell.',
      },
      pass: {
        why: 'The first row labels the columns with th. The person sits in td cells, in the same order.',
        remember: 'First row th. People in td. Do not change the phone numbers.',
      },
      rules: [
        { op: 'count', text: '<th', min: 3, miss: { why: 'td is an ordinary cell. The column names are headings, so they should be th. A marker looking at the top row should see headings.', do: 'Change the three cells in the first row from td to th.', remember: 'th labels the column. td holds the person.' } },
        { op: 'has', text: '08130304598', miss: { why: 'The phone number from the paper is missing or was edited. Those digits are given. Do not invent a new one.', do: 'Put 08130304598 back in Remi’s row.', remember: 'Copy the numbers. Do not retype them from memory if you can look.' } },
        { op: 'has', text: '<table', miss: { why: 'Rows that are not inside a table are just lines of text.', do: 'Wrap the rows in <table> and </table>.', remember: 'table, then tr, then th or td.' } },
      ],
    },
    questions: [
      {
        ask: 'What is a tr?',
        choices: [
          { text: 'One cell.', why: 'A cell is th or td. tr is the whole row across.', do: 'Put three cells inside each tr.', remember: 'tr is the row.' },
          { text: 'One row.', right: true, why: 'Each person is a row. The headings are a row too.', do: 'Keep one tr for the headings and one tr per person.', remember: 'A row goes across.' },
          { text: 'The border.', why: 'Borders come from CSS. tr is structure.', do: 'Draw the lines with CSS border on th and td.', remember: 'The label builds the grid. CSS draws the lines.' },
        ],
      },
      {
        ask: 'The paper lists two managers. What do you add?',
        choices: [
          { text: 'A third person, so the table looks fuller.', why: 'The paper gave two people and their numbers. A third person is a different table.', do: 'Stop at the two named people.', remember: 'Do not invent a row the paper did not print.' },
          { text: 'Only those two, with their locations and numbers unchanged.', right: true, why: 'The data is part of the question. The structure is your job. The names and digits are given.', do: 'Copy both rows.', remember: 'Two people. Their digits, not yours.' },
          { text: 'The names only. Phone numbers are private.', why: 'The paper printed the numbers and asked you to display them.', do: 'Include the phone column.', remember: 'Three columns: manager, location, phone.' },
        ],
      },
    ],
  },

  'exam:social': {
    practice: {
      prompt: 'The picture is on the page, and it is not a link. The alt text admits it failed. Fix Facebook.',
      starter: `<h3>Facebook</h3>
<img src="facebook.svg" alt="image not found">`,
      empty: {
        why: 'There is no picture and no link.',
        do: 'Write an <a href="https://facebook.com"> and put the img inside it. Set alt to Facebook.',
        remember: 'The picture sits inside the link.',
      },
      pass: {
        why: 'Facebook is a link, the picture is inside it, and the alt is the handle’s name.',
        remember: 'href is where it opens. src is the image file. alt is the name.',
      },
      rules: [
        { op: 'has', text: '<a', miss: { why: 'An image alone cannot be opened. The paper says each handle is a link.', do: 'Wrap the img in <a href="https://facebook.com"> and </a>.', remember: 'The picture goes inside the link.' } },
        { op: 'has', text: 'href', miss: { why: 'The link has nowhere to go.', do: 'Add an href to the anchor.', remember: 'href is the place. src is the picture file.' } },
        { op: 'lacks', text: 'image not found', miss: { why: 'alt is what stands in for the picture. “image not found” is what you write after you have already lost.', do: 'Set alt="Facebook".', remember: 'alt is the handle’s name.' } },
        { op: 'has', text: 'alt="facebook"', miss: { why: 'The picture has no useful alt, so a missing file says nothing.', do: 'Add alt="Facebook" on the img.', remember: 'alt describes the image.' } },
      ],
    },
    questions: [
      {
        ask: 'Which one is a social handle done the way the paper asks?',
        choices: [
          { text: '<img src="facebook.svg" alt="Facebook">', why: 'The picture is there, and it is not a link, so it fails the click.', do: 'Put the img inside an a.', remember: 'Image inside the link.' },
          { text: '<a href="https://facebook.com"><img src="facebook.svg" alt="Facebook"></a>', right: true, why: 'href opens the place. src is the file. alt is the name.', do: 'Repeat that shape for at least four handles.', remember: 'Four is the minimum. Each one is its own link.' },
          { text: '<a href="facebook.svg">Facebook</a>', why: 'That links the word, and the paper wants the handle represented by an image.', do: 'Put an img inside the link.', remember: 'The thing you see is the picture. The thing you click is the link.' },
        ],
      },
      {
        ask: 'Two handles use the same image file. What is wrong?',
        choices: [
          { text: 'Nothing, if the alt text differs.', why: 'The picture is how the handle is represented. One file reused means two handles look like the same thing, and it often means the second file was never made.', do: 'Give each handle its own image file, and a matching alt.', remember: 'One picture file per handle.' },
          { text: 'Each handle needs its own picture file and its own alt.', right: true, why: 'src must be a real file for that handle. alt must name that handle.', do: 'Do not point Instagram at facebook.svg.', remember: 'The file name, the picture, and the alt agree.' },
          { text: 'Browsers cannot show more than one image.', why: 'A page can show as many images as you link, if the files exist.', do: 'Check that each src matches a file you actually have.', remember: 'A broken src is a missing file, not a limit.' },
        ],
      },
    ],
  },

  'exam:same': {
    practice: {
      prompt: 'This page brought its own paint file. Point it at the shared one.',
      starter: '<link rel="stylesheet" href="form.css">',
      empty: {
        why: 'This page no longer calls any paint file.',
        do: 'Add <link rel="stylesheet" href="company.css">.',
        remember: 'Every page, the same href.',
      },
      pass: {
        why: 'This page uses company.css, the same file as the others.',
        remember: 'Copy the menu. Move class="here". Do not make a new CSS file.',
      },
      rules: [
        { op: 'has', text: 'company.css', miss: { why: 'form.css, social.css, and home page.css are different paints. The menu then looks different on each page, and a spaced name often fails.', do: 'Change the href to company.css.', remember: 'One paint file for all five pages.' } },
        { op: 'lacks', text: 'form.css', miss: { why: 'The old file name is still there, so this page may still be calling its own paint.', do: 'Delete form.css from the link.', remember: 'One href, the shared file.' } },
      ],
    },
    questions: [
      {
        ask: 'You duplicated index.html to make about.html. What do you change?',
        choices: [
          { text: 'The header, the menu, the footer, and the CSS link.', why: 'Those stay. They are what make it one site.', do: 'Change the middle, and move class="here".', remember: 'The frame stays. The middle changes.' },
          { text: 'The middle of the page, and which link has class="here".', right: true, why: 'About should show the about content, and About Us should be the dark link.', do: 'Leave the five links in the same order on every file.', remember: 'Same menu. One “here”.' },
          { text: 'The doctype, because each page needs its own.', why: 'Every page starts with the same doctype. It is not unique.', do: 'Keep <!DOCTYPE html> as the first line of each file.', remember: 'The bones are copied, not reinvented.' },
        ],
      },
      {
        ask: 'Before you submit, what do you click?',
        choices: [
          { text: 'Only Home. The other pages copied the menu, so they work.', why: 'A missed href on one file is the mistake this paper is written to catch.', do: 'Open every page and click all five words.', remember: 'Five pages, five clicks, on each page.' },
          { text: 'Every word in the menu, on every page.', right: true, why: 'You are checking that each word opens the right file and that you can get home again.', do: 'Fix any word that stays put before you look at colours.', remember: 'The marker will click them.' },
          { text: 'Nothing. Reading the code is enough.', why: 'A wrong file name looks fine until you click it.', do: 'Click through once.', remember: 'The test is the click.' },
        ],
      },
    ],
  },
};
