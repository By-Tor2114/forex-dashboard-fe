exports.dateFormatter = date => {
  return date
    .toString()
    .replace(/-/g, '/')
    .slice(2, 10)
    .split('/')
    .reverse()
    .join('/');
};
