import { load as webFontLoader } from 'webfontloader';

const configureWebFontService = () => {
  if (typeof webFontLoader !== 'undefined') {
    webFontLoader({
      google: {
        families: ['Montserrat:400,500,700,700i,800'],
      },
    });
  } else {
    // eslint-disable-next-line no-console
    console.log('WebFont not defined!');
  }
};

export default configureWebFontService;
