<script lang="ts">
  import { onMount } from 'svelte';
  
  interface Study {
    title: string;
    description: string;
    icon: string;
    superfood: string;
    benefits: string[];
    year: string;
    type: string;
    participants?: string;
    duration?: string;
    color: string;
    bgGradient: string;
  }

  const studies: Study[] = [
    {
      title: 'Moriche Palm (Aguaje) Extract Clinical Trial',
      superfood: 'Aguaje',
      description: 'Randomized, placebo-controlled trial demonstrating significant improvements in female health complaints through Aguaje supplementation.',
      benefits: ['Hormonal balance', 'Antioxidant properties', 'Skin health improvement', 'Nutritional density'],
      year: '2023',
      type: 'Clinical Trial',
      participants: '120 participants',
      duration: '12 weeks',
      icon: '/study-icon.avif',
      color: 'emerald',
      bgGradient: 'from-emerald-50 to-green-50'
    },
    {
      title: 'Maca Root Efficacy & Safety Assessment',
      superfood: 'Maca',
      description: 'Comprehensive study on the acceptability, safety, and efficacy of black and red Maca extracts in adult subjects.',
      benefits: ['Energy enhancement', 'Hormonal support', 'Cognitive function', 'Physical endurance'],
      year: '2023',
      type: 'Safety & Efficacy Study',
      participants: '200+ participants',
      duration: '16 weeks',
      icon: '/study-icon.avif',
      color: 'amber',
      bgGradient: 'from-amber-50 to-yellow-50'
    }
  ];

  let isVisible = false;
  let selectedStudy: Study | null = null;

  onMount(() => {
    isVisible = true;
  });

  function openStudyModal(study: Study) {
    selectedStudy = study;
  }

  function closeStudyModal() {
    selectedStudy = null;
  }
</script>

