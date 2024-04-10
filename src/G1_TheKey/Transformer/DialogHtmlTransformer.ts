import HtmlObject from "../../Engine/Domain/Html/HtmlObject";
import DialogScene from "../../Engine/Domain/Dialog/DialogScene";
import DialogSceneOption from "../../Engine/Domain/Dialog/DialogSceneOption";

export default class DialogHtmlTransformer
{
    public toHtml(dialogScene: DialogScene): string
    {
        let wrapper = new HtmlObject('div');
        wrapper.attribute('class').append('dialog_scene');

        let text = new HtmlObject('div').addContent(dialogScene.getText());
        text.attribute('class').append('dialog_scene_text');

        let options = new HtmlObject('div');
        options.attribute('class').append('dialog_scene_options_list');

        dialogScene.getOptions().forEach((option: DialogSceneOption) => {
            let optionHtml = new HtmlObject('div').addContent(option.getText());
            
            optionHtml.attribute('id').set(option.getId());
            optionHtml.attribute('class').append('dialog_scene_option');

            options.addContent(optionHtml);
        });

        return wrapper
            .addContent(text)
            .addContent(options)
            .render();
    }
}