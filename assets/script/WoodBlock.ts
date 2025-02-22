import { _decorator, Collider, Component, ICollisionEvent, Node, RigidBody } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WoodBlock')
export class WoodBlock extends Component {
    start() {
        let collider = this.getComponent(Collider);
        collider.on('onCollisionEnter', this.onCollision, this);
    }
 
    private onCollision (event: ICollisionEvent) {
        this.schedule(function() {
            this.getComponent(RigidBody).type = RigidBody.Type.DYNAMIC
        }, 0.1, 1)
       
    }

}


