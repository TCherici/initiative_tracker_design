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

<div class="name">
  <button class="selector-item" class:selected={isSelected} on:click={() => changeSelection()}>
      {$trackerStore.name}
  </button>
  {#if $trackers.length > 1}
    <span class="material-symbols-outlined remove-item-button" on:click={() => removeTracker(trackerIdx)}>cancel</span>
  {/if}
</div>


<style>
  .material-symbols-outlined {
    font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
  }


  .selector-item {
    display: block;
    margin: 10px auto;
    width: 100%;
  }
  .selected {
    font-weight: bold;
    background-color: #cca300;
  }
  @media (prefers-color-scheme: light) {
    .selected {
      background-color: #f0c417;
    }
  }
  .name{
    margin: auto;
    position: relative;
  }
  .remove-item-button {
    position: absolute;
    top: -10px;
    right: -10px;
  }
</style>