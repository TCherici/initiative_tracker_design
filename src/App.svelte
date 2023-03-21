<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Tracker from './lib/Tracker.svelte'
  let cats = [
		{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },
		{ id: 'z_AbfPXTKms', name: 'Maru' },
		{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
	];
</script>

<main>
  <h1>Initiative Tracker</h1>
  {#each cats as { id, name }, i}
    <div class="card">
      <Tracker />
    </div>
  {/each}

</main>

<style>
</style>
