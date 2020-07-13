import { ParamHelper } from './utilities/param-helper';

export function formatPath(path: Paths, data: any, params?: object) {
  let url = path as string;

  for (const k of Object.keys(data)) {
    url = url.replace(':' + k, data[k]);
  }

  if (params) {
    return `${url}?${ParamHelper.getQueryString(params)}`;
  } else {
    return url;
  }
}

export enum Paths {
  home = '/',
  notFound = '/not-found',
}
