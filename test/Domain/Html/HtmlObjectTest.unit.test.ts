import { suite, test } from '@testdeck/mocha';
import { expect } from 'chai';
import HtmlObject from './../../../src/Domain/Html/HtmlObject';

@suite class DialogSceneTest
{
    @test 'html object building'()
    {
        let div = new HtmlObject('div');

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
    }
}