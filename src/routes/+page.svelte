<script lang="ts">
  import Slider from '$lib/components/Slider.svelte';

  const images: string[] = [
    '/slider1.avif',
    '/slider3.avif',
    '/slider 3.2.avif',
    '/slider4.avif'
  ];

</script>

<section class="pt-0">
  <Slider {images} autoPlay interval={4000} />
</section>

<div class="space-y-16">
  <!-- Hero Section -->
  <section class="flex flex-wrap justify-center items-center gap-6">
    <img src="/andinos.avif" alt="Muna" class="w-[350px] h-[280px]" />
  </section>

  <!-- PURE INKA FOODS Section -->
  <section class="max-w-4xl mx-auto text-center space-y-4">
    <h2 class="text-2xl font-bold text-yellow-700">PURE INKA FOODS</h2>
    <p class="text-gray-700">
      Nature, health and well-being Inspired by the richness of the Peruvian Andes and Amazon with its variety of grains,
      seeds, plants and fruits that since ancient times have provided health and well-being to all of its inhabitants. At
      Pure Inka Foods, we strive to be a reliable source for the selection and production of natural ingredients in order to
      achieve – together with our clients – high quality foods and supplements for exporting, trading, and wholesale.
      We specialize in the production of fruit powders, vegetable powders, dried fruits & nuts, natural supplements, ancient
      grain superfoods, herbal powders, coffee and teas, spices, gluten free powders, root vegetables, chocolate and cacao.
    </p>
    <button class="inline-block bg-yellow-600 text-white px-4 py-2 rounded font-semibold hover:bg-yellow-700">Read More</button>
  </section>

  <!-- Premium Superfoods Section -->
  <section class="bg-green-600 text-white py-10 px-6">
    <div class="max-w-5xl mx-auto space-y-6">
      <h2 class="text-2xl font-bold">PREMIUM SUPERFOODS SUPPLIER</h2>
      <p>
        At Pure Inka Foods, we process superfood powders on a made-to-order basis, which means you are getting the freshest product
        to your end consumers. From harvest to factory, we make sure that you are receiving high-quality premium superfoods
        that your customers will appreciate. While we practice fair trade, we only source from independent farmers and communities
        that use organic and environmentally-sustainable practices.
      </p>
      <p>
        Being a top wholesale supplier in Peru, we manufacture and supply the following superfoods: fruit powders, vegetable powders,
        herbal powders, natural supplements, vegan protein powders, gluten free flours, smoothie mixes, spices, ancient grains,
        natural sweeteners, herbal teas, cacao, Amazonian chocolate, and Amazonian coffee.
      </p>
      <div class="images">
        <img src="/grid1.avif" alt="grid 4" class="w-[350px] align-middle aspect-video object-cover rounded-md" />
      </div>
    </div>
  </section>
</div>
