import isPlainObject from 'is-plain-object';

const renderPluralisedLabel = (label, num) =>
  num > 0 ? `${num} ${label}` + (num === 1 ? '' : 's') : '';

export function getNumberOfMonthsBetweenDates(fromDate, toDate) {
  const months = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const pad = num => ('00' + num).slice(-2);
  const startDate = new Date(
    `${fromDate.year}-${pad(months.indexOf(fromDate.month))}`,
  );
  const endDate = new Date(
    `${toDate.year}-${pad(months.indexOf(toDate.month))}`,
  );

  return (
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear())
  );
}

export function durationInMonths(fromDate, toDate) {
  const numberOfMonths = getNumberOfMonthsBetweenDates(fromDate, toDate);
  const duration = {
    years: Math.floor(numberOfMonths / 12),
    months: numberOfMonths % 12,
  };
  return [
    renderPluralisedLabel('year', duration.years),
    renderPluralisedLabel('month', duration.months),
  ]
    .filter(Boolean)
    .join(', ');
}

export function buildList(list = [], linkerFn = item => [{ name: item }]) {
  return list.map(item => {
    const result = { name: item, links: linkerFn(item) };

    if (isPlainObject(item)) {
      const [name, children] = Object.entries(item)[0];
      result.name = name;
      result.children = buildList(children, linkerFn);
    }

    return result;
  });
}

export function createDefinitionFinder(definitions = []) {
  const separatorRe = /\s?,|\/\s?/;

  const define = term =>
    definitions.find(d => term.match(new RegExp(`^${d.name}$`, 'i'))) || {
      name: term,
    };

  const processWikipediaLink = item => {
    const result = Object.assign({}, item);
    if (result.wikipedia) {
      result.wikipedia = `https://en.wikipedia.org/api/rest_v1/page/summary/${item.wikipedia}`;
    }
    return result;
  };

  return function findDefinition(term) {
    if (typeof term === 'string') {
      return term
        .split(separatorRe)
        .map(define)
        .map(processWikipediaLink);
    }

    const containerName = term.name || Object.keys(term)[0];
    const containerDefinition = define(containerName);

    const result = processWikipediaLink(containerDefinition);

    const children = term[containerName];
    if (Array.isArray(children)) {
      result.children = children.map(findDefinition);
    }

    return [result];
  };
}
