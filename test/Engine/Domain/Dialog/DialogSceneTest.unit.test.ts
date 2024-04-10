import { suite, test } from '@testdeck/mocha';
import { expect } from 'chai';
import DialogScene from '../../../../src/Engine/Domain/Dialog/DialogScene';
import DialogSceneOption from '../../../../src/Engine/Domain/Dialog/DialogSceneOption';

@suite class DialogSceneTest
{
    @test 'options sort'()
    {
        let option1 = new DialogSceneOption('1', '1', 1);
        let option2 = new DialogSceneOption('2', '2', 2);
        let option3 = new DialogSceneOption('3', '3', 3);

        let scene = new DialogScene('test')
            .addOption(option3)
            .addOption(option1)
            .addOption(option2);

        expect(scene.getOptions()).to.deep.equal([option1, option2, option3]);
    }

    @test 'static scene loop'()
    {
        let nextScene = this.makeJimboDialog();

        expect('Jim: Hello!').equal(nextScene.getText());
        nextScene = nextScene.getOption('howRU').select();

        expect('Jim: I\'m ok! Thanks!').equal(nextScene.getText());
        nextScene = nextScene.getOption('again').select();

        expect('Jim: Hello!').equal(nextScene.getText());
        nextScene = nextScene.getOption('howRU').select();

        expect('Jim: I\'m ok! Thanks!').equal(nextScene.getText());
    }

    private makeJimboDialog(): DialogScene
    {
        let dialogStartScene = new DialogScene('Jim: Hello!');
        let imFineScene = new DialogScene('Jim: I\'m ok! Thanks!');

        let optHowAreYou = new DialogSceneOption(
            'howRU', 
            'Me: Hello! How are you, Jim?', 
            1
        ).bindNextSceneProvider(() => { return imFineScene });

        let optLetsTalkAgain = new DialogSceneOption(
            'again', 
            'Me: Let\'s start again', 
            2
        ).bindNextSceneProvider(() => { return dialogStartScene });

        imFineScene.addOption(optLetsTalkAgain);

        return dialogStartScene.addOption(optHowAreYou);
    }

    @test 'dynamic dialog'()
    {
        let nextScene = this.makeEvenCheckDialog();

        expect('My number is "0"').equal(nextScene.getText());

        nextScene = nextScene.getOption('checkIsEven').select();

        expect('My number is even').equal(nextScene.getText());

        nextScene = nextScene.getOption('back').select();

        expect('My number is "0"').equal(nextScene.getText());

        nextScene.getOption('increase').select();

        expect('My number is "1"').equal(nextScene.getText());

        nextScene = nextScene.getOption('checkIsEven').select();

        expect('My number is odd').equal(nextScene.getText());
    }

    private makeEvenCheckDialog(): DialogScene
    {
        let myNumber = 0;

        let rootScene = new DialogScene('My number is "' + myNumber + '"');
        
        let resultCheckScene = new DialogScene('Check result would be here').addOption(
            new DialogSceneOption('back', 'Okay').bindNextSceneProvider(() => { return rootScene })
        );

        let increaseOption = new DialogSceneOption('increase', 'Increase my number')
            .bindBeforeSelectEvent((parentScene: DialogScene) => { 
                myNumber += 1;
                parentScene.updateText('My number is "' + myNumber + '"');
            })
            .bindNextSceneProvider(() => { return rootScene });

        let checkOption = new DialogSceneOption('checkIsEven', 'Is my number even?')
            .bindAfterSelectEvent((parentScene: DialogScene, nextScene: DialogScene) => {
                nextScene.updateText(myNumber % 2 === 0 ? 'My number is even' : 'My number is odd')
            })
            .bindNextSceneProvider(() => { return resultCheckScene });

        return rootScene
            .addOption(increaseOption)
            .addOption(checkOption);
    }
}