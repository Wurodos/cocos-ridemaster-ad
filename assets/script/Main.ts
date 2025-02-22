import { _decorator, Component, Label, Node, sys } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {

    
    hasInteracted = false

    static instance : Main = null;

    @property({type: Node})
    loseScreen: Node | null = null;

    @property({type: Node})
    downloadButton: Node | null = null;

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
        this.hasInteracted = true;
    }

    lose()
    {
        this.loseScreen.active = true;
    }
}


