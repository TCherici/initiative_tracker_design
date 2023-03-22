
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<script>
	let  avatar, fileinput;
  export let cropper;

	const onFileSelected =(e)=>{
  let image = e.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = e => {
    cropper.replace(e.target.result, );
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
      width: 150px;
      height: 50px;
      font-size: medium;
      color: red;
	}
</style>