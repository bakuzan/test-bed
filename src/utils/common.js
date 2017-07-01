const timers = {};
export const debounce = (f, t) => {
  clearTimeout(timers[f]);
  timers[f] = setTimeout(() => f(), t);
}

export const getTimeoutSeconds = s => 1000 * s;
export const getTimeoutMinutes = m => getTimeoutSeconds(60) * m;
