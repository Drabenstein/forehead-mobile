import { Audio } from "expo-av";

let successSound;
let timeElapsedSound;
let passSound;

const prepareSounds = async () => {
  try {
    const [{ sound: correct }, { sound: timeElapsed }, { sound: pass }] =
      await Promise.all([
        Audio.Sound.createAsync(require("../assets/correct-1.mp3")),
        Audio.Sound.createAsync(require("../assets/time-elapsed.mp3")),
        Audio.Sound.createAsync(require("../assets/pass.mp3")),
      ]);

    successSound = correct;
    timeElapsedSound = timeElapsed;
    passSound = pass;
    console.log("Sounds loaded");
  } catch (e) {
    console.error("Failed to load sounds:", e);
  }
};

const unloadSounds = async () => {
  try {
    await Promise.all([
      successSound.unloadAsync(),
      timeElapsedSound.unloadAsync(),
      passSound.unloadAsync(),
    ]);
    console.log("Sounds unloaded");
  } catch (e) {
    console.error("Failed to unload sounds:", e);
  }
};

export const playSuccessSound = async () => {
  try {
    await successSound.replayAsync();
  } catch (e) {
    console.error("Failed to play success sound:", e);
  }
};

export const playTimeElapsedSound = async () => {
  try {
    await timeElapsedSound.replayAsync();
  } catch (e) {
    console.error("Failed to play time elapsed sound:", e);
  }
};

export const playPassSound = async () => {
  try {
    await passSound.replayAsync();
  } catch (e) {
    console.error("Failed to play pass sound:", e);
  }
};

export { prepareSounds, unloadSounds };
