<script>
  import { jsPDF } from "jspdf";
	import { get } from 'svelte/store';

  import Tracker from './lib/trackers/Tracker.svelte'
  import {trackers, TrackerPosition, selectedTracker} from './lib/trackerInfo.js'
	import {getCroppedImg, createPortraitCanvas} from "./lib/cropperUtils.js";
  import Selector from './lib/selector/Selector.svelte'

  let croppedImage = null
  let portraitCanvas = null

  async function createSheet(){
    console.log("Creating Sheet")
    const doc = new jsPDF({
      format: 'a4',
      unit: 'mm',
    });
    let currentTrackers = get(trackers)
    for (let i = 0; i < currentTrackers.length; i++) {
      const currentTrackerInfo = get(currentTrackers[i])
      let currentTrackerPosition = new TrackerPosition(i)
      // Add front portrait
      croppedImage = await getCroppedImg(currentTrackerInfo.image, currentTrackerInfo.cropData.pixels, currentTrackerInfo.backgroundColor)
      portraitCanvas = await createPortraitCanvas(croppedImage, currentTrackerInfo.name)

      doc.addImage(portraitCanvas, ...(currentTrackerPosition.getFrontLoc()))
      // doc.setTextColor(currentTrackerInfo.nameColor)
      // doc.text(currentTrackerInfo.name, ...(currentTrackerPosition.getFrontNameLoc()), {align: "center"})
      doc.rect(...(currentTrackerPosition.getFrontLoc()))
      // // Add back portrait
      doc.rect(...(currentTrackerPosition.getBackLoc()))
      doc.setTextColor('#000')
      doc.text(currentTrackerInfo.name, ...(currentTrackerPosition.getBackNameLoc()), {align: "center"})
    }
    
    doc.save('initiative_tracker_characters.pdf')
    console.log("Sheet created")
  }

  $: currentTrackers = $trackers
  $: currentSelectedTracker = $selectedTracker

</script>
<body>

  <div class="container">
    <div class="side-menu">
      <div class="selector">
       <Selector/>
      </div>
      <div class="create-sheet-container">
        <button class="create-sheet" on:click={async () =>{ await createSheet()}}>Print Sheet</button>
      </div>
    </div>
    <div class="tracker">
      {#each $trackers as trackerInfo, idx (trackerInfo)}
        <Tracker trackerIdx={idx}/>
      {/each}
    </div>
    <!-- {#if croppedImage}
      <img src={croppedImage} class='test-crop-img'/>
    {/if} -->
  </div>
</body>

<style>
.test-crop-img{
  position: absolute;
  left: 300px;
  z-index: -1000;
}

.container{
  width: 100vw;
  height: 100vh;
  padding: 2rem;
}
.side-menu{
  position:fixed;
  left:5%;
  width: 20%;
  min-width: 150px;
  max-width: 200px;
}
.selector{
  margin: auto;
}
.create-sheet-container{
  margin: auto;
}
.create-sheet{
  margin: 10px auto;
  width: 100%;
  font-size: 26px;
}

.tracker{
  position: relative;
  width: 80%;
  margin-top: 25px;
  margin-left: 20%;
}
</style>