const useData = (post) => {
  const date = new Date(post);
  const postDate = date.getTime() / 1000;

  const now = new Date();
  const nowDate = now.getTime() / 1000;

  const timeAgo = nowDate - postDate;

  let message;

  if (timeAgo < 60) {
    message = 'menos de 1 minuto';
  } else if (timeAgo > 60 && timeAgo < 150) {
    message = '1 minuto';
  } else if (timeAgo > 150 && timeAgo < 300) {
    message = '5 minutos';
  } else if (timeAgo > 300 && timeAgo < 600) {
    message = '10 minutos';
  } else if (timeAgo > 600 && timeAgo < 900) {
    message = '15 minutos';
  } else if (timeAgo > 900 && timeAgo < 2700) {
    message = '30 minutos';
  } else if (timeAgo > 2700 && timeAgo < 6300) {
    message = '1 hora';
  } else {
    let hours = Math.round(timeAgo / 3600);
    let days = Math.round(hours / 24);
    let months = Math.round(days / 30);
    let years = Math.round(months / 12);
    hours < 24
      ? (message = `${hours} horas`)
      : hours >= 24 && hours < 48
      ? (message = '1 día')
      : days > 1 && days < 30
      ? (message = `${days} días`)
      : days >= 30 && months === 1
      ? (message = '1 mes')
      : months > 1 && months < 12
      ? (message = `${months} meses`)
      : months >= 12 && years === 1
      ? (message = '1 año')
      : (message = `${years} años`);
  }

  return message;
};

export default useData;
