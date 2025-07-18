<script lang="ts">
  let form = {
    firstName: '',
    lastName: '',
    phonePrefix: '+51',
    phone: '',
    email: '',
    order: '',
    inquiry: '',
    message: ''
  };
</script>

<section class="relative bg-cover bg-center py-20 px-4" style="background-image: url('/herbales.png');">
  <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
  <div class="relative z-10 max-w-4xl mx-auto text-white space-y-10">
    <h2 class="text-4xl font-bold text-center">Contact Us</h2>

    <p class="text-center max-w-2xl mx-auto text-lg">
      Book an <a href="#" class="text-yellow-400 underline font-medium">online meeting</a> to discuss how we can meet your market needs.
      For urgent matters, contact <span class="font-semibold">+51 999 888 777</span> (via WhatsApp) or <a href="mailto:sales@pureinkafoods.com" class="underline">sales@pureinkafoods.com</a>.
    </p>

    <form class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white text-black p-8 rounded-xl shadow-xl">
      <input type="text" placeholder="First Name" bind:value={form.firstName} class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
      <input type="text" placeholder="Last Name" bind:value={form.lastName} class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" />

      <div class="flex gap-2">
        <select bind:value={form.phonePrefix} class="w-30 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500">
          <option value="+51">PE +51</option>
          <option value="+1">US +1</option>
          <option value="+34">ES +34</option>
        </select>
        <input type="tel" placeholder="Phone" bind:value={form.phone} class="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
      </div>

      <input type="email" placeholder="Email" bind:value={form.email} class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
      <input type="text" placeholder="Order Number / Product" bind:value={form.order} class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" />

      <select bind:value={form.inquiry} class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500">
        <option disabled selected>Type of inquiry</option>
        <option>Pricing</option>
        <option>Availability</option>
        <option>Packaging</option>
        <option>Custom Order</option>
      </select>

      <textarea bind:value={form.message} rows="4" placeholder="Type your message here..." class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 md:col-span-2"></textarea>

      <div class="md:col-span-2 flex flex-col items-center gap-4">
        <div class="w-full max-w-sm">
          <!-- Placeholder for reCAPTCHA -->
          <div class="bg-gray-100 border rounded px-4 py-2 text-center text-sm text-gray-600">[ reCAPTCHA]</div>
        </div>
        <button type="submit" class="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-2 rounded shadow">Submit</button>
      </div>
    </form>
  </div>
</section>