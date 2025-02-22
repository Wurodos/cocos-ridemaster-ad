import { _decorator, Component, Label, math, Node, RigidBody, RigidBodyComponent, Slider } from 'cc';
import { Main } from './Main';
const { ccclass, property } = _decorator;

@ccclass('Car')
export class Car extends Component {

    @property({type: Slider})
    speedSlider: Slider | null = null;

    @property({type: Label})
    coinText: Label | null = null;

    @property({type: Number})
    minForce = 0

    rigidBody : RigidBody = null

    start() {
       this.rigidBody = this.getComponent(RigidBody)
    }

    update(deltaTime: number) {
        this.node.eulerAngles = new math.Vec3(0,0,this.node.eulerAngles.z)
        if (Main.instance.hasInteracted)
            this.rigidBody.applyForce(new math.Vec3(this.minForce * (1 + this.speedSlider.progress), 0, 0))
        else this.rigidBody.applyForce(new math.Vec3(this.minForce, 0, 0))

        if (this.node.position.y < -10)
        {
            Main.instance.lose()
        }
        
    }
}


