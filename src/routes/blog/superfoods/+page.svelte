<script lang="ts">
  const superfoods = [
    {
      name: "Quinoa",
      description: "A complete protein grain native to the Andes, quinoa contains all nine essential amino acids and is rich in fiber, iron, and magnesium.",
      benefits: ["High in protein", "Gluten-free", "Rich in minerals", "Good source of fiber"],
      image: "/images/quinoa.jpg"
    },
    {
      name: "Maca Root",
      description: "Known as 'Peruvian ginseng', maca is a powerful adaptogen that helps boost energy, balance hormones, and enhance endurance.",
      benefits: ["Boosts energy", "Hormone balance", "Enhances fertility", "Improves mood"],
      image: "/images/maca.jpg"
    },
    {
      name: "Cacao",
      description: "The raw form of chocolate, cacao is packed with antioxidants, magnesium, and compounds that promote heart health and mood enhancement.",
      benefits: ["High in antioxidants", "Heart health", "Mood enhancer", "Rich in magnesium"],
      image: "/images/cacao.jpg"
    },
    {
      name: "Lucuma",
      description: "This sweet Peruvian fruit is naturally low in sugar but high in beta-carotene, iron, zinc, and vitamin B3.",
      benefits: ["Natural sweetener", "High in beta-carotene", "Low glycemic index", "Rich in minerals"],
      image: "/images/lucuma.jpg"
    },
    {
      name: "Sacha Inchi",
      description: "Also known as the Inca peanut, sacha inchi is one of the richest plant sources of omega-3 fatty acids and complete proteins.",
      benefits: ["High in omega-3", "Complete protein", "Heart healthy", "Anti-inflammatory"],
      image: "/images/sacha-inchi.jpg"
    },
    {
      name: "Purple Corn",
      description: "Rich in anthocyanins, purple corn provides powerful antioxidant properties and supports cardiovascular health.",
      benefits: ["High in antioxidants", "Cardiovascular support", "Anti-inflammatory", "Natural colorant"],
      image: "/images/purple-corn.jpg"
    }
  ];
</script>

<svelte:head>
  <title>Discover the Benefits of Superfoods - Peruvian Exports</title>
  <meta name="description" content="Explore the incredible health benefits of Peruvian superfoods including quinoa, maca root, cacao, and more. Learn how these nutrient-rich foods can enhance your well-being." />
</svelte:head>

<main class="min-h-screen bg-gradient-to-br from-green-50 to-lime-50">
  <!-- Hero Section -->
  <section class="bg-gradient-to-br from-green-600 via-lime-700 to-green-600 text-white py-20 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-5xl font-bold mb-6">Discover the Benefits of Superfoods</h1>
      <p class="text-xl mb-8 opacity-90">
        Unlock the power of nature's most nutrient-dense foods from the heart of Peru. 
        These ancient superfoods have been nourishing communities for centuries and are now 
        available to enhance your modern lifestyle.
      </p>
      <div class="inline-block bg-white/10 backdrop-blur rounded-lg p-6 text-left">
        <h3 class="text-lg font-semibold mb-2">What you'll learn:</h3>
        <ul class="space-y-1 text-sm">
          <li>• The nutritional profiles of Peru's top superfoods</li>
          <li>• Health benefits backed by scientific research</li>
          <li>• How to incorporate these foods into your daily diet</li>
          <li>• Why Peruvian superfoods are superior in quality</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Superfoods Grid -->
  <section class="py-20 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-800 mb-4">Our Premium Superfoods</h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          Each superfood is carefully sourced from Peru's pristine environments, ensuring 
          maximum nutritional value and authentic quality for your health journey.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each superfoods as superfood}
          <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="h-48 bg-gradient-to-br from-green-400 to-lime-500 flex items-center justify-center">
              <div class="text-white text-6xl font-bold opacity-20">
                {superfood.name.charAt(0)}
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-800 mb-3">{superfood.name}</h3>
              <p class="text-gray-600 mb-4 leading-relaxed">{superfood.description}</p>
              
              <div class="space-y-3">
                <h4 class="font-semibold text-gray-800">Key Benefits:</h4>
                <ul class="space-y-1">
                  {#each superfood.benefits as benefit}
                    <li class="flex items-center text-sm text-gray-600">
                      <svg class="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                      {benefit}
                    </li>
                  {/each}
                </ul>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Why Choose Peruvian Superfoods -->
  <section class="bg-white py-20 px-4">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-4xl font-bold text-center text-gray-800 mb-12">Why Choose Peruvian Superfoods?</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-6">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Ancient Wisdom</h3>
              <p class="text-gray-600">These superfoods have been cultivated and consumed by Andean civilizations for thousands of years, proving their nutritional value and safety.</p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Unique Climate</h3>
              <p class="text-gray-600">Peru's diverse microclimates, from the Andes to the Amazon, create ideal conditions for nutrient-dense superfood production.</p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Quality Assurance</h3>
              <p class="text-gray-600">Our rigorous quality control ensures every superfood meets international standards for purity and nutritional content.</p>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Sustainable Farming</h3>
              <p class="text-gray-600">We work with local farmers who use traditional, sustainable farming methods that protect the environment and preserve biodiversity.</p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Maximum Potency</h3>
              <p class="text-gray-600">Our processing methods preserve the maximum nutritional value, ensuring you get the full benefits of each superfood.</p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Fair Trade</h3>
              <p class="text-gray-600">Our partnerships with local communities ensure fair compensation and support the economic development of rural Peru.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Call to Action -->
  <section class="bg-gradient-to-br from-green-600 via-lime-700 to-green-600 text-white py-16 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-4">Ready to Transform Your Health?</h2>
      <p class="text-xl mb-8 opacity-90">
        Start your superfood journey today and experience the incredible benefits of Peru's finest natural treasures.
      </p>
      <div class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
        <a href="/productos" class="inline-block bg-white text-green-700 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300">
          Shop Superfoods
        </a>
        <a href="/contact" class="inline-block border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-green-700 transition-colors duration-300">
          Contact Us
        </a>
      </div>
    </div>
  </section>
</main>