import { _decorator, Component, math, Node, NodeSpace } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraFollw')
export class CameraFollow extends Component {

    @property(Node)
    target : Node | null = null

    oldX = 0

    start(): void {
        this.oldX = this.target.position.x
    }

    update(deltaTime: number) {
        const horizontalMove = this.target.position.x - this.oldX
        this.node.translate(new math.Vec3(horizontalMove, 0, 0), NodeSpace.WORLD)
        this.oldX = this.target.position.x
    }
}


