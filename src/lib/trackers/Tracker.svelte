<script>
  import {selectedTracker} from '../trackerInfo.js'

  import Portrait from './Portrait.svelte'
  import BackPortrait from './BackPortrait.svelte'
  export let trackerIdx

  $: activeTrackerIdx = $selectedTracker
  $: isSelected = activeTrackerIdx == trackerIdx
</script>

<div class="tracker" class:selected={isSelected}>
  <Portrait {trackerIdx}/>
  <BackPortrait {trackerIdx}/>
</div>

<style>
  .tracker {
    position: absolute;
    visibility: hidden;
  }
  .selected {
    visibility: visible;
  }
</style>