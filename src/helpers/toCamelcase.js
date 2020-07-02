/**
 * [toCamelcase description]
 *
 * @var  {[string]}
 */

export const toCamelcase = (string) =>
  string.replace(/-([a-z])/g, (m, w) => w.toUpperCase());
