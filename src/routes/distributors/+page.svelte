<script lang="ts">
  import DistributorGrid from '$lib/components/DistributorGrid.svelte';

  const distributorTypes = [
  {
    name: 'Affiliate',
    profit: '10% Profit',
    image: '/vlogger.png',
    investment: '$0',
    badge: 'For Bloggers, Influencers, Marketers',
    action: { label: 'Sign Up', href: '#' },
    benefits: ['Earn revenue with referrals', 'No business or investment necessary', 'All orders shipped from our end', 'Earns revenue via Blogging, Shop Visits, YouTube, Instagram or other social media posts', 'Earn revenue by posting banner ads on websites or using email marketing'],
    description: 'Test'
  },
  {
    name: 'Distributor',
    profit: '20% Profit',
    image: '/food1.png',
    investment: '$500',
    badge: 'For Small Businesses',
    action: { label: 'Join Now', href: '#' },
    benefits: ['Have ready-to-sell products delivered to your city', 'Sell to retailers, shops, and stores', 'Sell products on Amazon, Faire, Etsy, etc.', 'Buy products at a discounted price and resell at your given price', 'Labelling and packaging offered.', 'High volume and high revenue profit'],
    description: 'Test'
  },
  {
    name: 'Online Seller',
    profit: '30% Profit',
    image: '/online.png',
    investment: '$2000',
    badge: 'For Online Sellers, Amazon, eBay',
    action: { label: 'Become a Partner', href: '#' },
    benefits: ['Setup your own ecommerce store', 'Grow your own online store', 'Create your own website', 'White label products ready to label', 'Advertise and promote your brand', 'Have your own branded products delivered directly to your customers', 'Start with a small inventory and only re-order stock when needed.'],
    description: 'Test'
  }
];

</script>

<!-- puedes dejar aquí tu header o llamarlo desde otro componente -->
<DistributorGrid {distributorTypes} />
