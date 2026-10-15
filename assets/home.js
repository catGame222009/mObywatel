const cardContainer = document.querySelector('.card-container');

if (cardContainer) {
  let startX;
  let scrollLeft;

  cardContainer.addEventListener('mousedown', (e) => {
    startX = e.pageX - cardContainer.offsetLeft;
    scrollLeft = cardContainer.scrollLeft;
    cardContainer.style.cursor = 'grabbing';
  });

  cardContainer.addEventListener('mouseleave', () => {
    cardContainer.style.cursor = 'grab';
  });

  cardContainer.addEventListener('mouseup', () => {
    cardContainer.style.cursor = 'grab';
  });

  cardContainer.addEventListener('mousemove', (e) => {
    if (!startX) return;
    e.preventDefault();
    const x = e.pageX - cardContainer.offsetLeft;
    const walk = (x - startX) * 2;
    cardContainer.scrollLeft = scrollLeft - walk;
  });

  cardContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - cardContainer.offsetLeft;
    scrollLeft = cardContainer.scrollLeft;
  });

  cardContainer.addEventListener('touchmove', (e) => {
    if (!startX) return;
    e.preventDefault();
    const x = e.touches[0].pageX - cardContainer.offsetLeft;
    const walk = (x - startX) * 2;
    cardContainer.scrollLeft = scrollLeft - walk;
  });
}
