<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	
</script>


<button class="reset" on:click={()=>{dispatch('reset_cropper', {});}}><i class="fa fa-refresh"></i></button>

<style>
.reset{
  margin: auto;
  position: absolute;
  left: 30px;
  top: 30px;
  width: 50px;
  height: 50px;
  font-size: large;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  background-color: rgba(0, 0, 0, 0.1);
}
button:hover {
  color: rgba(255, 255, 255, 0.8);
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
