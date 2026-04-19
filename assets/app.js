const supportToggle = document.getElementById('supportToggle');
const supportDetails = document.getElementById('supportDetails');
const copyButtons = document.querySelectorAll('.copy-btn');
const donateSection = document.getElementById('donateSection');

function setSupportVisible(isVisible) {
  if (!supportToggle || !supportDetails) return;

  supportToggle.setAttribute('aria-expanded', String(isVisible));
  supportDetails.classList.toggle('is-open', isVisible);
  supportDetails.setAttribute('aria-hidden', String(!isVisible));

  const textNode = supportToggle.querySelector('.support-toggle-text');
  if (!textNode) return;

  const showLabel = supportToggle.dataset.showLabel || 'Show transfer details';
  const hideLabel = supportToggle.dataset.hideLabel || 'Hide transfer details';
  textNode.textContent = isVisible ? hideLabel : showLabel;
}

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const tempArea = document.createElement('textarea');
    tempArea.value = value;
    document.body.appendChild(tempArea);
    tempArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempArea);
  }
}

function bindCopyButtons() {
  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copyTarget;
      if (!value) return;

      await copyText(value);

      const defaultLabel = button.dataset.copyDefault || 'Copy';
      const copiedLabel = button.dataset.copyCopied || 'Copied';
      button.textContent = copiedLabel;
      setTimeout(() => {
        button.textContent = defaultLabel;
      }, 1200);
    });
  });
}

function updateTopGradientHeight() {
  if (!donateSection) return;
  const donateTop = donateSection.getBoundingClientRect().top + window.scrollY;
  document.documentElement.style.setProperty('--top-gradient-height', `${Math.max(0, donateTop)}px`);
}

if (supportToggle && supportDetails) {
  supportToggle.addEventListener('click', () => {
    const isVisible = supportDetails.classList.contains('is-open');
    setSupportVisible(!isVisible);
  });
}

bindCopyButtons();
setSupportVisible(false);
updateTopGradientHeight();
window.addEventListener('resize', updateTopGradientHeight);
