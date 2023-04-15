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
  <span class="material-symbols-outlined add-tracker-icon">add_circle</span>
    Add Tracker
</button>


<style>
.tracker-list{
  margin: auto;
  display: block;
}
.add-tracker{
  display: inline;
  margin: 10px auto;
  width: 100%
}
.add-tracker-icon{
  width: 20%;
  float: left;
}
.add-tracker-name{
  width: 80%;
  float: right;
}


</style>