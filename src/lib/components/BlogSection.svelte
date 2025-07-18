<script lang="ts">
  const featuredPost = {
    title: 'Discover the Benefits of Superfoods',
    summary:
      "Discover how superfoods can enhance your health and well-being. From boosting immunity to improving digestion, these nutrient-rich foods are a game-changer for your diet.",
    link: '#'
  };

  const blogPosts = [
    {
      category: 'World',
      title: 'Featured post',
      date: 'May 12',
      link: '#'
    },
    {
      category: 'Design',
      title: 'The Science of Superfoods',
      date: 'May 11',
      link: '#'
    },
    {
      category: 'Health',
      title: 'Superfood benefits',
      date: 'May 10',
      link: '#'
    }
  ];
</script>

<section class="bg-gradient-to-br from-green-600 via-lime-700 to-green-600 py-20 px-4">
  <div class="max-w-6xl mx-auto space-y-12 text-white">
    <div class="text-center">
      <h2 class="text-4xl font-bold mb-2">Peruvian Exports</h2>
      <p class="text-4xl font-extrabold">Blog & News</p>
    </div>

    <!-- Featured post -->
    <div class="bg-white/10 backdrop-blur rounded-lg p-8">
      <h3 class="text-3xl font-serif italic mb-4">{featuredPost.title}</h3>
      <p class="mb-4">{featuredPost.summary}</p>
      <a href={featuredPost.link} class="underline font-semibold">Continue reading...</a>
    </div>

    <!-- Blog Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each blogPosts as post}
        <div class="bg-white/10 backdrop-blur rounded-lg p-6 space-y-2">
          <span class="text-sm uppercase tracking-wide text-green-100">{post.category}</span>
          <h4 class="text-lg font-bold">{post.title}</h4>
          <p class="text-sm text-green-200">{post.date}</p>
          <a href={post.link} class="text-sm underline">Read more</a>
        </div>
      {/each}
    </div>
  </div>
</section>
