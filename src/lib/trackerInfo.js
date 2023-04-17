import { get, writable } from 'svelte/store';
import parrot from '../assets/parrot.jpg';
import empty from '../assets/empty.png';

export let selectedTracker = writable(0)

export let trackers = writable([
  writable({
    name: 'Character Name',
    image: empty,
    cropData: null,
    backgroundColor: '#FFFFFF',
  }),
]);

const defaultTracker = {
  name: 'Character Name',
  image: empty,
  cropData: null,
  backgroundColor: '#FFFFFF',
};

export function addTracker() {
  // No more than 8 trackers
  if (get(trackers).length > 7){
    return
  }
  let newTracker = writable(JSON.parse(JSON.stringify(defaultTracker)));
  trackers.update((oldTrackers) => [...oldTrackers, newTracker]);
  // Directly select the tracker we just created
  selectedTracker.set(get(trackers).length - 1)
  console.log("Selected ", get(selectedTracker))
}

export function removeTracker(idxToRemove) {
  // No less than 1 tracker
  if (get(trackers).length < 2){
    return
  }

  trackers.update((oldTrackers) =>
    oldTrackers.filter((tracker, i) => i !== idxToRemove)
  );
  // If the selected tracker idx is higher or equal to the one removed
  //  change the selection to a lower index if possible
  let currentSelectedTrackerIdx = get(selectedTracker)
  if (currentSelectedTrackerIdx >= idxToRemove && currentSelectedTrackerIdx > 0) {
    selectedTracker.set(currentSelectedTrackerIdx - 1)
  }
}

const positions = [
  [20, 20],
  [120, 20],
  [20, 80],
  [120, 80],
  [20, 140],
  [120, 140],
  [20, 200],
  [120, 200],
];

export class TrackerPosition {
  constructor(idx) {
    this.x = positions[idx][0];
    this.y = positions[idx][1];
    this.width = 33;
    this.front_height = 43;
    this.back_height = 10;
  }

  getFrontLoc() {
    return [this.x, this.y, this.width, this.front_height]
  }

  getFrontNameLoc() {
    return [this.x + this.width / 2, this.y + 40];
  }

  getBackLoc() {
    return [this.x + this.width + 10, this.y, this.width, this.back_height];
  }

  getBackNameLoc() {
    return [this.x + this.width + 10 + this.width / 2, this.y + 7];
  }
}
