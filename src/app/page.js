import Image from "next/image";

import FirstScene from "./firstScene/page";
import ObectRotateScene from "./objectRotate/page";

export default function Home() {
  return (
    <div>
      <main>
        {/*<FirstScene />*/}
        <ObectRotateScene />
      </main>
    </div>
  );
}
