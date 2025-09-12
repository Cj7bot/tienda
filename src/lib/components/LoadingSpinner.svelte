<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<div class="flex items-center justify-center py-12">
  <div class="flex flex-col items-center space-y-4">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    <p class="text-gray-600 text-sm">{$_('common.loading')}</p>
  </div>
</div>