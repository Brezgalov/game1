import DialogScene from "./../Engine/Domain/Dialog/DialogScene";
import DialogSceneOption from "./../Engine/Domain/Dialog/DialogSceneOption";
import DialogHtmlTransformer from "./Transformer/DialogHtmlTransformer";

var game = {
    scene: makeScene(),
}

function makeScene(): DialogScene
{
    return new DialogScene('test')
            .addOption(new DialogSceneOption('opt1', 'option1', 1))
            .addOption(new DialogSceneOption('opt2', 'option2', 2))
            .addOption(new DialogSceneOption('opt3', 'option3', 3));
}

function renderScene(id: string)
{
    document.getElementById(id).innerHTML = new DialogHtmlTransformer().toHtml(game.scene);
}

renderScene('test_render');