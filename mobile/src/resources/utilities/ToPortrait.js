import * as ScreenOrientation from "expo-screen-orientation";

async function ToPortrait() {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.PORTRAIT_UP,
  );
}

export default ToPortrait;
