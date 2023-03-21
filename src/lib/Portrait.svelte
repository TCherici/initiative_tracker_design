<svelte:head>
	<link  href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.css" rel="stylesheet">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"></script>
</svelte:head>

<script>
	import {onMount} from 'svelte'

	let img, cropper;

	onMount(() => {
	  img.addEventListener('load', initCropper);
	})
	
	function initCropper(){
    const default_cropper_box_values = {
        left: 0,
        top: 50,
        width: 330,
        height: 430,
    }
		cropper = new Cropper(img, {
      autoCropArea: 0,
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
          cropper.setCropBoxData(default_cropper_box_values)
      },
			crop(event) {
			},
		});		
	}
</script>

<!-- Wrap the image or canvas element with a block element (container) -->
<div class="portrait-wrapper">
  <div class="portrait">
    <img bind:this={img} src="https://cdn1-www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg" alt="">
  </div>
</div>

<style>
	img {
		display: block;
		/* This rule is very important, please don't ignore this */
		max-width: 100%;
	}

  .portrait_wrapper {
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

</style>
