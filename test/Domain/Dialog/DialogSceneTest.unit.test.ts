import { suite, test } from '@testdeck/mocha';
import { expect } from 'chai';
import DialogScene from './../../../src/Domain/Dialog/DialogScene';
import DialogSceneOption from './../../../src/Domain/Dialog/DialogSceneOption';
import NextSceneProviderStatic from '../../../src/Domain/Dialog/NextSceneProviderStatic';

@suite class DialogSceneTest
{
    @test 'options sort'()
    {
        let option1 = new DialogSceneOption('1', '1', 1, new NextSceneProviderStatic(null));
        let option2 = new DialogSceneOption('2', '2', 2, new NextSceneProviderStatic(null));
        let option3 = new DialogSceneOption('3', '3', 3, new NextSceneProviderStatic(null));

        let scene = new DialogScene('test')
            .addOption(option3)
            .addOption(option1)
            .addOption(option2);

        expect(scene.getOptions()).to.deep.equal([option1, option2, option3]);
    }

    @test 'static scene loop'()
    {
        let scene = this.makeJimboDialog();

        expect('Jim: Hello!').equal(scene.getText());
        scene = scene.selectOption('howRU');

        expect('Jim: I\'m ok! Thanks!').equal(scene.getText());
        scene = scene.selectOption('again');

        expect('Jim: Hello!').equal(scene.getText());
        scene = scene.selectOption('howRU');

        expect('Jim: I\'m ok! Thanks!').equal(scene.getText());
    }

    private makeJimboDialog(): DialogScene
    {
        let dialogStartScene = new DialogScene('Jim: Hello!');
        let imFineScene = new DialogScene('Jim: I\'m ok! Thanks!');

        let optHowAreYou = new DialogSceneOption(
            'howRU', 
            'Me: Hello! How are you, Jim?', 
            1, 
            new NextSceneProviderStatic(imFineScene)
        );
        let optLetsTalkAgain = new DialogSceneOption(
            'again', 
            'Me: Let\'s start again', 
            1, 
            new NextSceneProviderStatic(dialogStartScene)
        );

        imFineScene.addOption(optLetsTalkAgain);

        return dialogStartScene.addOption(optHowAreYou);
    }
}