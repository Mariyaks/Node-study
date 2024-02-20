const localisation = require('./localisation.json');
const Handlebars = require('handlebars');

const getLocalisedString = (userLanguage, key, params) => {
    const localisationObject = localisation[key];
    if (!localisationObject) {
        throw new Error(`${key} is not a valid localisation key`);
    }
    const localisationStringToUse = localisationObject[userLanguage] ?? localisationObject.default;
    const template = Handlebars.compile(localisationStringToUse);
    return template(params ?? {});
};

module.exports = getLocalisedString;
