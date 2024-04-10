import { suite, test } from '@testdeck/mocha';
import { expect, assert } from 'chai';
import DialogScene from '../../../src/Engine/Domain/Dialog/DialogScene';
import DialogSceneOption from '../../../src/Engine/Domain/Dialog/DialogSceneOption';
import DialogHtmlTransformer from '../../../src/G1_TheKey/Transformer/DialogHtmlTransformer';

@suite class DialogHtmlTransformerTest {

    @test 'dialog render'() 
    {
        let scene = this.makeDialogScene();

        let htmlExpected = '<div class="dialog_scene">'
            + '<div class="dialog_scene_text">'
                + 'test'
            + '</div>'
            + '<div class="dialog_scene_options_list">'
                + '<div id="opt1" class="dialog_scene_option">'
                    + 'option1'
                + '</div>'
                + '<div id="opt2" class="dialog_scene_option">'
                    + 'option2'
                + '</div>'
                + '<div id="opt3" class="dialog_scene_option">'
                    + 'option3'
                + '</div>'
            + '</div>'
        + '</div>';

        expect(htmlExpected).equals(new DialogHtmlTransformer().toHtml(scene));
    }

    private makeDialogScene(): DialogScene
    {
        return new DialogScene('test')
            .addOption(new DialogSceneOption('opt1', 'option1', 1))
            .addOption(new DialogSceneOption('opt2', 'option2', 2))
            .addOption(new DialogSceneOption('opt3', 'option3', 3));
    }

}