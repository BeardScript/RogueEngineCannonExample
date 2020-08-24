import * as RE from 'rogue-engine';
import CannonConfig from './CannonConfig';
import { Vector3, Quaternion } from 'three';
import * as CANNON from 'cannon-es';

export default class CannonBoxBody extends RE.Component {
  cannonConfig: CannonConfig;
  shape: CANNON.Box;
  body: CANNON.Body;
  angularDamping: number = 0;
  linearDamping: number = 0;
  mass: number = 1;
  xSizeOffset: number = 0.5;
  ySizeOffset: number = 0.5;
  zSizeOffset: number = 0.5;

  static interface: RE.ComponentInterface = {
    angularDamping: "Number",
    linearDamping: "Number",
    mass: "Number",
    xSizeOffset: "Number",
    ySizeOffset: "Number",
    zSizeOffset: "Number",
  }

  awake() {
    this.setCannonConfig();
    this.createBody();
  }

  start() {
    this.cannonConfig.world.addBody(this.body);
  }

  update() {
    this.updatePhysics();
  }

  private setCannonConfig() {
    const config = RE.App.currentScene.getObjectByName("Config");

    if (config) {
      this.cannonConfig = RE.getComponent(CannonConfig, config);
    }
  }

  private createBody() {
    this.shape = new CANNON.Box(
      new CANNON.Vec3(
        this.xSizeOffset * this.object3d.scale.x,
        this.ySizeOffset * this.object3d.scale.y,
        this.zSizeOffset * this.object3d.scale.z
      )
    );

    this.body = new CANNON.Body({
      mass: this.mass
    });

    this.body.addShape(this.shape);

    this.body.angularDamping = this.angularDamping;
    this.body.linearDamping = this.linearDamping;

    const newPos = new CANNON.Vec3(
      this.object3d.position.x,
      this.object3d.position.y,
      this.object3d.position.z
    );

    const newQuaternion = new CANNON.Quaternion(
      this.object3d.quaternion.x,
      this.object3d.quaternion.y,
      this.object3d.quaternion.z,
      this.object3d.quaternion.w
    );

    this.body.position.copy(newPos);
    this.body.quaternion.copy(newQuaternion);
  }

  private updatePhysics() {
    this.body.angularDamping = this.angularDamping;
    this.body.linearDamping = this.linearDamping;
    this.body.mass = this.mass;

    const newPos = new Vector3(
      this.body.position.x,
      this.body.position.y,
      this.body.position.z
    );

    const newQuaternion = new Quaternion(
      this.body.quaternion.x,
      this.body.quaternion.y,
      this.body.quaternion.z,
      this.body.quaternion.w
    );

    this.object3d.position.copy(newPos);
    this.object3d.quaternion.copy(newQuaternion);
  }
}

RE.registerComponent( CannonBoxBody );
