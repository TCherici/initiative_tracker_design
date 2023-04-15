<script>
  import { jsPDF } from "jspdf";
	import { get } from 'svelte/store';

  import Tracker from './lib/trackers/Tracker.svelte'
  import {trackers, TrackerPosition, selectedTracker} from './lib/trackerInfo.js'
	import {getCroppedImg, createPortraitCanvas, createBackCanvas} from "./lib/cropperUtils.js";
  import Selector from './lib/selector/Selector.svelte'

  let croppedImage = null
  let portraitCanvas = null
  let backCanvas = null

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
      backCanvas = await createBackCanvas(currentTrackerInfo.name, currentTrackerInfo.backgroundColor)

      doc.addImage(portraitCanvas, ...(currentTrackerPosition.getFrontLoc()))
      doc.rect(...(currentTrackerPosition.getFrontLoc()))
      // Add back portrait
      doc.addImage(backCanvas, ...(currentTrackerPosition.getBackLoc()))
      doc.rect(...(currentTrackerPosition.getBackLoc()))
    }
    
    doc.save('initiative_tracker_characters.pdf')
    console.log("Sheet created")
  }

  $: currentTrackers = $trackers
  $: currentSelectedTracker = $selectedTracker

</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rowdies:wght@700&display=swap" rel="stylesheet"> 
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />

<body>

  <div class="container">
    <div class="trackers-menu">
      <div class="selector">
       <Selector/>
      </div>
      <div class="create-sheet-container">
        <button class="create-sheet" on:click={async () =>{ await createSheet()}}>Print Sheet</button>
      </div>
    </div>
    <div class="trackers-wrapper">
      {#each $trackers as trackerInfo, idx (trackerInfo)}
        <Tracker trackerIdx={idx}/>
      {/each}
    </div>
  </div>
</body>

<style>

.container{
  display: flex;
  place-content: center;
  width: 95vw;
}
.trackers-menu{
 max-width:300px;
 min-width: 220px;
 height:90vh;
 width: 25%;
 position: relative;
}

.selector{
  margin: auto;
}
.create-sheet-container{
  margin: auto;
  position: absolute;
  bottom: 40%;
  left: 0;
  right: 0;
}
.create-sheet{
 margin:auto;
 font-size:26px;
}


.trackers-wrapper{
 min-width:480px;
 overflow-x:hidden;
 position: relative;
 width: 80%;
 display: flex;
 place-content: center;
}
/* Media query for mobile devices */
@media only screen and (max-width: 1150px) {
}

/* Media query for mobile devices */
@media only screen and (max-width: 600px) {
  .container {
    flex-direction: column; /* stacks content vertically */
  }
  
  .portraits-menu {
    width: 100%; /* takes up full width of the screen */
  }
  
  .portrait {
    width: 100%; /* takes up full width of the screen */
    /* any other styles for the portrait on mobile */
  }
}

</style>