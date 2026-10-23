import type { Step } from './types';

const menu = `<nav>
  <a class="here" href="index.html">Home</a>
  <a href="about.html">About Us</a>
  <a href="services.html">Our Services</a>
  <a href="clients.html">Our Clients</a>
  <a href="contact.html">Contact Us</a>
</nav>`;

const form = `<form action="#form" id="form">
  <label>First name <input type="text" name="firstname"></label>
  <label>Middle name <input type="text" name="middlename"></label>
  <label>Surname <input type="text" name="surname"></label>

  <fieldset>
    <legend>Gender</legend>
    <label><input type="checkbox" name="gender" value="male"> Male</label>
    <label><input type="checkbox" name="gender" value="female"> Female</label>
  </fieldset>

  <label>Date of birth <input type="date" name="dob"></label>

  <label>State of origin
    <select name="state">
      <option value="">South East states</option>
      <option>Abia</option>
      <option>Anambra</option>
      <option>Ebonyi</option>
      <option>Enugu</option>
      <option>Imo</option>
    </select>
  </label>

  <fieldset>
    <legend>Qualification</legend>
    <label><input type="radio" name="qualification" value="nd-nce"> ND/NCE</label>
    <label><input type="radio" name="qualification" value="hnd-bsc"> HND/B.Sc.</label>
    <label><input type="radio" name="qualification" value="mba-msc"> MBA/M.Sc.</label>
    <label><input type="radio" name="qualification" value="phd"> PhD</label>
  </fieldset>

  <label>Passport <input type="file" name="passport" accept="image/*"></label>

  <label>Description
    <textarea name="description" rows="5"></textarea>
  </label>

  <button type="reset">Cancel</button>
  <button type="submit">Submit</button>
</form>`;

const table = `<h2>Branch managers</h2>
<div class="table-wrap">
  <table>
    <tr>
      <th>Branch Manager</th>
      <th>Location</th>
      <th>Phone No.</th>
    </tr>
    <tr>
      <td>Mr. Remi Alalade</td>
      <td>Gbagi Market, Ibadan, Oyo State</td>
      <td>08130304598</td>
    </tr>
    <tr>
      <td>Dr. Jones Ogwuma</td>
      <td>Okpara Avenue, Enugu, Enugu State</td>
      <td>09156098799</td>
    </tr>
  </table>
</div>`;

const social = `<h2>Social media</h2>
<div class="social">
  <a href="https://facebook.com">
    <img src="icons/facebook.svg" alt="Facebook" width="64" height="64">
  </a>
  <a href="https://instagram.com">
    <img src="icons/instagram.svg" alt="Instagram" width="64" height="64">
  </a>
  <a href="https://x.com">
    <img src="icons/x.svg" alt="X" width="64" height="64">
  </a>
  <a href="https://linkedin.com">
    <img src="icons/linkedin.svg" alt="LinkedIn" width="64" height="64">
  </a>
</div>`;

