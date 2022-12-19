export const isMultiple = (value) => (value === 0 || value > 1 ? 's' : '');

export const firstCapitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

export const wordCapitalize = (value) => {
  const splitted = value.split(' ');
  return splitted
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
};
