import Image from "next/image";

import FirstScene from "./firstScene/page";
import ObjectRotateScene from "./objectRotate/page";
import GlbFilesLoadScene from "./glbFilesLoad/page";

export default function Home() {
  return (
    <div>
      <main>
        {/*<FirstScene />*/}
        <ObjectRotateScene />
        {/*<GlbFilesLoadScene />*/}
      </main>
    </div>
  );
}
