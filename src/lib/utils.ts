import * as implementation from '@/implementationConfig'

function _params_to_query_structure(param_array: { key: string; value: string }[]) {
  const result: Record<string, string[]> = {};
  param_array.forEach((item) => {
    if (result[item.key]) {
      result[item.key].push(item.value);
    } else {
      result[item.key] = [item.value];
    }
  });
  return result
}

const cancel_link = (keyToRemove: string, valueToRemove: string, all_params: { key: string; value: string }[]): Record<string, string[]> => {
  const filteredArr = all_params.filter(
    (item) =>
      !(item.key === keyToRemove && item.value.replace(/(^"|"$)/g, '') === valueToRemove.replace(/(^"|"$)/g, ''))
  );

  return _params_to_query_structure(filteredArr);
};

function _get_first_value(param: unknown): string | null {
  if (param === null || param === undefined) {
    return null
  }
  if (Array.isArray(param)) {
    return param.length === 0 ? null : String(param[0])
  }
  return String(param)
}

function _query_param_sort(key: string) {
  /* Sort facet params by facet title (if facet) or param name (if search term).
     Search terms are prefixed with 000_ to ensure they come first in the search
     terms display
   */
  return (key in implementation.param_labels) ? implementation.param_labels[key] : "000_"+key
}

function _tracer_bullet(msg: string): void {
  if (implementation.debug) { console.log(msg)}
}

export { _params_to_query_structure, cancel_link, _get_first_value, _query_param_sort, _tracer_bullet};
