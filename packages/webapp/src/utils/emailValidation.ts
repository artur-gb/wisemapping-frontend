const allowedDomains = (process.env.REACT_APP_ALLOWED_DOMAINS ?? '')
  .split(',')
  .map((d) => d.trim().toLowerCase())
  .filter(Boolean);

export const validateEmailDomain = (email: string, msg: string): string | null => {
  const domain = email.split('@')[1]?.toLowerCase();

  if (!domain || !allowedDomains.includes(domain)) {
    return msg;
  }

  return null;
};
