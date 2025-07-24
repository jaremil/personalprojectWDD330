  const Validator = (() => {
    function isValidCityName(name) {
      const cityRegex = /^[a-zA-Z\s-]{2,}$/;
      return cityRegex.test(name.trim());
    }

    return { isValidCityName };
  })();