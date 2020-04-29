const performCustomStringParse = (textToParse, accumulator) => {
  if (textToParse === '' || textToParse.length === 0) return null;
  const commaAdded = textToParse
    .replace(/(?:\r\n|\r|\n)/g, ',')
    .trim()
    .replace(/,+$/g, '');
  const items = commaAdded.split(',');
  const jsonString = items
    .map((item) => {
      return item.replace(/([^:]+)(:)(.+$)/, (match, p1, p2, p3) => {
        return `"${p1.trim()}": "${p3.trim()}"`;
      });
    })
    .join(', ');
  try {
    const parsedJSONObj = replaceValueEncodings(JSON.parse(`{${jsonString}}`), accumulator);
    return JSON.stringify(parsedJSONObj, null, 2);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return 'null';
  }
};

const replaceValueEncodings = (jsonToParse, accumulator) => {
  const newObject = {};
  Object.entries(jsonToParse).forEach(([key, value]) => {
    let copyOfKey = key;
    let copyOfValue = value;
    if (key.indexOf('_') !== -1) {
      copyOfKey = key.split('_').join('.');
    }
    if (copyOfKey.indexOf('date') !== -1) {
      const splitValues = value.split('--to--');
      splitValues[0] = dateStringToISO(splitValues[0]);
      splitValues[1] = dateStringToISO(splitValues[1], true);
      copyOfValue = {
        between: splitValues,
      };
    } else if (value.toString().indexOf('|') !== -1) {
      const splitValues = value.split('|');
      copyOfValue = {
        inq: splitValues,
      };
    } else {
      copyOfValue = {
        eq: value,
      };
    }
    newObject[copyOfKey] = copyOfValue;
  });
  if (accumulator) {
    const accumulatedObject = {};
    accumulatedObject[accumulator] = newObject;
    return accumulatedObject;
  }
  return newObject;
};

const dateStringToISO = (dateString, endOfDay = false) => {
  const dateObj = new Date(`${dateString} 0:00Z`);
  if (!(dateObj instanceof Date && !Number.isNaN(dateObj.getTime()))) {
    // eslint-disable-next-line no-console
    console.log('Invalid date!', dateString);
    return null;
  }
  if (endOfDay) {
    dateObj.setUTCHours(23, 59, 59, 999);
  }
  return dateObj.toISOString();
};

export default performCustomStringParse;
