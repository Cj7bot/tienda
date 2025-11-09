<!-- src/lib/components/Footer.svelte -->
<script lang="ts">
  const nav = {
    "Useful Links": [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Shop", href: "/productos" },
      { label: "Contact", href: "/contact" }
    ],
    "Buyers & Sellers": [
      { label: "Distributors", href: "/distributors" },
      { label: "Wholesale", href: "/wholesale" },
      { label: "Export Inquiry", href: "/export" },
      { label: "Custom Packaging", href: "/packaging" }
    ],
    Categories: [
      { label: "Superfood Powders", href: "/powders" },
      { label: "Capsules", href: "/capsules" },
      { label: "Vegan Protein", href: "/vegan-protein" },
      { label: "Herbal Teas", href: "/teas" }
    ],
    Resources: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Store Policy", href: "/policy" }
    ]
  };

  const social = [
    { label: "Facebook", href: "#", icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
    { label: "Instagram", href: "#", icon: "M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm8 3a1 1 0 110 2 1 1 0 010-2zm-5 1a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" },
    { label: "LinkedIn", href: "#", icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 4a2 2 0 110 4 2 2 0 010-4z" }
  ];
</script>

<footer class="bg-green-800 text-gray-300">
  <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">

      <!-- Marca + Newsletter -->
      <div class="lg:col-span-2 space-y-6">
        <h2 class="text-2xl font-bold text-white">Pure Inka Foods</h2>
        <p>Making the world a better place through premium Peruvian superfoods.</p>
        <form class="flex flex-col sm:flex-row gap-2" on:submit|preventDefault>
          <input
            type="email"
            placeholder="Your email"
            class="w-full px-4 py-2 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            class="px-6 py-2 bg-green-400 hover:bg-green-600 rounded-md font-semibold text-black transition"
          >
            Subscribe
          </button>
        </form>
        <div class="flex space-x-4 pt-4">
          {#each social as s}
            <a
              aria-label={s.label}
              href={s.href}
              class="hover:text-white transition"
            >
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d={s.icon} />
              </svg>
            </a>
          {/each}
        </div>
      </div>

      <!-- Columnas de enlaces -->
      {#each Object.entries(nav) as [section, items]}
        <div>
          <h3 class="text-lg font-semibold text-white mb-4">{section}</h3>
          <ul class="space-y-2">
            {#each items as item}
              <li>
                <a
                  href={item.href}
                  class="hover:text-white transition"
                >
                  {item.label}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>

    <!-- Footer bottom -->
    <div class="mt-12 border-t border-gray-700 pt-6 text-sm flex flex-col sm:flex-row items-center justify-between">
      <p>© 2025 Pure Inka Foods. All rights reserved.</p>
      <p class="mt-2 sm:mt-0">
        Designed with ❤️ by Your Company
      </p>
    </div>
  </div>
</footer>
