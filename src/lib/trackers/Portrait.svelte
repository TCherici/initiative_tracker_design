<script>
  import Cropper from 'svelte-easy-crop'

  import overlayPNG from '../../assets/front_overlay.png'
  import ImageSelector from './ImageSelector.svelte'
  import CropperResetter from './CropperResetter.svelte'
  import {trackers} from '../trackerInfo.js'

  export let trackerIdx
  
  let trackerStore = $trackers[trackerIdx]

  let cropper
  let zoom = 1
  let crop = { x: 0, y: 0 }
  let cropSize = {width: 330, height: 430}
  let restrictPosition = false
  let zoomSpeed = 0.35
  let showGrid = false
  let minZoom = 0.3
  let image = $trackerStore.image
    

  function changeImage(event){
    image = event.detail.image
    resetCropper()
    trackerStore.update(item => ({...item, image: image}))
  }

  function changeCropData(event){
    trackerStore.update(tracker => ({...tracker, cropData: event.detail}))
  }


  function resetCropper(event){
    zoom = 1
    crop = { x: 0, y: 0 }
  }

</script>

<div class="portrait-wrapper">
  <img src={overlayPNG} class="overlay" alt="Tracker portrait"/>
  <div class="portrait" style="--background-color: {$trackerStore.backgroundColor}">
    <Cropper
        {image}
        bind:this={cropper}
        bind:crop
        bind:zoom
        bind:cropSize
        bind:restrictPosition
        bind:zoomSpeed
        bind:showGrid
        bind:minZoom
        on:cropcomplete={changeCropData}
      />
  </div>
  <ImageSelector on:change_image={changeImage}/>
  <CropperResetter on:reset_cropper={resetCropper} />
  <input class="name-input" bind:value={$trackerStore.name} maxlength="12">
</div>

<style>
	img {
		display: block;
		/* This rule is very important, please don't ignore this */
		max-width: 100%;
	}

  .portrait-wrapper {
    width: 330px;
    height: 430px;
    margin: 40px;
    margin-top: 90px;
    margin-bottom: 150px;
    display: inline-block;
    position: relative;
  }
  .portrait {
      position: absolute;
      margin: auto;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      max-width: 330px;
      max-height: 430px;
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
    top:75%;
    width: 90%;
    height: 50px;
    max-width: auto;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    background-color: #00000000;
    color: black;
    -webkit-text-fill-color: white; /* Will override color (regardless of order) */
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    border: 0px;
  }

</style>