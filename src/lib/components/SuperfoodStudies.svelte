<script lang="ts">
  interface Study {
    title: string;
    description: string;
    icon: string;
  }

  const studies: Study[] = [
    {
      title: 'Aguaje Study',
      description:
        'Moriche Palm (Aguaje) Extract improves indefinite complaints in Japanese females: a randomized, placebo-controlled trial.',
      icon: '/study-icon.avif'
    },
    {
      title: 'Maca Study',
      description:
        'Acceptability, Safety, and Efficacy of Oral Administration of Extracts of Black or Red Maca (Lepidium meyenii) in Adult Human Subjects.',
      icon: '/study-icon.avif'
    }
  ];
</script>

<section class="relative bg-white py-16">
  <!-- Background Image -->
  <div class="absolute inset-0 z-0">
    <img src="/powder-foods.avif" alt="Superfoods background" class="w-full h-full object-cover opacity-20" />
  </div>

  <div class="relative z-10 max-w-6xl mx-auto px-4 space-y-12">
    <h2 class="text-3xl sm:text-4xl font-bold text-center">
      <span class="bg-green-600 text-white px-4 py-1 rounded">Superfood Studies</span>
    </h2>

    <p class="text-center text-yellow-600 font-semibold text-lg">
      Explore the latest scientific studies on our superfoods by clicking the icons below.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      {#each studies as study}
        <div class="text-center space-y-4 bg-white shadow-lg rounded-lg p-6">
          <h3 class="text-xl font-semibold text-yellow-800">{study.title}</h3>
          <img src={study.icon} alt="{study.title} icon" class="mx-auto w-12 h-12" />
          <p class="text-gray-700 text-sm">{study.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
