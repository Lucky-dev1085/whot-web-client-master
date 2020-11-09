export const isMobile = () => {
  return navigator.userAgent.includes('Mobile');
};

export const isValidEmail = value => {
  const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,61}$/i;
  return emailRegex.test(value.trim());
};

export const isValidUsername = value => {
  const usernameRegex = /^[0-9a-zA-Z]+$/;
  return usernameRegex.test(value);
};

export const isValidPromoCode = value => {
  if (value.length !== 8) {
    return false;
  }

  const promoCodeRegex = /^[0-9]+$/;
  return promoCodeRegex.test(value);
};

export const isValidPhone = value => {
  const phoneRegex = /^[0-9]+$/g;
  const isValidPattern = phoneRegex.test(value);

  if (!isValidPattern) {
    return false;
  }

  const withCountryCode = value.substring(0, 4) === '+234';
  const withoutCountryCode = value.substring(0, 1) === '0';

  return withCountryCode
    ? value.length === 14
    : withoutCountryCode && value.length === 11;
};

export const isValidumber = value => {
  const numberRegex = /^[0-9]+$/g;
  const isValidPattern = numberRegex.test(value);

  return isValidPattern;
};
