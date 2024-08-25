const lodash = require('lodash');
const fs = require('fs-extra');
const child_process = require('child_process');

const PATH = './src/i18n/locales';

const callback = (name) => (err) => {
  if (err) {
    throw err;
  }
  console.info(`File ${name} created successfully.`);
};

const init = () => {
  fs.readdir(PATH, (err, files) => {
    if (err) {
    } else {
      const locales = files.filter((fileName) => fileName.includes('.json'));
      locales.forEach((locale) => {
        const flat = fs.readJSONSync(`${PATH}/${locale}`);
        const tree = Object.entries(flat).reduce(
          (acc, [key, value]) => lodash.set(acc, key, value),
          {},
        );
        fs.writeFileSync(`./${PATH}/${locale}`, JSON.stringify(tree), callback(locale));
        console.log(locale);
        child_process.execSync(`npx prettier --write ${PATH}/${locale}`);
      });
    }
  });
};

init();
