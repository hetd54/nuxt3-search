<script lang="ts" setup>

const search = ref('')
const results = ref([])
const resultsVisible = ref(false)


const performSearch = async () => {
  const res = await searchContent(search.value)
  results.value = res.value // res is a computed so we pluck out the .value and just add it to our ref
  openResults()
}

const closeResults = () => {
  search.value = '';
  resultsVisible.value = false;
}
const openResults = () => {
  resultsVisible.value = true
}
</script>

<template>
  <div class="search">
    <div class="control has-icons-right">
      <input
          id="search"
          v-model="search"
          type="text"
          class="input"
          placeholder="Search..."
          aria-label="Search"
          aria-haspopup="true"
          :aria-expanded="resultsVisible"
          autocomplete="off"
          spellcheck="false"
          @keyup.esc="closeResults"
          @input="performSearch"
      />
      <span class="icon is-small is-right is-clickable" @click="closeResults">
          <i class="mdi mdi-close" />
        </span>
    </div>

    <div
        v-show="resultsVisible"
        class="results dropdown-content mt-2 p-2 has-text-left"
        tabIndex="-1"
        role="menu"
        aria-labelledby="search"
    >
      <p v-if="results.length === 0">No Results</p>
      <main v-for="(result, index) in results">
        <hr
            :key="`search-divider-${result.id}`"
            class="dropdown-divider"
        />
        <nuxt-link
            v-if="result.id.startsWith('/')"
            :key="`search-result-${result.id}`"
            :to="`/${(result.id)}`"
            role="menuitem"
            class="result dropdown-item is-size-6 pr-3"
            :tab-index="100 + index"
            @click.native="closeResults"
            @keyup.native.esc="closeResults"
        >
          {{ result.title }}
        </nuxt-link>
      </main>
    </div>
  </div>

</template>
