const dialog = document.getElementById('intake-dialog');
const openers = [
  document.getElementById('open-intake'),
  document.getElementById('open-intake-2')
];

openers.forEach(button => {
  button.addEventListener('click', () => dialog.showModal());
});

document.getElementById('build-profile').addEventListener('click', () => {
  const nickname = document.getElementById('nickname').value.trim() || 'Anonymous';
  const stage = document.getElementById('stage').value;
  const story = document.getElementById('story').value.trim();

  const supportNeed =
    /sleep|insomnia|rest/i.test(story) ? 'sleep and nighttime support' :
    /scared|fear|afraid|panic/i.test(story) ? 'reassurance and steady check-ins' :
    /alone|lonely|someone|talk/i.test(story) ? 'connection with people who understand' :
    'peer support and encouragement';

  document.getElementById('profile-title').textContent = `${nickname} · ${stage}`;
  document.getElementById('profile-summary').textContent =
    `You will be matched with people in the ${stage.toLowerCase()} stage who are looking for ${supportNeed}.`;

  document.getElementById('profile-result').hidden = false;
});

document.getElementById('enter-room').addEventListener('click', () => {
  alert('This preview is working. The live community room is the next build step.');
});
