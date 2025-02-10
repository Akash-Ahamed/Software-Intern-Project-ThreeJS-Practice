import Image from "next/image";

import FirstScene from "./firstScene/page";
import ObectRotateScene from "./objectRotate/page";
import GlbFilesLoadScene from "./glbFilesLoad/page";

export default function Home() {
  return (
    <div>
      <main>
        {/*<FirstScene />*/}
        {/*<ObectRotateScene /> */}
        <GlbFilesLoadScene />
      </main>
    </div>
  );
}
