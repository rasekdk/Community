const useChangeColor = () => {
  const html = document.querySelector('html');

  const isPurple = html.classList.contains('purple');

  const isOrange = html.classList.contains('orange');

  if (isOrange) {
    html.classList.remove('orange');
    html.classList.add('purple');
  } else if (isPurple) {
    html.classList.remove('purple');
    html.classList.toggle('green');
  } else {
    html.classList.remove('green');
    html.classList.toggle('orange');
  }
};

export default useChangeColor;
