import { differenceInMonths } from 'date-fns';
import { isPlainObject } from 'is-plain-object';

const renderPluralisedLabel = (label, num) =>
  num > 0 ? `${num} ${label}` + (num === 1 ? '' : 's') : '';

export function getNumberOfMonthsBetweenDates(start, end) {
  const startDate = new Date(`01 ${start.month} ${start.year}`);
  const endDate = new Date(`01 ${end.month} ${end.year}`);

  // Adding a full month to round up the difference > 1 month
  return differenceInMonths(endDate, startDate) + 1;
}

export function formatMonthsToYearsAndMonths(totalMonths) {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return [
    renderPluralisedLabel('year', years),
    renderPluralisedLabel('month', months),
  ]
    .filter(Boolean)
    .join(', ');
}

export function buildList(list = [], linkerFn = (item) => [{ name: item }]) {
  return list.map((item) => {
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

  const define = (term) =>
    definitions.find((d) => term.match(new RegExp(`^${d.name}$`, 'i'))) || {
      name: term,
    };

  const processWikipediaLink = (item) => {
    const result = { ...item };
    if (result.wikipedia) {
      result.wikipedia = `https://en.wikipedia.org/api/rest_v1/page/summary/${item.wikipedia}`;
    }
    return result;
  };

  return function findDefinition(term) {
    if (typeof term === 'string') {
      return term.split(separatorRe).map(define).map(processWikipediaLink);
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
