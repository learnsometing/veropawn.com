const toTitleCase = (str) => {
  return str.replace(
    /\b[\w']+/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
};

exports.toTitleCase = toTitleCase;

exports.prettifyName = str => {
  // Converts ugly category and subcategory names to names suitable for the web.
  // ex: "FOREIGN COIN(S)" => Foreign Coins

  const _toHumanReadableFormat = _str => {
    // handle special cases
    if (_str.includes('Guitar/')) {
      _str = _str.split('/').reverse().join(' ');
    } else if (_str.includes('Pendant/')) {
      _str = _str.split('/').join(' & ');
    } else if (_str.includes('Tools-')) {
      _str = _str.split('-').reverse().join(' ');
    } else if (_str.includes("(S)")) {
      _str = _str.replace("(S)", "s");
    }

    return _str;
  };

  // Title case every string first
  str = toTitleCase(str);
  str = _toHumanReadableFormat(str);

  return str;
};

exports.prettifyDescript = str => {
  // Converts ugly database descriptions to descriptions suitable for the web.
  // ex: "LADIES RING W/STONES" => Ladies Ring With Stones

  const _trimmedSpacesAndQuotes = _str => {
    // for some reason, some descriptions end with a lot of white space and
    // one '"' character..
    if (_str.endsWith('"')) {
      _str = _str.slice(0, -1).trim();
    }

    return _str;
  };

  const _replacedAbbreviationOfWith = _str => {
    // replace the abbreviation of 'with', written as 'W/', with the word 'with'
    if (_str.includes("W/")) {
      let split = _str.split("W/").map(statement => statement.trim());
      _str = split.join(' With ');
    }

    return _str;
  };

  const _streamlineGenderPossessiveNouns = _str => {
    // replaces any gender possessive nouns with either 'Women's' or 'Men's'
    // for consistency. Wouldn't be able to sort or filter by gender if they're
    // not consistent.

    let words = _str.split(' ');

    const _includesLadies = _str => {
      return _str.match(/^Ladies$/)
        || _str.match(/^Ladie's$/)
        || _str.match(/^Ladies'$/);
    };

    const _includesWomans = _str => {
      return _str.match(/^Womans$/) || _str.match(/^Woman's$/);
    };

    const _includesMens = _str => {
      return _str.match(/^Mens$/) || _str.match(/^Men's$/);
    };

    const _includesMans = _str => {
      return _str.match(/^Mans$/) || _str.match(/^Man's$/);
    };

    const _convertToSinglePossessiveNoun = _word => {
      // check for the incorrect possessive nouns and replace them with the correct ones
      if (_includesLadies(_word) || _includesWomans(_word)) {
        return "Women's"
      } else if (_includesMens(_word) || _includesMans(_word)) {
        return "Men's";
      }
      return _word;
    };

    const streamlined = words.map(word => _convertToSinglePossessiveNoun(word));

    return streamlined.join(' ');
  };

  // Title case every string first
  str = toTitleCase(str);

  // Trim the whitespace followed by a single " character for descriptions that
  // need it.
  str = _trimmedSpacesAndQuotes(str);

  // Replace W/ abbreviations with the word "With" where needed
  str = _replacedAbbreviationOfWith(str);

  // Streamline any gender possessive nouns to a single noun for both
  // men and women. This makes it possible to filter by gender.
  str = _streamlineGenderPossessiveNouns(str);

  return str
};

exports.prettifyHeaders = header => {
  // replace the default database fields with versions that are nicer to work with
  switch (header) {
    case 'LEVEL1_FK':
      return 'category';
    case 'LEVEL2_FK':
      return 'subcategory';
    case 'DESCRIPT':
      return 'descript';
    case 'DESCRIPT2':
      return 'descript2';
    case 'INVNUM':
      return 'invNum';
    case 'MODELNUM':
      return 'model';
  };
};