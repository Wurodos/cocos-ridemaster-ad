import { _decorator, Component, math, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Hand')
export class Hand extends Component {

    @property({type: Node})
    handle: Node | null = null;

    @property({type: Number})
    speed : Number

    @property({type: Number})
    limit : Number

    private startPos : math.Vec3
    private handleStartPos : math.Vec3

    start() {
        this.startPos = this.node.position.clone()
        this.handleStartPos = this.handle.position.clone()
    }

    update(deltaTime: number) {
        this.node.translate(new math.Vec3(0,this.speed.valueOf(),0));
        this.handle.translate(new math.Vec3(0,this.speed.valueOf(),0));

        if (this.node.position.y > this.limit.valueOf())
        {
            this.node.setPosition(this.startPos)
            this.handle.setPosition(this.handleStartPos)
        }
    }

    remove()
    {
        this.handle.setPosition(this.handleStartPos)
        this.enabled = false;
        this.node.destroy();
    }
}


