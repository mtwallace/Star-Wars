import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

// Promises are messing up tests
describe('index.html', () => {
    it('Favorite character should be Chewbacca', (done) => {
        const index = fs.readFileSync('./src/index.html', 'utf-8');
        jsdom.env(index, function(err, window) {
            const span = window.document.getElementById('favorite');
            expect(span.innerHTML).to.equal(''); // Chewbacca
            done();
            window.close();
        });
    });
    it('Least favorite character should be C-3PO', (done) => {
        const index = fs.readFileSync('./src/index.html', 'utf-8');
        jsdom.env(index, function(err, window) {
            const span = window.document.getElementById('least-favorite');
            expect(span.innerHTML).to.equal(''); // C-3PO
            done();
            window.close();
        });
    });
});