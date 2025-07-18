<script lang="ts">
  interface DistributorType {
    name: string;
    profit: string;
    image: string;
    investment: string;
    badge: string;
    action: { label: string; href: string };
    benefits: string[];
    description: string;
  }

  export let distributorTypes: DistributorType[] = [];
</script>

<section id="opportunities" class="max-w-7xl mx-auto px-4 py-16">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    {#each distributorTypes as type}
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden group transition hover:scale-105 hover:shadow-2xl duration-300 flex flex-col">
        <div class="h-56 overflow-hidden relative">
          <img
            src={type.image}
            alt={type.name}
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <span class="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
            {type.badge}
          </span>
        </div>

        <div class="p-6 flex flex-col gap-3 flex-1">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-800 uppercase tracking-wider">
              {type.name}
            </h2>
            <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
              {type.profit}
            </span>
          </div>

          <p class="text-gray-600 text-sm">{type.description}</p>

          <ul class="mt-3 space-y-1">
            {#each type.benefits as benefit}
              <li class="flex items-start gap-2 text-green-700">
                <svg
                  class="w-5 h-5 mt-1 text-green-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span class="text-sm">{benefit}</span>
              </li>
            {/each}
          </ul>

          <div class="flex items-center justify-between mt-4">
            <div>
              <span class="font-bold text-lg text-green-700">
                {type.investment}
              </span>
              <span class="ml-1 text-xs text-gray-400">investment</span>
            </div>
            <a
              href={type.action.href}
              class="px-4 py-2 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600 transition"
            >
              {type.action.label}
            </a>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