<section class="relative bg-gradient-to-br from-slate-50 to-emerald-50 py-20 overflow-hidden" aria-labelledby="studies-heading">
  <!-- Decorative Background Elements -->
  <div class="absolute inset-0 z-0">
    <div class="absolute top-20 left-10 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl"></div>
    <img src="/powder-foods.avif" alt="" class="absolute inset-0 w-full h-full object-cover opacity-5" loading="lazy" />
  </div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <div class="text-center space-y-6 mb-16" class:animate-fade-in={isVisible}>
      <div class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-amber-100 rounded-full text-emerald-800 font-medium text-sm">
        <span class="text-lg">🔬</span>
        Scientific Research
      </div>
      
      <h1 id="studies-heading" class="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent leading-tight">
        Superfood Studies
      </h1>
      
      <div class="w-24 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full mx-auto"></div>
      
      <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Discover the scientific evidence behind our superfoods through peer-reviewed research and clinical trials
      </p>
    </div>

    <!-- Studies Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
      {#each studies as study, index}
        <article 
          class="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
          class:animate-slide-in-left={isVisible && index % 2 === 0}
          class:animate-slide-in-right={isVisible && index % 2 === 1}
        >
          <!-- Gradient Background -->
          <div class="absolute inset-0 bg-gradient-to-br {study.bgGradient} opacity-50"></div>
          
          <!-- Content -->
          <div class="relative z-10 p-8 lg:p-10">
            <!-- Study Type & Year Badge -->
            <div class="flex items-center justify-between mb-6">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-{study.color}-100 text-{study.color}-800">
                {study.type}
              </span>
              <span class="text-{study.color}-600 font-bold text-lg">{study.year}</span>
            </div>

            <!-- Superfood Name -->
            <div class="mb-4">
              <h2 class="text-3xl font-bold text-{study.color}-800 mb-2">{study.superfood}</h2>
              <div class="w-16 h-1 bg-{study.color}-400 rounded-full"></div>
            </div>

            <!-- Study Title -->
            <h3 class="text-xl font-semibold text-gray-800 mb-4 leading-tight group-hover:text-{study.color}-700 transition-colors">
              {study.title}
            </h3>

            <!-- Description -->
            <p class="text-gray-600 mb-6 leading-relaxed">
              {study.description}
            </p>

            <!-- Study Details -->
            <div class="grid grid-cols-2 gap-4 mb-6 p-4 bg-white/60 rounded-2xl">
              <div class="text-center">
                <div class="text-2xl font-bold text-{study.color}-600">{study.participants || 'N/A'}</div>
                <div class="text-sm text-gray-500">Participants</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-{study.color}-600">{study.duration || 'N/A'}</div>
                <div class="text-sm text-gray-500">Duration</div>
              </div>
            </div>

            <!-- Benefits -->
            <div class="mb-8">
              <h4 class="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Key Benefits</h4>
              <div class="flex flex-wrap gap-2">
                {#each study.benefits as benefit}
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-{study.color}-50 text-{study.color}-700 border border-{study.color}-200">
                    {benefit}
                  </span>
                {/each}
              </div>
            </div>

            <!-- CTA Button -->
            <button 
              on:click={() => openStudyModal(study)}
              class="w-full bg-gradient-to-r from-{study.color}-500 to-{study.color}-600 hover:from-{study.color}-600 hover:to-{study.color}-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-{study.color}-200"
              aria-label="Read full study details for {study.superfood}"
            >
              <span class="flex items-center justify-center gap-2">
                <span>Read Full Study</span>
                <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            </button>
          </div>

          <!-- Study Icon -->
          <div class="absolute top-6 right-6 w-16 h-16 bg-white/90 rounded-2xl flex items-center justify-center shadow-lg">
            <img src={study.icon} alt="" class="w-10 h-10" loading="lazy" />
          </div>
        </article>
      {/each}
    </div>

    <!-- Call to Action Section -->
    <div class="text-center bg-gradient-to-r from-emerald-600 to-amber-600 rounded-3xl p-8 lg:p-12 text-white">
      <h2 class="text-2xl md:text-3xl font-bold mb-4">Want to Learn More?</h2>
      <p class="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
        Access our complete research database and discover the science behind every superfood we offer.
      </p>
      <button class="bg-white text-emerald-600 font-semibold py-3 px-8 rounded-2xl hover:bg-gray-50 transition-colors transform hover:scale-105">
        Browse All Studies
      </button>
    </div>
  </div>
</section>

<!-- Study Modal -->
{#if selectedStudy}
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    on:click={closeStudyModal}
    on:keydown={(e) => e.key === 'Escape' && closeStudyModal()}
    role="button"
    tabindex="0"
    aria-label="Close modal by clicking backdrop"
  >
    <div 
      class="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform animate-modal-in"
      on:click|stopPropagation
      on:keydown={(e) => e.key === 'Enter' && e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabindex="-1"
    >
      <!-- Close Button -->
      <button 
        on:click={closeStudyModal}
        class="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
        aria-label="Close modal"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <!-- Modal Content -->
      <div class="p-8">
        <div class="text-center mb-8">
          <h2 id="modal-title" class="text-3xl font-bold text-{selectedStudy.color}-800 mb-2">
            {selectedStudy.superfood} Research
          </h2>
          <div class="w-16 h-1 bg-{selectedStudy.color}-400 rounded-full mx-auto"></div>
        </div>

        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">{selectedStudy.title}</h3>
            <p class="text-gray-600 leading-relaxed">{selectedStudy.description}</p>
          </div>

          <div class="grid grid-cols-2 gap-4 p-6 bg-gradient-to-br {selectedStudy.bgGradient} rounded-2xl">
            <div class="text-center">
              <div class="text-2xl font-bold text-{selectedStudy.color}-600">{selectedStudy.participants}</div>
              <div class="text-sm text-gray-600">Participants</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-{selectedStudy.color}-600">{selectedStudy.duration}</div>
              <div class="text-sm text-gray-600">Study Duration</div>
            </div>
          </div>

          <div>
            <h4 class="text-lg font-semibold text-gray-800 mb-4">Key Benefits Identified</h4>
            <div class="grid grid-cols-2 gap-2">
              {#each selectedStudy.benefits as benefit}
                <div class="flex items-center gap-2 p-3 bg-{selectedStudy.color}-50 rounded-xl">
                  <span class="text-{selectedStudy.color}-500">✓</span>
                  <span class="text-{selectedStudy.color}-700 font-medium text-sm">{benefit}</span>
                </div>
              {/each}
            </div>
          </div>

          <div class="pt-4 border-t">
            <p class="text-sm text-gray-500 italic">
              This study represents peer-reviewed scientific research. Individual results may vary. 
              Consult with healthcare professionals before making dietary changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .animate-fade-in {
    animation: fadeIn 1s ease-out forwards;
  }
  
  .animate-slide-in-left {
    animation: slideInLeft 0.8s ease-out forwards;
  }
  
  .animate-slide-in-right {
    animation: slideInRight 0.8s ease-out forwards;
  }
  
  .animate-modal-in {
    animation: modalIn 0.3s ease-out forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in,
    .animate-slide-in-left,
    .animate-slide-in-right,
    .animate-modal-in {
      animation: none;
    }
  }
</style>
