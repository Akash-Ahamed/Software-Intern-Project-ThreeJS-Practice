import Image from "next/image";

import FirstScene from "./firstScene/page";
import ObjectRotateScene from "./objectRotate/page";
import GlbFilesLoadScene from "./glbFilesLoad/page";
import PanoramicScene from "./panoramicScene/page";
import GltfFileLoad from "./gltfFileLoad/page";
import PhysicsScene from "./physicsLaw/page";

export default function Home() {
  return (
    <div>
      <main>
        {/*<FirstScene />*/}
        {/*<ObjectRotateScene />*/}
        {/*<GlbFilesLoadScene />*/}
        {/*} <PanoramicScene />*/}
        {/*<GltfFileLoad />*/}
        <PhysicsScene />
      </main>
    </div>
  );
}
