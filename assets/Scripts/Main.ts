import { _decorator, Component, Label, Node, sys, Animation } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {

    
    hasInteracted = false

    static instance : Main = null;

    @property({type: Node})
    loseScreen: Node | null = null;

    @property({type: Node})
    btnDownload: Node | null = null;

    @property([Animation])
    anims: Animation[] = [];

    start()
    {
        this.hasInteracted = false;
        Main.instance = this;
    }

    takeToStore()
    {
        let link = '' 
        switch(sys.os)
        {
            case sys.OS.IOS:
                link = 'https://apps.apple.com/us/app/ride-master-car-builder-game/id6449224139'
                break
            default:
                link = 'https://play.google.com/store/apps/details?id=com.LuB.DeliveryConstruct'
        }
        window.open(link);
    }

    onInteracted()
    {
        if (!this.hasInteracted)
        {
            this.anims.forEach(anim => {
                anim.play()
            });
        }
        this.hasInteracted = true;
    }

    lose()
    {
        this.btnDownload.getComponent(Animation).play();
        this.loseScreen.active = true;
    }
}


