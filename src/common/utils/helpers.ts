import { Product } from "../types";

/**
 * Builds a URL with query parameters.
 *
 * @param route - The base route URL.
 * @param params - An object with query parameters. If a parameter is an array, each value will be added as its own query parameter.
 * @returns The URL with encoded query parameters.
 */
export const buildUrlWithQueryParams = (
  route: string,
  params: Record<string, string | number | Array<string | number> | undefined>,
): string => {
  const queryParts: string[] = [];

  for (const key in params) {
    if (!Object.prototype.hasOwnProperty.call(params, key)) continue;

    const value = params[key];
    if (value === undefined) continue;

    if (Array.isArray(value)) {
      value.forEach((val) => {
        queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`);
      });
    } else {
      queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  }

  if (queryParts.length > 0) {
    return `${route}?${queryParts.join("&")}`;
  }

  return route;
};

/**
 * Resolves an object with query parameters to an object with only defined values.
 *
 * @param payload - An object with query parameters.
 * @returns An object with only defined values.
 */
export const resolveBuildQueryParamsPayload = (
  payload: Record<string, string | number | Array<string | number> | undefined>,
) => {
  const result: typeof payload = {};

  for (const key in payload) {
    const value = payload[key];

    if (value) {
      if (Array.isArray(value)) {
        result[key] = value.length ? value : undefined;
      } else {
        result[key] = value;
      }
    } else {
      result[key] = undefined;
    }
  }

  return result;
};

export const adaptJSONPlaceholderProduct = (item: any): Product => {
  // Generate a random price between $10 and $200
  const price = parseFloat((Math.random() * 190 + 10).toFixed(2));
  
  // Use random images from Unsplash
  const imageId = Math.floor(Math.random() * 1000);
  const image = `https://source.unsplash.com/random/300x200?product&sig=${imageId}`;
  
  return {
    id: item.id,
    title: item.title.split(' ').slice(0, 3).join(' '), // Shorten the title
    description: item.title,
    price,
    image,
  };
};