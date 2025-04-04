<template>
  <div ref="container" class="dl-container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { type DraggableItem, useDraggableList} from '@drag-list/core';

interface Props {
  longPressDuration?: number;
  enableTouch?: boolean;
  enableMouse?: boolean;
  draggingClass?: string;
}

export default defineComponent<Props>({
  name: 'DraggableList',
  props: {
    longPressDuration: {
      type: Number,
      default: 100
    },
    enableTouch: {
      type: Boolean,
      default: true
    },
    enableMouse: {
      type: Boolean,
      default: true
    },
    draggingClass: {
      type: String,
      default: 'dl-dragging'
    }
  },
  emits: ['dragStart', 'dragMove', 'dragEnd'],
  setup(props, { emit }) {
    const container = ref<HTMLElement | null>(null);

    const { append, destroy } = useDraggableList({
      container: container.value!,
      longPressDuration: props.longPressDuration,
      enableTouch: props.enableTouch,
      enableMouse: props.enableMouse,
      draggingClass: props.draggingClass,
      onDragStart: (item: DraggableItem) => {
        emit('dragStart', item);
      },
      onDragMove: (item: DraggableItem, currentIndex: number) => {
        emit('dragMove', item, currentIndex);
      },
      onDragEnd: (startIndex: number, endIndex: number) => {
        emit('dragEnd', startIndex, endIndex);
      }
    });

    onMounted(() => {
      append({ container: container.value});
    });

    onUnmounted(() => {
      destroy();
    });

    return {
      container
    };
  }
});
</script>

