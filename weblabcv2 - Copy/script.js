document.querySelectorAll('.menu li').forEach(item => {
  item.addEventListener('click', () => {
    const targetId = item.getAttribute('data-target');
    document.querySelectorAll('.content').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(targetId).classList.add('active');
  });
});
