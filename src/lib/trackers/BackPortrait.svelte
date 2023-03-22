
<script>
  import overlayPNG from '../../assets/back_overlay.png'
  import ImageSelector from './ImageSelector.svelte'
  import CropperResetter from './CropperResetter.svelte'  
  import {trackers} from '../trackerInfo.js'

  export let trackerIdx
  
  let trackerStore = $trackers[trackerIdx]

</script>

<div class="back-portrait-wrapper">
  <img src={overlayPNG} class="overlay" alt="Tracker portrait"/>
  <div class="back-portrait" style="--background-color: {$trackerStore.backgroundColor}">
    <input class="name-input" bind:value={$trackerStore.name} maxlength="20">
    <input type="color" bind:value={$trackerStore.backgroundColor} class="background-color-changer">
  </div>
</div>


<style>
	img {
		display: block;
		/* This rule is very important, please don't ignore this */
		max-width: 100%;
	}

  .back-portrait-wrapper {
    margin: 20px;
    margin-bottom: 170px;
    display: inline-block;
    position: relative;
    width: 330px;
    height: 430px;
  }
  .back-portrait {
      position: absolute;
      margin: auto;
      bottom: 55%;
      left: 0;
      right: 0;
      top: 0;
      max-width: 330px;
      max-height: 150px;
      background-color: var(--background-color);
  }

  .overlay {
      margin: auto;
      pointer-events: none;
      position: absolute;
      bottom:0;
      left: -3px;
      right: 0;
      top: 10%;
      scale: 125%;
      /* opacity: .7; */
      z-index: 10;
  }

  .name-input {
    position: absolute;
    margin: auto;
    bottom:0;
    left: 0;
    right:0;
    top: 0%;
    width: 90%;
    height: 50px;
    max-width: auto;
    font-size: 32px;
    font-family: "Baskerville";
    font-weight: bold;
    text-align: center;
    background-color: #00000000;
    color: black;
    -webkit-text-fill-color: white; /* Will override color (regardless of order) */
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    border: 0px;
  }

  .background-color-changer{
    position: absolute;
    right: 30px;
    top: 30px;
    height: 30px;
    width: 30px;
  }

</style>