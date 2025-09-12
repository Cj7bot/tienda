<script lang="ts">
  import { onMount } from 'svelte';
  
  const benefits = [
    "Made to order, using fresh product from the most recent harvest.",
    "Properly stored to ensure raw product is preserved.",
    "Product is washed, peeled, and handled using sanitary practice.",
    "Low and slow dehydration using temperature gauge to preserve nutrients and medicinal benefits."
  ];

  const issues = [
    "Often times found using old stock that has lost its freshness or aroma.",
    "Improperly stored resulting in mold or oxidation.",
    "Handled without proper hygiene, product unwashed and not properly prepared.",
    "Heated quickly using high temperature, resulting in degraded product, or uneven dehydration."
  ];

  const features = [
    {
      title: "PURE INKA FOODS",
      description: "Nature, health and well-being inspired by the richness of the Peruvian Andes and Amazon with its variety of grains, plants and fruits that since ancient times have provided health and well-being to all inhabitants.",
      image: "/linazas.avif",
      alt: "Pure Inka Foods products"
    },
    {
      title: "OUR MISSION",
      description: "To give people a better quality of life, by nourishing them with clean and pure food grown in the rich soil of the Andes and Amazon, free of chemicals, pesticides, and genetically modified seeds, while allowing local farmers and communities to thrive.",
      image: "/Natural.avif",
      alt: "Our mission - natural products",
      background: "bg-emerald-50"
    },
    {
      title: "OBJECTIVE",
      description: "Guarantee the supply of natural products, such as herbs, plants, seeds, grains, and powders with high standards, resulting in purity and quality. From selection to storage and delivery, we strive to ensure high quality fresh products with great service.",
      image: "/objectives.avif",
      alt: "Our objectives and quality standards"
    }
  ];

  let isVisible = false;
  let currentImageIndex = 0;

  onMount(() => {
    isVisible = true;
  });
</script>

<section class="relative overflow-hidden" aria-labelledby="about-heading">
  <!-- Hero Section with Parallax Effect -->
  <div class="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-emerald-900/40 to-amber-900/40 z-10"></div>
    <img 
      src="/imagen2.avif" 
      class="absolute inset-0 w-full h-full object-cover transform scale-105 transition-transform duration-700 hover:scale-110" 
      alt="About Pure Inka Foods - Natural products from Peru"
      loading="eager"
    />
    <div class="absolute inset-0 flex items-center justify-center z-20">
      <div class="text-center space-y-4 px-6" class:animate-fade-in={isVisible}>
        <h1 id="about-heading" class="text-4xl md:text-6xl font-bold text-white tracking-tight drop-shadow-2xl">
          About Us
        </h1>
        <p class="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          Discover the purity of the Andes and Amazon
        </p>
      </div>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-32">
    
    {#each features as feature, index}
      <article 
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center {feature.background || ''} {feature.background ? 'p-8 lg:p-12 rounded-3xl' : ''}"
        class:lg:grid-flow-col-dense={index % 2 === 1}
      >
        <div class="space-y-6 {index % 2 === 1 ? 'lg:col-start-2' : ''}">
          <h2 class="text-3xl md:text-4xl font-bold {feature.background ? 'text-emerald-800' : 'text-amber-700'} tracking-tight">
            {feature.title}
          </h2>
          <div class="w-16 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full"></div>
          <p class="text-lg leading-relaxed {feature.background ? 'text-emerald-700' : 'text-gray-700'} font-light">
            {feature.description}
          </p>
          
          {#if feature.title === "PURE INKA FOODS"}
            <div class="flex flex-wrap gap-3 pt-4">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                🌿 Natural
              </span>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                🏔️ Andean
              </span>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                ✨ Pure
              </span>
            </div>
          {/if}
        </div>
        
        <div class="relative group {index % 2 === 1 ? 'lg:col-start-1' : ''}">
          <div class="absolute -inset-4 bg-gradient-to-r from-emerald-300 to-amber-300 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <img 
            src={feature.image}
            alt={feature.alt}
            class="relative rounded-2xl shadow-2xl w-full aspect-square object-cover transform transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </article>
    {/each}

    <!-- Quality Standards Section -->
    <section class="relative bg-gradient-to-br from-emerald-50 to-amber-50 rounded-3xl p-8 lg:p-16 overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-200/20 rounded-full -translate-y-32 translate-x-32"></div>
      <div class="absolute bottom-0 left-0 w-48 h-48 bg-amber-200/20 rounded-full translate-y-24 -translate-x-24"></div>
      
      <div class="relative z-10 text-center space-y-8">
        <h2 class="text-3xl md:text-4xl font-bold text-emerald-800">Our Quality Promise</h2>
        <div class="w-20 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full mx-auto"></div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-8">
          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-emerald-700 flex items-center justify-center md:justify-start gap-2">
              <span class="text-2xl">✅</span>
              What We Guarantee
            </h3>
            <ul class="space-y-3">
              {#each benefits as benefit}
                <li class="flex items-start gap-3 text-emerald-700">
                  <span class="text-emerald-500 mt-1 text-sm">●</span>
                  <span class="text-sm leading-relaxed">{benefit}</span>
                </li>
              {/each}
            </ul>
          </div>
          
          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-red-700 flex items-center justify-center md:justify-start gap-2">
              <span class="text-2xl">⚠️</span>
              Common Industry Issues
            </h3>
            <ul class="space-y-3">
              {#each issues as issue}
                <li class="flex items-start gap-3 text-red-600">
                  <span class="text-red-400 mt-1 text-sm">●</span>
                  <span class="text-sm leading-relaxed">{issue}</span>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison Visual -->
    <section class="text-center space-y-8">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-800">See The Difference</h2>
      <div class="w-20 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full mx-auto"></div>
      <div class="relative group">
        <div class="absolute -inset-4 bg-gradient-to-r from-emerald-300 to-amber-300 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
        <img 
          src="/vendor.avif" 
          alt="Quality comparison between Pure Inka Foods and other vendors" 
          class="relative mx-auto rounded-2xl shadow-2xl max-w-full h-auto transform transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    </section>
  </div>
</section>

<style>
  .animate-fade-in {
    animation: fadeInUp 1s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in {
      animation: none;
    }
  }
</style>
