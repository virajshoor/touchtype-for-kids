const stories = [
  { title: "Little Red's forest dash", lines: [
    "Little Red held her red hood and ran...",
    "The bright birds sang a song for her.",
    "A kind fox waved from beside the path.",
    "She brought warm bread to Grandma's door.",
    "The forest felt friendly all the way home."
  ]},
  { title: "The moonlit castle", chapter: "The moonlit castle", lines: [
    "A tiny star winked above the castle.",
    "Milo climbed the silver garden steps.",
    "A sleepy dragon shared its warm wing.",
    "Together they found the lost moon key.",
    "The whole night glowed with brave ideas."
  ]},
  { title: "The dragon's kind heart", chapter: "The dragon's kind heart", lines: [
    "A small dragon slept beneath the hill.",
    "Her golden sneeze made the flowers dance.",
    "A brave knight brought her blueberry pie.",
    "They laughed until the clouds turned pink.",
    "Kind hearts can make the biggest magic."
  ]},
  { title: "The starlight garden", chapter: "The starlight garden", lines: [
    "Nina found a silver seed in the grass.",
    "She planted it beneath the wishing tree.",
    "A vine curled up and tickled her nose.",
    "Soon, little stars bloomed like flowers.",
    "Nina shared their glow with every friend."
  ]},
  { title: "The cloud castle", chapter: "The cloud castle", lines: [
    "Up in the sky, a cloud castle waited.",
    "Pip packed a map and a purple umbrella.",
    "The wind carried him over the rainbow.",
    "A sleepy moonbeam showed him the way.",
    "Home felt brighter after every adventure."
  ]}
];

const rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
const keyColors = ["pink", "orange", "green", "blue", "purple"];
const storyLine = document.querySelector('#storyLine');
const hint = document.querySelector('#hint');
const keyboard = document.querySelector('#keyboard');
const progressFill = document.querySelector('#progressFill');
const lineCount = document.querySelector('#lineCount');
const starScore = document.querySelector('#starScore');
const statusMessage = document.querySelector('#statusMessage');
const pauseLayer = document.querySelector('#pauseLayer');
const toast = document.querySelector('#toast');
const title = document.querySelector('#lessonTitle');
const chapterPill = document.querySelector('#chapterPill');
const chapterName = document.querySelector('#chapterName');
const totalLines = stories.reduce((count, story) => count + story.lines.length, 0);

let chapter = 0;
let lineIndex = 0;
let cursor = 0;
let stars = 0;
let wrongKeys = 0;
let paused = false;
let toastTimer;

function currentLine() { return stories[chapter].lines[lineIndex]; }
function expectedKey() { return currentLine()[cursor]?.toLowerCase(); }

function buildKeyboard() {
  keyboard.innerHTML = '';
  rows.forEach((row, rowIndex) => {
    [...row].forEach((letter, index) => {
      const key = document.createElement('button');
      key.type = 'button';
      key.className = 'key';
      key.dataset.key = letter;
      key.setAttribute('aria-label', letter.toUpperCase());
      key.textContent = letter.toUpperCase();
      const color = keyColors[(index + rowIndex * 2) % keyColors.length];
      key.style.setProperty('--key-color', `var(--${color})`);
      key.style.setProperty('--key-shadow', `color-mix(in srgb, var(--${color}) 72%, #775b8e)`);
      keyboard.appendChild(key);
    });
  });
}

function render() {
  const line = currentLine();
  storyLine.innerHTML = [...line].map((character, index) => {
    const safe = character === ' ' ? '&nbsp;' : character.replace(/[&<>]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[tag]));
    const state = index < cursor ? 'typed' : index === cursor ? 'current' : '';
    return `<span class="${state}">${safe}</span>`;
  }).join('');
  const position = chapter * stories[chapter].lines.length + lineIndex;
  const percent = ((position + cursor / Math.max(1, line.length)) / totalLines) * 100;
  progressFill.style.width = `${Math.max(4, Math.min(100, percent))}%`;
  lineCount.textContent = lineIndex + 1;
  starScore.textContent = stars;
  chapterPill.textContent = `CHAPTER ${chapter + 1}`;
  chapterName.textContent = stories[chapter].chapter;
  document.querySelectorAll('.key').forEach(key => key.classList.toggle('target', key.dataset.key === expectedKey()));
  hint.textContent = cursor === 0 ? 'Tap the glowing key to begin the adventure.' : `${line.length - cursor} letters to go — you are doing beautifully!`;
}

function flashToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 1900);
}

function pressVisual(value, wrong = false) {
  const visual = [...document.querySelectorAll('.key')].find(node => node.dataset.key === value);
  if (!visual) return;
  visual.classList.remove('pressed', 'wrong');
  void visual.offsetWidth;
  visual.classList.add(wrong ? 'wrong' : 'pressed');
  setTimeout(() => visual.classList.remove('pressed', 'wrong'), 170);
}

function typeCharacter(value) {
  if (paused || !value || cursor >= currentLine().length) return;
  const typed = value.toLowerCase();
  if (typed !== expectedKey()) {
    wrongKeys += 1;
    pressVisual(typed, true);
    statusMessage.textContent = 'Almost! Look for the golden key.';
    statusMessage.style.color = '#dd7c74';
    flashToast('That key is having a little nap — try the glowing one!');
    return;
  }
  pressVisual(typed);
  cursor += 1;
  statusMessage.textContent = 'Lovely typing!';
  statusMessage.style.color = '#6eaa6c';
  if (cursor === currentLine().length) finishLine();
  else render();
}

function finishLine() {
  const earned = wrongKeys === 0 ? 3 : wrongKeys < 3 ? 2 : 1;
  stars += earned;
  render();
  statusMessage.textContent = `Line complete! +${earned} story stars ✨`;
  flashToast('A page-turning moment! ✨');
  setTimeout(() => {
    if (lineIndex < stories[chapter].lines.length - 1) {
      lineIndex += 1; cursor = 0; wrongKeys = 0; render();
    } else if (chapter < stories.length - 1) {
      chapter += 1; lineIndex = 0; cursor = 0; wrongKeys = 0;
      title.textContent = stories[chapter].title;
      render(); flashToast('A brand new chapter!');
    } else {
      statusMessage.textContent = 'You finished the whole story! You are a typing star!';
      flashToast('The End — wonderful work! 🌟');
    }
  }, 950);
}

function restartLine() { cursor = 0; wrongKeys = 0; statusMessage.textContent = ''; render(); flashToast('Fresh page, fresh start!'); }
function skipLine() { if (lineIndex < stories[chapter].lines.length - 1) { lineIndex += 1; restartLine(); } }
function setPaused(value) { paused = value; pauseLayer.hidden = !value; document.querySelector('.pause-button').setAttribute('aria-label', value ? 'Resume lesson' : 'Pause lesson'); }
function speak() {
  if (!('speechSynthesis' in window)) return flashToast('Audio is not available in this browser.');
  window.speechSynthesis.cancel();
  const voice = new SpeechSynthesisUtterance(currentLine());
  voice.rate = .82; voice.pitch = 1.18;
  window.speechSynthesis.speak(voice);
  flashToast('Listen closely, little storyteller…');
}

keyboard.addEventListener('click', event => { const key = event.target.closest('[data-key]'); if (key) typeCharacter(key.dataset.key); });
document.querySelector('.space-key').addEventListener('click', () => typeCharacter(' '));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') return setPaused(!paused);
  if (paused) return;
  if (event.key.length === 1) { event.preventDefault(); typeCharacter(event.key); }
});
document.addEventListener('click', event => {
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (!action) return;
  if (action === 'pause') setPaused(!paused);
  if (action === 'resume') setPaused(false);
  if (action === 'restart') { setPaused(false); restartLine(); }
  if (action === 'skip') skipLine();
  if (action === 'speak') speak();
  if (action === 'home') flashToast('Home is being polished for our next adventure!');
});

buildKeyboard();
render();
