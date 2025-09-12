<script lang="ts">
  import { _ } from 'svelte-i18n';

  export let message: string;
  export let onRetry: (() => void) | undefined = undefined;
</script>

<div class="flex items-center justify-center py-12">
  <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800">
          {$_('common.error')}
        </h3>
        <div class="mt-2 text-sm text-red-700">
          <p>{message}</p>
        </div>
        {#if onRetry}
          <div class="mt-4">
            <button
              on:click={onRetry}
              class="bg-red-100 px-3 py-2 rounded text-sm text-red-800 hover:bg-red-200 transition"
            >
              {$_('common.retry')}
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>