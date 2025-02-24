import { _decorator, CCFloat, Collider, Component, ITriggerEvent, Label, math, Animation, RigidBody, Slider } from 'cc';
import { Main } from './Main';
const { ccclass, property } = _decorator;

@ccclass('Car')
export class Car extends Component {

    @property({type: Slider})
    speedSlider: Slider | null = null;

    @property({type: Label})
    coinText: Label | null = null;

    @property({type: Animation})
    newCoinAnim: Animation | null = null;

    coins = 0;

    @property({type: CCFloat})
    maxImpulse = 0

    rigidBody : RigidBody = null

    private hasLost = false

    start() {
       this.coins = 0
       this.rigidBody = this.getComponent(RigidBody)

       let collider = this.getComponent(Collider);
       collider.on('onTriggerEnter', this.onTrigger, this);
    }

    update(deltaTime: number) {
        if (this.hasLost) return

        // stop unwanted rotations
        this.node.eulerAngles = new math.Vec3(0,0,Math.min(0, this.node.eulerAngles.z))

        // movement
        if (Main.instance.hasInteracted)
            this.rigidBody.applyImpulse(new math.Vec3(this.maxImpulse*this.speedSlider.progress*deltaTime, 0, 0));

        // lose condition

        if (this.node.position.y < -0.1)
        {
            this.hasLost = true
            this.schedule(function() {
                Main.instance.lose()
            }, 0, 1, 2)
            
            this.break()
        }
        
    }

    private onTrigger(event: ITriggerEvent)
    {

        // new coin animtion
        this.newCoinAnim.play();

        // destroy coin
        event.otherCollider.node.destroy();
        
        // increase coin count
        this.coins++;
        this.coinText.string = this.coins.toString();
    }

    private break()
    {
        this.getComponent(Animation).play()
    }
}


