import { History } from 'history';

const valueToString = (v: string | boolean | number) => `${v}`;

const defaultStringToValue = (str: string) => {
  if (str === 'null') {
    return null;
  }

  if (str === 'undefined') {
    return undefined;
  }

  if (str === 'true') {
    return true;
  }

  if (str === 'false') {
    return false;
  }

  if (!Number.isNaN(Number(str))) {
    return Number(str);
  }

  return str;
};

/** 从查询字符串中获取到查询参数 */
export function getQueryValues(
  history: History,
  params: {
    [key: string]: {
      defaultValue?: any;
      stringToValue?: any;
    };
  }
) {
  const searchStr: string = history.location.search;

  const locationParams = new URLSearchParams(searchStr);
  const queryValues = {};

  Object.keys(params).forEach(param => {
    const { defaultValue, stringToValue = defaultStringToValue } = params[param];
    const valueString = locationParams.get(param);
    const value =
      valueString === null || valueString === undefined ? defaultValue : stringToValue(valueString);
    queryValues[param] = value;
  });

  return queryValues;
}

/** 更新查询参数值 */
export function updateQueryValues(
  history: History,
  queryValues: Record<string, string | number | boolean | undefined>
) {
  const searchStr: string = history.location.search;

  const locationParams = new URLSearchParams(searchStr);

  Object.keys(queryValues).forEach(param => {
    const rv = queryValues[param];
    if (rv == null) {
      return;
    }

    const value = valueToString(rv);
    locationParams.set(param, valueToString(value));
  });

  const newLocationSearchString = `?${locationParams}`;
  const oldLocationSearchString = location.search || '?';

  // Only update location if anything changed.
  if (newLocationSearchString !== oldLocationSearchString) {
    // Update location (but prevent triggering a state update).
    const newLocation = {
      pathname: history.location.pathname,
      search: newLocationSearchString,
      hash: history.location.hash,
      state: history.location.state
    };

    history.push(newLocation);
  }
}
