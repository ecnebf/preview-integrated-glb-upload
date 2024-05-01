<script>
  import '@google/model-viewer';

  let file;
  let uploadedFiles = [];
  let cachedFiles = [];
  let showRegistration = true; // Control visibility of the registration overlay

  function register() {
    showRegistration = false; // Hide registration overlay
  }

  async function uploadFile() {
    const formData = new FormData();
    formData.append('glbFile', file);
    const response = await fetch('http://localhost:4444/api/upload', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      uploadedFiles.push(data.filename);
    }
  }

  function cacheFile() {
    cachedFiles.push(file.name);
  }
</script>

<!-- Registration Overlay -->
{#if showRegistration}
  <div class="modal">
    <div class="modal-content">
      <h2>Welcome to buMix3D</h2>
      <button on:click={register}>Register</button>
    </div>
  </div>
{/if}

<!-- Model Upload Section -->
<div class="sidebar">
  <button on:click={uploadFile}>Upload Model</button>
  <button on:click={cacheFile}>Cache Model</button>
  <ul>
    {#each uploadedFiles as file}
      <li>{file} <span class="green-tick">✔</span></li>
    {/each}
    {#each cachedFiles as file}
      <li>{file} <span class="red-x">✖</span></li>
    {/each}
  </ul>
</div>
<div class="viewer">
  <input type="file" on:change="{e => file = e.target.files[0]}">
  {#if file}
    <model-viewer src={URL.createObjectURL(file)} alt="Preview of GLB Model" auto-rotate camera-controls shadow-intensity="1" environment-image="neutral" exposure="1.2" class="model-viewer"></model-viewer>
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background: linear-gradient(to left, #e1bee7, #81d4fa);
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    text-align: center;
  }
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    width: 300px;
    height: 100vh;
    background: white;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  }
  .viewer {
    margin-left: 300px; 
    padding: 20px;
    width: calc(2.5 * 100% - 300px); 
    height: 100vh; 
  }
  .model-viewer {
    width: 100%;
    height: 100%; 
  }
  button, input[type="file"] {
    display: block;
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    background: #6200ea;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #3700b3;
  }
  .green-tick {
    color: green;
  }
  .red-x {
    color: red;
  }
</style>

