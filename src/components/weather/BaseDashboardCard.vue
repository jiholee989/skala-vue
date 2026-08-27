<template>
  <section class="dashboard-card">
    <header v-if="$slots.title" class="dashboard-card__title">
      <slot name="title" />
    </header>

    <slot />
  </section>
</template>

<style scoped>
.dashboard-card {
  margin-bottom: 16px;
  padding: 20px 32px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface);
}

.dashboard-card__title {
  margin-bottom: 12px;
}

@media (max-width: 560px) {
  .dashboard-card {
    padding: 20px;
  }
}
</style>
