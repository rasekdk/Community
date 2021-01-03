'use strict';

function getDate() {
  const current = new Date();
  const time = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

  return time;
}

module.exports = getDate;
