<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let images: string[] = [];
  export let autoPlay: boolean = true;
  export let interval: number = 4000;

  let current = 1;
  let transitioning = true;
  let timer: NodeJS.Timeout;

  // Clonar el primer y último slide para crear efecto circular
  $: slides = images.length
    ? [images[images.length - 1], ...images, images[0]]
    : [];

  const goTo = (index: number) => (current = index + 1);

  const next = () => {
    if (current < slides.length - 1) current++;
  };

  const prev = () => {
    if (current > 0) current--;
  };

  const handleTransitionEnd = () => {
  if (current === slides.length - 1) {
    // Estamos en el slide clonado al final → saltar al primero real
    transitioning = false;
    current = 1;

    // Asegurarse que el cambio no se vea
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        transitioning = true;
      });
    });
  } else if (current === 0) {
    // Estamos en el clonado al principio → saltar al último real
    transitioning = false;
    current = slides.length - 2;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        transitioning = true;
      });
    });
  }
};


  const startAutoPlay = () => {
    stopAutoPlay();
    if (autoPlay && images.length > 1) {
      timer = setInterval(next, interval);
    }
  };

  const stopAutoPlay = () => {
    if (timer) clearInterval(timer);
  };

  onMount(startAutoPlay);
  onDestroy(stopAutoPlay);
</script>

{#if slides.length}
  <div class="relative w-full overflow-hidden">
    <!-- Slides -->
    <div
      class="flex"
      class:transition-transform={transitioning}
      class:duration-700={transitioning}
      style="transform: translateX(-{current * 100}%);"
      on:transitionend={handleTransitionEnd}
    >
      {#each slides as src, i}
        <div class="min-w-full">
          <img
            src={src}
            alt={`Slide ${i + 1}`}
            class="w-full h-[600px] object-cover"
            loading="lazy"
          />
        </div>
      {/each}
    </div>

    <!-- Arrows -->
    <button
      on:click={prev}
      class="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center"
      aria-label="Previous slide"
    >
      ‹
    </button>
    <button
      on:click={next}
      class="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center"
      aria-label="Next slide"
    >
      ›
    </button>

    <!-- Indicators -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
      {#each images as _, i}
        <button
          on:click={() => goTo(i)}
          class={`w-3 h-3 rounded-full transition-colors duration-300 ${current === i + 1 ? 'bg-white' : 'bg-white/50'}`}
          aria-label={`Go to slide ${i + 1}`}
        />
      {/each}
    </div>
  </div>
{:else}
  <p class="text-center text-gray-500 py-8">No images available for the slider.</p>
{/if}
