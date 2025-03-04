<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  placeholder: {type: String, required: false},
  keyword: { type: String, required: false },
  name: {type: String, required: true}
})

const placeholder_txt = computed(() =>{
  return props.placeholder ? props.placeholder : ''
})

const keyword_txt = computed(() =>{
  return props.keyword ? props.keyword : ''
})

declare const window: any;
const keyboardInput = ref(null);

onMounted(() => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/src/lib/virtual-keyboard/keyboard.css'; // Adjust the path as needed
  document.head.appendChild(link);

  const script = document.createElement('script');
  script.src = '/src/lib/virtual-keyboard/keyboard.js'; // Adjust the path as needed
  script.onload = () => {
    if (window.VKI_attach) {
      window.VKI_attach(keyboardInput.value);
    } else {
      console.error('VKI_attach function is not available.');
    }
  };
  document.body.appendChild(script);
});
</script>

<template>
  <div class="search_container"><input ref="keyboardInput" type="text" :placeholder="placeholder_txt" :name="props.name" :value="keyword_txt" class="keyboardInput" /></div>
</template>

<style>
div.search_container {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  height: 2rem;
  padding-top: 4px;
  padding-bottom: 4px;
  margin-bottom: 9px;
  -webkit-border-radius: 0;
}
.search_container {
  width: 100%;
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
  display:flex; gap: 0.5rem;align-items: anchor-center;
}

.search_container .keyboardInput {
  border:none;
  height:calc(2rem - 8px);
  flex:max-content;
}
img.keyboardInputInitiator { opacity: 0.5; height: calc(2rem - 8px); max-height: calc(2rem - 8px)}
#keyboardInputMaster * {
  font-size: 0.9rem !important;
}

#keyboardInputMaster {
display: table !important;
}
</style>
