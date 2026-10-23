/** The set she submits with. Same inks as the portfolio, same quiet green as Urcrib, used as a student page. */
export type Swatch = {
  name: string;
  hex: string;
  /** Text colour that stays readable on this swatch. */
  on: string;
  job: string;
};

export const swatches: Swatch[] = [
  { name: 'Ink', hex: '#1A1712', on: '#FAF7F2', job: 'Header background, footer background, and the text on every light area.' },
  { name: 'Paper', hex: '#FAF7F2', on: '#1A1712', job: 'The page itself, and the text sitting on the dark header and footer.' },
  { name: 'Clay', hex: '#C0532E', on: '#FAF7F2', job: 'The line under the header, the Graphic Design border, and the Send Message button. Three times, no more.' },
  { name: 'Ghost', hex: '#F4EDE6', on: '#1A1712', job: 'The menu bar. Dark text on a light bar, so it does not blend into the header.' },
  { name: 'Line', hex: '#E4D9CE', on: '#1A1712', job: 'The thin borders around menu items, About, and Contact.' },
  { name: 'White', hex: '#FFFFFF', on: '#1A1712', job: 'About and Contact. White on a paper page is a different background, which is what the brief asks for.' },
  { name: 'Clay wash', hex: '#F8E8E1', on: '#8C3A1E', job: 'Graphic Design box. Pale clay, with a clay border.' },
  { name: 'Leaf', hex: '#E7F5EE', on: '#14613A', job: 'Web Design box. A quiet green, so the three boxes are not copies of each other.' },
  { name: 'Sky', hex: '#E8EEF6', on: '#1E4A73', job: 'Photography box. A quiet blue, the third colour in the set.' },
];
