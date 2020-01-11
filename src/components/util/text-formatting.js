export const toTitleCase = (str) => {
  return str.replace(
    /\b\w+/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export const prettifyCatOrSubcatName = str => {
  // Converts ugly database values to prettier ones suitable for the web.
  // ex: "FOREIGN COIN(S)" => Foreign Coins

  // Title case every string first
  str = toTitleCase(str);

  // Prettify ugly categories and subcategories
  if (str.includes('Guitar/')) {
    str = str.split('/').reverse().join(' ');
  } else if (str.includes('Pendant/')) {
    str = str.split('/').join(' & ');
  } else if (str.includes('Tools-')) {
    str = str.split('-').reverse().join(' ');
  }

  if (str.includes("(S)")) {
    // ex: "FOREIGN COIN(S)"
    str = str.replace("(S)", "s");
  }

  return str;
}