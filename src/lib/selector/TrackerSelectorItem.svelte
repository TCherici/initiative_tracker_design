<script>
  import {selectedTracker, trackers, removeTracker} from '../trackerInfo.js'
  import { get } from 'svelte/store';

  export let trackerIdx
  $: activeTrackerIdx = $selectedTracker
  $: isSelected = activeTrackerIdx == trackerIdx

  function changeSelection() {
    activeTrackerIdx = trackerIdx
    selectedTracker.set(activeTrackerIdx)
  }

  let trackerStore = $trackers[trackerIdx]

</script>
<button class="selector-item" class:selected={isSelected} on:click={() => changeSelection()}>
  <div class="name">
  {$trackerStore.name}
  </div>
  <span class="remove-item" on:click={() => removeTracker(trackerIdx)}>❌</span>
</button>

<style>
  .selector-item {
    display: block;
    margin: 10px auto;
    width: 100%;
  }
  .selected {
    font-weight: bold;
    background-color: bisque;
  }
  .name{
    width: 80%;
    float:left;
  }
  .remove-item {
    width: 10%;
    float:right;
  }
</style>