export const examSteps: Step[] = [
  {
    slug: 'pages',
    title: 'Five pages, one paint file',
    summary: 'The paper asks for a small site, not one long page.',
    brief: 'Design a website of five webpages. Each page should be linked. The five buttons are Home, About Us, Our Services, Our Clients, and Contact Us. Use an external style method.',
    briefFrom: 'The exam paper',
    tellings: [
      'This paper is five HTML files, plus one CSS file. The profile you just did was one page with jumps. Here, each menu word opens another file. index.html is Home. about.html, services.html, clients.html, and contact.html are the other four.',
      'Every file starts with the same skeleton, the same header, and the same menu. The link in the head of every file points at the same paint: company.css. One paint file, five pages. The page that is different is the part inside main.',
      'The paper describes four jobs and five buttons. Home carries the address, telephone, and email. Clients carries the form. About carries the branch managers table. Contact carries the social pictures. Services is the fifth page: the button exists, so the page has to exist. The example uses three boxes there, the same shape as your skill boxes.',
    ],
    preview: { kind: 'page', src: '/study/cmsl/index.html', title: 'The example home page' },
    html: `<link rel="stylesheet" href="company.css">`,
    lines: [
      { code: 'index.html', says: 'Home. Office address, telephone, email address.' },
      { code: 'about.html', says: 'A short description of the company, then the branch managers table.' },
      { code: 'services.html', says: 'Our Services. The paper does not describe this page. Give it three boxes so the button goes somewhere real.' },
      { code: 'clients.html', says: 'The form: names, gender, date of birth, state, qualification, passport, description, Cancel, Submit.' },
      { code: 'contact.html', says: 'At least four social pictures. Each picture is a link.' },
      { code: 'company.css', says: 'The only paint file. Linked from all five pages. No spaces in the name.' },
    ],
  },
  {
    slug: 'menu',
    title: 'The menu is links',
    summary: 'They can look like buttons. They still have to be links.',
    brief: 'The five buttons must show on the pages, and each of the five webpages should be linked for easy accessibility.',
    briefFrom: 'The exam paper',
    tellings: [
      'The paper says buttons. It also says the pages should be linked. In HTML those two sentences mean: make links, and paint them so they look like buttons. A button label does not open another file. An a label with an href does.',
      'href="about.html" means: open the file called about.html that sits in the same folder. The words the person sees are About Us. You copy this same menu onto every page. On the home file, the Home link gets class="here" so the paint can mark the page you are on. Move that class when you copy the menu onto the next file.',
      'A marker who clicks Home and stays on the same screen will mark the menu down, even if the boxes look right. The test is the click. Each word opens its own file.',
    ],
    preview: { kind: 'page', src: '/study/cmsl/index.html#menu', title: 'The menu on the example site' },
    html: menu,
    css: `nav a {
  display: inline-block;
  margin: 6px;
  padding: 10px 14px;
  color: #1a1712;
  background: #ffffff;
  border: 1px solid #e4d9ce;
  text-decoration: none;
}

nav a.here {
  background: #1a1712;
  color: #faf7f2;
}`,
    lines: [
      { code: '<a href="about.html">', says: 'A link to a file in the same folder. The href is the file name, not a # jump. This is the difference from the profile menu.' },
      { code: 'About Us', says: 'The words on the button. The paper’s five are Home, About Us, Our Services, Our Clients, Contact Us.' },
      { code: 'class="here"', says: 'Marks the current page. On about.html, move class="here" onto the About Us link and take it off Home.' },
      { code: 'display: inline-block', says: 'The same paint as the profile menu. Border, padding, margin. The link looks like a button and still works as a link.' },
    ],
    friend: {
      code: `<button>Home</button>
<button>About Us</button>
<button>Our Services</button>
<button>Our Clients</button>
<button>Contact Us</button>`,
      why: 'A friend used button labels for the menu. They look like the paper’s drawing, and they go nowhere. A button stays on the page. A link opens a file. Paint the link. Keep the href.',
    },
  },
  {
    slug: 'home',
    title: 'The home page',
    summary: 'Three facts the paper names.',
    brief: 'Use your discretion for a fitting home page. Include the office address, telephone, and email address.',
    briefFrom: 'The exam paper',
    tellings: [
      'The home page needs three facts: an office address, a telephone number, and an email address. The paper does not give you the real ones. It says use your discretion, which means you may write reasonable sample details. Give each fact its own h2, so a marker can find the words Address, Telephone, and Email without hunting.',
      'A short paragraph about the company can sit above the facts. Keep it to two sentences. Do not copy a friend’s company history. Invent a plain one: Contact Marketing Services Ltd helps businesses reach their customers. The three facts are the marks. The story is extra.',
      'If those three headings are missing, the page can look busy and still lose the home marks. Say the words the paper uses: address, telephone, email.',
    ],
    preview: { kind: 'page', src: '/study/cmsl/index.html#address', title: 'Address, telephone, and email on the example' },
    html: `<h2>Office address</h2>
<p>18 Marina Road, Lagos.</p>

<h2>Telephone</h2>
<p>0802 000 1122</p>

<h2>Email address</h2>
<p>info@cmsl.test</p>`,
    lines: [
      { code: '<h2>Office address</h2>', says: 'The paper’s word, as a heading. The paragraph under it is the address you chose.' },
      { code: '<h2>Telephone</h2>', says: 'Its own heading, then the number. Do not hide the number in a long paragraph.' },
      { code: '<h2>Email address</h2>', says: 'Its own heading, then the email. info@cmsl.test is a sample. You can write another sample. It does not have to be a real inbox.' },
      { code: 'Same header and menu', says: 'Above this, the company name is the h1, and the five links are the menu. Same on every page of the site.' },
    ],
  },
  {
    slug: 'form',
    title: 'The client form',
    summary: 'One control at a time. The paper already chose the types.',
    brief: 'First name, middle name, surname. Gender as checkboxes. Date of birth as a calendar. State of origin, South East states only. Qualification as radios: ND/NCE, HND/B.Sc., MBA/M.Sc., PhD. A browse button for a passport. A description. Cancel and Submit.',
    briefFrom: 'The exam paper',
    tellings: [
      'A form is a list of questions. Each question is a label with a control inside it. A control is the thing the person uses: a bar, a tick, a calendar, a list, a file button. The paper tells you which kind to use. Follow it. Three separate bars for the names, not one bar for a full name.',
      'Gender is a checkbox, because the paper says checkbox. A checkbox can be ticked along with another one. Qualification is a radio. Radios are one question: give every radio the same name, name="qualification", and only one can stay chosen. The options are ND/NCE, HND/B.Sc., MBA/M.Sc., and PhD. Not a shorter list, and not different letters.',
      'State of origin is a select, a closed list. The paper says South East states only: Abia, Anambra, Ebonyi, Enugu, Imo. A normal text bar would let someone type Kano. Date of birth is type="date", which is the calendar. You do not draw a calendar, and you do not need a placeholder. Passport is type="file". The browser draws the browse button. Placeholder does nothing on a file control. Cancel is type="reset", which empties the form. Submit is type="submit".',
    ],
    preview: { kind: 'page', src: '/study/cmsl/clients.html#form', title: 'The example client form' },
    html: form,
    lines: [
      { code: '<label>First name <input type="text"></label>', says: 'The word and the bar are one label. Middle name and surname are the same pattern, with their own name="".' },
      { code: 'type="checkbox"', says: 'Gender. The paper asked for checkboxes. The word Male sits inside the label, after the box, so tapping the word ticks it.' },
      { code: 'type="date"', says: 'The calendar. The phone or the computer opens a date picker. Leave off placeholder.' },
      { code: '<select>', says: 'A closed list. Five options: Abia, Anambra, Ebonyi, Enugu, Imo. A person cannot type a sixth state.' },
      { code: 'type="radio" name="qualification"', says: 'The same name on all four radios makes them one question. The four values match the paper, including PhD.' },
      { code: '<fieldset> and <legend>', says: 'A fieldset is a box around one question. The legend is that question’s heading: Gender, or Qualification.' },
      { code: 'type="file"', says: 'The browse button. The browser writes “Choose file” itself. accept="image/*" means pictures only. It is a helper, not a separate mark.' },
      { code: '<textarea>', says: 'The description. A textarea is a bar with room for several lines. rows="5" sets the height.' },
      { code: 'type="reset" and type="submit"', says: 'Cancel empties the form. Submit sends it. The words on the buttons are Cancel and Submit. They sit under the questions.' },
    ],
    friend: {
      code: `Male <input type="checkbox"> Female <input type="checkbox">
<input type="text" placeholder="State of Origin">
ND/NCE <input type="radio"> HND/B.Sc. <input type="radio">
<input type="file" placeholder="Upload Passport">`,
      why: 'A friend left the words outside the labels, used a text bar for the state, and gave the radios no shared name, so they are not one question. The file control has a placeholder, which the browser ignores. The paper’s qualification list also includes MBA/M.Sc. and PhD. Use the form above, not this one.',
    },
  },
  {
    slug: 'table',
    title: 'The branch table',
    summary: 'Rows across. Cells along each row. The names are in the paper.',
    brief: 'Display the company’s branch managers, their location, and phone number.',
    briefFrom: 'The exam paper',
    tellings: [
      'A table is rows. Each row is tr. The first row is the headings: th for table heading. The next rows are the people: td for table data, an ordinary cell. Three columns, because the paper has three: Branch Manager, Location, Phone No.',
      'The two people and their numbers are printed on the paper. Copy them. Mr. Remi Alalade, Gbagi Market, Ibadan, Oyo State, 08130304598. Dr. Jones Ogwuma, Okpara Avenue, Enugu, Enugu State, 09156098799. Do not invent a third person. Do not change a digit.',
      'This is the part a friend got mostly right: a header row, then one row per person, three cells each. Keep that shape. Put the table on the About page under a heading, Branch managers. Wrap it in a div with class="table-wrap" so a phone can scroll the table sideways without scrolling the whole page.',
    ],
    preview: { kind: 'page', src: '/study/cmsl/about.html#managers', title: 'The branch table on the example' },
    html: table,
    css: `.table-wrap {
  overflow-x: auto;
  margin: 12px 20px 20px;
}

table {
  border-collapse: collapse;
  width: 100%;
  min-width: 520px;
}

th, td {
  border: 1px solid #1a1712;
  padding: 10px;
  text-align: left;
}

th {
  background: #1a1712;
  color: #faf7f2;
}`,
    lines: [
      { code: '<table>', says: 'The whole grid. It does not draw borders by itself. The CSS draws them.' },
      { code: '<tr>', says: 'One row. The first row holds three th labels. Each person is another tr.' },
      { code: '<th>', says: 'A heading cell. Branch Manager, Location, Phone No. Use the paper’s words.' },
      { code: '<td>', says: 'An ordinary cell. Three per person, in the same order as the headings.' },
      { code: 'border-collapse: collapse;', says: 'Makes the lines meet as one grid, instead of a double line around every cell.' },
      { code: '.table-wrap', says: 'overflow-x: auto lets a narrow phone scroll the table sideways. The rest of the page stays still.' },
    ],
  },
  {
    slug: 'social',
    title: 'Pictures that are links',
    summary: 'Four handles. The picture sits inside the link.',
    brief: 'Display at least four social media handles. Represent each handle with an image, as a link.',
    briefFrom: 'The exam paper',
    tellings: [
      'Each social handle is a link, and the thing inside the link is a picture. The picture is an img. The link is an a wrapped around the img. Four is the minimum. Facebook, Instagram, X, and LinkedIn are enough. A fifth is fine. Four done properly is the mark.',
      'src is the file name of the picture. The file has to sit next to the page, or in the folder you name. alt is the words that stand in for the picture if it does not load. Write Facebook, not “image not found”. The href is where the link goes. The picture and the link are two different jobs. src is the image file. href is the place it opens.',
      'A picture that is not inside an a is not a link, so it misses the mark even if the icon looks right. A broken src, or a file name with a space that does not match the real file, shows a missing image. Check the names twice.',
    ],
    preview: { kind: 'page', src: '/study/cmsl/contact.html#social', title: 'The social links on the example' },
    html: social,
    css: `.social a {
  display: inline-block;
  margin: 8px;
  padding: 8px;
  background: #ffffff;
  border: 1px solid #e4d9ce;
}

.social img {
  display: block;
  width: 64px;
  height: 64px;
}`,
    lines: [
      { code: '<a href="https://facebook.com">', says: 'The link. href is the place it opens. The picture goes inside, before </a>.' },
      { code: '<img src="icons/facebook.svg" alt="Facebook">', says: 'src is the image file, including the folder. alt is the name of the handle, for when the picture cannot be seen.' },
      { code: 'width="64" height="64"', says: 'The size of the picture. The CSS sets the same size so the four icons match.' },
      { code: 'Four anchors', says: 'Facebook, Instagram, X, LinkedIn. Each one is its own a, with its own img. Do not reuse one image file for two handles.' },
    ],
    friend: {
      code: `<h3>Facebook</h3>
<img src="image 1.png" alt="image not found">`,
      why: 'A friend put the picture on the page and never wrapped it in a link, so it cannot be opened. alt says “image not found”, which is what you write when you have already lost. The file name also has a space, and the same file was reused for another handle. Put the img inside the a. Set alt to the handle’s name.',
    },
  },
  {
    slug: 'same',
    title: 'The same menu on every page',
    summary: 'Copy it. Then move class="here".',
    tellings: [
      'Build one page until the menu works. Then duplicate the file four times and change the middle. The header, the menu, the footer, and the link to company.css stay. What changes is the h2 and the content inside main, and which link has class="here".',
      'Open each file and click every word in the menu. You should land on the matching page, and you should be able to get home again. A menu that is missing on one page is the mistake the paper is written to catch. It says the five buttons must show whenever the pages are open.',
      'Before you submit, click through once as if you have never seen the site. Home shows address, telephone, email. About shows the table. Services shows three boxes. Clients shows the form, and Cancel clears it. Contact shows four pictures you can tap. Then check that all five files link the same company.css, and that the CSS file is in the folder.',
    ],
    preview: { kind: 'page', src: '/study/cmsl/services.html', title: 'The services page, same menu, new middle' },
    lines: [
      { code: 'Duplicate the file', says: 'Save index.html as about.html. Replace the middle. Do that again for services, clients, and contact.' },
      { code: 'Move class="here"', says: 'On each file, the current page’s link is the dark one. The other four stay light.' },
      { code: 'One company.css', says: 'Do not make form.css, social.css, and home page.css. Spaces in a file name break the link. One shared file keeps the menu looking the same.' },
      { code: 'Click all five', says: 'The marker will. If one word does nothing, fix the href before you look at colours.' },
    ],
    friend: {
      code: `<link rel="stylesheet" href="home page.css">
<link rel="stylesheet" href="form.css">
<link rel="stylesheet" href="social.css">`,
      why: 'A friend used a different paint file on each page, and one of the names has a space. The pages then drift apart, and a spaced name often fails to load. Point every page at company.css.',
    },
  },
];
