import DialogScene from "./../Engine/Domain/Dialog/DialogScene";
import DialogSceneOption from "./../Engine/Domain/Dialog/DialogSceneOption";
import DialogHtmlTransformer from "./Transformer/DialogHtmlTransformer";

var myNumber = 1;
var scene = makeScene();

function makeScene(): DialogScene
{
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

function renderScene(id: string)
{
    document.getElementById(id).innerHTML = new DialogHtmlTransformer().toHtml(scene);

    var options = document.getElementsByClassName("dialog_scene_option");

    for (var i = 0; i < options.length; i++) {
        options[i].addEventListener('click', function(e) { 
            e.preventDefault();

            let dialogOptionClicked = scene.getOption(this.id);
            if (dialogOptionClicked) {
                scene = dialogOptionClicked.select();
                renderScene(id);
            }            
        }, false);
    }
}

renderScene('test_render');


