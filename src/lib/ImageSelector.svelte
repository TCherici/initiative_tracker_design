
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	
  let  avatar, fileinput;
  
	const onFileSelected =(e)=>{
  let image = e.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = e => {
    dispatch('change_image', {image: e.target.result})
  };
  }
</script>


<button class="upload" on:click={()=>{fileinput.click();}}><i class="fa fa-upload"></i></button>
<input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >


<style>
	.upload{
      margin: auto;
      position: absolute;
      right: 30px;
      top: 30px;
      width: 50px;
      height: 50px;
      font-size: large;
      color: rgba(255, 255, 255, 0.8);
      background-color: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
	}
  button:hover {
    color: rgba(255, 255, 255, 1.0);
    background-color: rgba(255, 255, 255, 0.4);
  }
</style>