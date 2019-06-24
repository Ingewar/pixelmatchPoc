const assert = require('assert');
const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

describe('Legit pages', () => {
    it('Legit home page', () => {
        // browser.setWindowSize(1200, 574);
        browser.url('/');
        const title = browser.getTitle();
        const footer = $('.l-footer');
        footer.scrollIntoView();
        browser.pause(1000);
        footer.saveScreenshot('output/footer.png');

        const ref = PNG.sync.read(fs.readFileSync('images/footer.png'));
        const image = PNG.sync.read(fs.readFileSync('output/footer.png'));
        const {width, height} = ref;
        console.log('width', width);
        console.log('height', height);
        console.log('Get image width', image.width);
        console.log('Get image height', image.height);
        const diff = new PNG({width, height});
        const diffPixels = pixelmatch(ref.data, image.data, diff.data, ref.width, ref.height, {threshold: 0.1});
        console.log('Differens in pixels is', diffPixels);
        const pixelsForPercent = width * height / 100;
        const diffInPersent = diffPixels / pixelsForPercent;
        const THRESHOLD = 5;
        console.log('!!!', diffInPersent);
        fs.writeFileSync('output/footer-diff.png', PNG.sync.write(diff));

        assert(THRESHOLD > diffInPersent);
        assert.equal(title, 'Nigeria News today & Breaking Naija news ▷ Read on Legit.ng 24/7');
    });
});