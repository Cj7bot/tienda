<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let images: string[] = [];
  export let autoPlay: boolean = true;
  export let interval: number = 5000;
  export let height: string = '600px';
  export let showDots: boolean = true;
  export let showArrows: boolean = true;
  export let pauseOnHover: boolean = true;

  let currentSlide = 0;
  let isTransitioning = false;
  let autoPlayTimer: NodeJS.Timeout | null = null;
  let sliderContainer: HTMLDivElement;
  let touchStartX = 0;
  let touchEndX = 0;

  $: totalSlides = images.length;
  $: canNavigate = totalSlides > 1;

  const goToSlide = (index: number): void => {
    if (isTransitioning || index === currentSlide || index < 0 || index >= totalSlides) {
      return;
    }
    
    isTransitioning = true;
    currentSlide = index;
    
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  };

  const nextSlide = (): void => {
    const nextIndex = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
    goToSlide(nextIndex);
  };

  const prevSlide = (): void => {
    const prevIndex = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    goToSlide(prevIndex);
  };

  const startAutoPlay = (): void => {
    if (!autoPlay || !canNavigate) return;
    
    stopAutoPlay();
    autoPlayTimer = setInterval(nextSlide, interval);
  };

  const stopAutoPlay = (): void => {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  };

  const handleMouseEnter = (): void => {
    if (pauseOnHover) stopAutoPlay();
  };

  const handleMouseLeave = (): void => {
    if (pauseOnHover) startAutoPlay();
  };

  const handleKeydown = (event: KeyboardEvent): void => {
    if (!canNavigate) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        prevSlide();
        break;
      case 'ArrowRight':
        event.preventDefault();
        nextSlide();
        break;
      case 'Home':
        event.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        event.preventDefault();
        goToSlide(totalSlides - 1);
        break;
    }
  };

  const handleTouchStart = (event: TouchEvent): void => {
    touchStartX = event.changedTouches[0].screenX;
  };

  const handleTouchEnd = (event: TouchEvent): void => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipeGesture();
  };

  const handleSwipeGesture = (): void => {
    const swipeThreshold = 50;
    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) < swipeThreshold) return;

    if (swipeDistance > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  onMount(() => {
    if (sliderContainer) {
      sliderContainer.focus();
    }
    startAutoPlay();
  });

  onDestroy(() => {
    stopAutoPlay();
  });

  $: if (autoPlay && canNavigate) {
    startAutoPlay();
  } else {
    stopAutoPlay();
  }
</script>

<div
  class="relative w-full overflow-hidden rounded-lg shadow-xl bg-gray-100 group"
  class:cursor-grab={canNavigate}
  style="height: {height}"
  bind:this={sliderContainer}
  tabindex="0"
  role="region"
  aria-label="Image slider"
  aria-live="polite"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:keydown={handleKeydown}
  on:touchstart={handleTouchStart}
  on:touchend={handleTouchEnd}
>
  {#if totalSlides === 0}
    <div class="flex items-center justify-center h-full">
      <div class="text-center text-gray-500">
        <svg 
          class="w-16 h-16 mx-auto mb-4 opacity-50" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fill-rule="evenodd" 
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
            clip-rule="evenodd" 
          />
        </svg>
        <p class="text-lg font-medium">No images available</p>
        <p class="text-sm">Add images to display the slider</p>
      </div>
    </div>
  {:else}
    <!-- Main slider container -->
    <div 
      class="flex h-full transition-transform duration-500 ease-in-out"
      class:transition-none={isTransitioning}
      style="transform: translateX(-{currentSlide * 100}%)"
    >
      {#each images as image, index}
        <div 
          class="flex-shrink-0 w-full h-full relative"
          role="img"
          aria-label="Slide {index + 1} of {totalSlides}"
        >
          <img
            src={image}
            alt="Slide {index + 1}"
            class="w-full h-full object-cover"
            class:opacity-75={index !== currentSlide}
            loading={index === 0 ? 'eager' : 'lazy'}
            draggable="false"
          />
          
          <!-- Slide overlay for better text readability if needed -->
          <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      {/each}
    </div>

    {#if canNavigate && showArrows}
      <!-- Navigation arrows -->
      <button
        type="button"
        class="absolute left-4 top-1/2 -translate-y-1/2 z-20 
               bg-black/40 hover:bg-black/60 text-white 
               w-12 h-12 rounded-full flex items-center justify-center
               opacity-0 group-hover:opacity-100 transition-all duration-300
               focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50
               disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous slide"
        disabled={isTransitioning}
        on:click={prevSlide}
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        class="absolute right-4 top-1/2 -translate-y-1/2 z-20 
               bg-black/40 hover:bg-black/60 text-white 
               w-12 h-12 rounded-full flex items-center justify-center
               opacity-0 group-hover:opacity-100 transition-all duration-300
               focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50
               disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next slide"
        disabled={isTransitioning}
        on:click={nextSlide}
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    {/if}

    {#if canNavigate && showDots}
      <!-- Slide indicators -->
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div class="flex space-x-3 bg-black/30 rounded-full px-4 py-2">
          {#each images as _, index}
            <button
              type="button"
              class="w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 {index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}"
              aria-label="Go to slide {index + 1}"
              aria-pressed={index === currentSlide}
              disabled={isTransitioning}
              on:click={() => goToSlide(index)}
            />
          {/each}
        </div>
      </div>
    {/if}

    {#if canNavigate}
      <!-- Slide counter -->
      <div class="absolute top-4 right-4 z-20 bg-black/40 text-white px-3 py-1 rounded-full text-sm font-medium">
        {currentSlide + 1} / {totalSlides}
      </div>
    {/if}

    {#if autoPlay && canNavigate}
      <!-- Auto-play indicator -->
      <div class="absolute top-4 left-4 z-20">
        <div 
          class="w-8 h-8 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          title={autoPlayTimer ? 'Auto-play active' : 'Auto-play paused'}
        >
          {#if autoPlayTimer}
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
            </svg>
          {:else}
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          {/if}
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  @media (prefers-reduced-motion: reduce) {
    .transition-transform,
    .transition-all,
    .transition-opacity {
      transition: none;
    }
  }
</style>