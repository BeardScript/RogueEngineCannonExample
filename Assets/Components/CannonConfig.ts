import * as RE from 'rogue-engine';
import * as CANNON from 'cannon-es';

export default class CannonConfig extends RE.Component {
  world: CANNON.World;
  step: number = 1/60;
  xGravity: number = 0;
  yGravity: number = -9.82;
  zGravity: number = 0;

  static interface: RE.ComponentInterface = {
    step: "Number",
    xGravity: "Number",
    yGravity: "Number",
    zGravity: "Number",
  }

  awake() {
    this.world = new CANNON.World();
    this.world.gravity.set(this.xGravity, this.yGravity, this.zGravity);
    this.world.broadphase = new CANNON.NaiveBroadphase();
  }

  beforeUpdate() {
    this.world.gravity.set(this.xGravity, this.yGravity, this.zGravity);
    this.world.step(this.step, RE.Runtime.deltaTime, 1);
  }
}

RE.registerComponent( CannonConfig );
