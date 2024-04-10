import { suite, test } from '@testdeck/mocha';
import { expect } from 'chai';

import HtmlObject from '../../../../src/Engine/Domain/Html/HtmlObject';

@suite class HtmlObjectTest
{
    @test 'html object building'()
    {
        let text = 'Hello HTML!';

        let span = new HtmlObject('span').addContent(text);

        let div = new HtmlObject('div')
            .addContent(span)
            .addContent(span);

        div.attribute('id').set('div1');
        div.attribute('class').append('class_1').append('class2')

        expect('div').equal(div.getTag());

        let attributes = div.getAttributes();

        let idAtr = attributes[0];
        expect('id').equal(idAtr.getName());
        expect('div1').equal(idAtr.getValue());

        let classAtr = attributes[1];
        expect('class').equal(classAtr.getName());
        expect('class_1 class2').equal(classAtr.getValue());

        expect('<div id="div1" class="class_1 class2">'
            + '<span>Hello HTML!</span>'
            + '<span>Hello HTML!</span>'
        + '</div>').equal(div.render());
    }
}