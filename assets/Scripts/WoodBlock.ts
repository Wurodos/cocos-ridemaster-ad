import { _decorator, CCBoolean, CCFloat, Collider, Component, ICollisionEvent, math, Node, RigidBody } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WoodBlock')
export class WoodBlock extends Component {

    @property({type: CCFloat})
    accel = 0

    @property({type: CCFloat})
    delay = 0.2

    speed = 0
    isFalling = false

    start() {
        let collider = this.getComponent(Collider);
        collider.on('onCollisionEnter', this.onCollision, this);
    }
    
    update(dt: number): void {
        if (this.isFalling)
        {
            this.node.translate(new math.Vec3(0, 0, -this.speed*dt));
            this.speed += this.accel * dt
        }
    }
 
    private onCollision (event: ICollisionEvent) {
        this.schedule(function() {
            this.isFalling = true
        }, 0, 1, this.delay)
              
    }

}


