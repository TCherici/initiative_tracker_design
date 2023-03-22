<svelte:head>
	<link  href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.css" rel="stylesheet">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"></script>
</svelte:head>

<script>
  import overlayPNG from '../assets/overlay.png'
  import parrot from '../assets/parrot.jpg'
	import {onMount} from 'svelte'
  import ImageSelector from './ImageSelector.svelte'

	let img, cropper;

  const default_cropper_box_values = {
    left: 0,
    top: 50,
    width: 330,
    height: 430,
  }
	onMount(() => {
	  img.addEventListener('load', initCropper);
	})
	
	function initCropper(){
		cropper = new Cropper(img, {
      viewMode: 0,
      autoCropArea: 1,
      guides: false,
      center: true,
      highlight: false,
      modal: true,
      center: false,
      cropBoxMovable: false,
      cropBoxResizable: false,
      dragMode: 'move',
      toggleDragModeOnDblclick: false,
      ready: function () {
        console.log(default_cropper_box_values)
        cropper.setCropBoxData(default_cropper_box_values)
      },
			crop(event) {
        console.log('crop')
			},
		});
	}

  function changeImage(event){
    cropper.replace(event.detail.image,)
  }
  
</script>

<!-- Wrap the image or canvas element with a block element (container) -->
<div class="portrait-wrapper">
  <img src={overlayPNG} class="overlay" alt="Tracker portrait"/>
  <div class="portrait">
    <img bind:this={img} src={parrot} alt="">
  </div>
  <ImageSelector on:change_image={changeImage}/>
  <input id="character-name-display" class="name-input" value="Character Name" maxlength="12">
</div>

<style>
	img {
		display: block;
		/* This rule is very important, please don't ignore this */
		max-width: 100%;
	}

  .portrait-wrapper {
    margin: auto;
    position: relative;
    margin-top:100px;
    margin-bottom:100px;
    width: 330px;
    height: 430px;
    background-color: #000;
  }
  .portrait {
      position: absolute;
      margin: auto;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      max-width: 300px;
      max-height: 500px;
  }

  .overlay {
      margin: auto;
      pointer-events: none;
      position: absolute;
      bottom:0;
      left: 0;
      right:0;
      top: 10%;
      scale: 150%;
      /* opacity: .7; */
      z-index: 10;
  }

  .name-input {
    position: absolute;
    margin: auto;
    bottom:0;
    left: 0;
    right:0;
    top:70%;
    width: 80%;
    max-width: auto;
    font-size: xx-large;
    text-align: center;
    background-color: #00000000;
    color: white;
    border: 0px;
  }

</style>
