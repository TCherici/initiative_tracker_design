<script>
  import TrackerSelectorItem from './TrackerSelectorItem.svelte'
  import {selectedTracker, trackers, addTracker} from '../trackerInfo.js'

  $: currentTrackers = $trackers
  $: currentSelectedTracker = $selectedTracker
</script>

<div class="tracker-list">
  {#each currentTrackers as trackerInfo, idx (trackerInfo)}
    <TrackerSelectorItem trackerIdx={idx}/>
  {/each}
</div>
<button class="add-tracker" on:click={addTracker}>
  <div class="add-tracker-name">
  Add Tracker
  </div>
  <span class="add-tracker-icon">➕</span>
</button>


<style>
.tracker-list{
  margin: auto;
  display: block;
}
.add-tracker{
  display: block;
  margin: 10px auto;
  width: 100%
}
.add-tracker-name{
  width: 80%;
  float: left;
}
.add-tracker-icon{
  width: 10%;
  float: right;
}

</style>