const langSupp = require('./langSupp.js');
module.exports = (text, myGuildLang ) => {
    
    // Check in the lenguage setted on the LFG Database for the Server, and return the relative text for the relativa lang
    switch(myGuildLang.toLowerCase()) {
        case 'en':
            return langSupp[text].en;
            break;
        case 'it':
            return langSupp[text].it;
            break;
        default:
            return console.log("Language error")
            break;
    }
}