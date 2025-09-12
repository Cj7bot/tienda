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
  let autoPlayTimer: number | null = null;
  let sliderContainer: HTMLElement;
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

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<section
  class="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-gray-50 to-gray-100 group"
  class:cursor-grab={canNavigate}
  style="height: {height}"
  bind:this={sliderContainer}
  tabindex="0"
  aria-label="Image slider with {totalSlides} slides - use arrow keys to navigate"
  aria-live="polite"
  aria-roledescription="carousel"
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
          
          <!-- Enhanced slide overlay with gradient -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <!-- Progress bar for current slide -->
          {#if index === currentSlide && autoPlay && autoPlayTimer}
            <div class="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-80 animate-progress" style="animation-duration: {interval}ms;"></div>
          {/if}
        </div>
      {/each}
    </div>

    {#if canNavigate && showArrows}
      <!-- Navigation arrows with enhanced design -->
      <button
        type="button"
        class="absolute left-6 top-1/2 -translate-y-1/2 z-30 
               bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl
               text-gray-700 hover:text-emerald-600
               w-14 h-14 rounded-full flex items-center justify-center
               opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out
               focus:opacity-100 focus:outline-none focus:ring-4 focus:ring-emerald-200
               disabled:opacity-30 disabled:cursor-not-allowed transform hover:scale-110"
        aria-label="Previous slide"
        disabled={isTransitioning}
        on:click={prevSlide}
      >
        <svg class="w-7 h-7 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        class="absolute right-6 top-1/2 -translate-y-1/2 z-30 
               bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl
               text-gray-700 hover:text-emerald-600
               w-14 h-14 rounded-full flex items-center justify-center
               opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out
               focus:opacity-100 focus:outline-none focus:ring-4 focus:ring-emerald-200
               disabled:opacity-30 disabled:cursor-not-allowed transform hover:scale-110"
        aria-label="Next slide"
        disabled={isTransitioning}
        on:click={nextSlide}
      >
        <svg class="w-7 h-7 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    {/if}

    {#if canNavigate && showDots}
      <!-- Enhanced slide indicators -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <div class="flex space-x-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-3 border border-white/20">
          {#each images as _, index}
            <button
              type="button"
              class="relative transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 rounded-full {index === currentSlide ? 'w-8 h-3' : 'w-3 h-3'}"
              aria-label="Go to slide {index + 1}"
              aria-pressed={index === currentSlide}
              disabled={isTransitioning}
              on:click={() => goToSlide(index)}
            >
              <div class="w-full h-full rounded-full transition-all duration-300 {index === currentSlide ? 'bg-white shadow-md' : 'bg-white/60 hover:bg-white/80'}"></div>
              {#if index === currentSlide}
                <div class="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-20"></div>
              {/if}
            </button>
          {/each}
        </div>
      </div>
    {/if}

    {#if canNavigate}
      <!-- Enhanced slide counter -->
      <div class="absolute top-6 right-6 z-30 bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-semibold shadow-lg border border-white/20">
        <span class="text-emerald-600">{currentSlide + 1}</span>
        <span class="text-gray-400 mx-1">/</span>
        <span>{totalSlides}</span>
      </div>
    {/if}

    {#if autoPlay && canNavigate}
      <!-- Enhanced auto-play indicator -->
      <div class="absolute top-6 left-6 z-30">
        <div 
          class="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          title={autoPlayTimer ? 'Auto-play active - hover to pause' : 'Auto-play paused'}
        >
          {#if autoPlayTimer}
            <svg class="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
            </svg>
          {:else}
            <svg class="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          {/if}
        </div>
      </div>
    {/if}
  {/if}
</section>

<style>
  @keyframes progress {
    from { width: 0%; }
    to { width: 100%; }
  }
  
  .animate-progress {
    animation: progress linear forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    .transition-transform,
    .transition-all,
    .transition-opacity,
    .animate-progress {
      transition: none;
      animation: none;
    }
  }

  /* Custom scrollbar for mobile devices */
  @media (max-width: 768px) {
    .group::-webkit-scrollbar {
      display: none;
    }
  }

  /* Enhanced focus styles */
  button:focus-visible {
    outline: 2px solid #10b981;
    outline-offset: 2px;
  }

  /* Smooth transitions for all interactive elements */
  button,
  .group {
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }
</style>