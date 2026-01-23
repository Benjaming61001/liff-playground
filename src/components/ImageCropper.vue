<template>
  <div
    :class="{
      'absolute opacity-0 -z-10': hidden,
      'hidden': done
    }">
    <Cropper
      ref="CropperRef"
      :check-orientation="false"
      :default-size="defaultSize"
      :resize-image="false"
      :src="src"
      :stencil-component="CircleStencil"
      :stencil-props="{
        aspectRatio: 1,
        handlersClasses: {
          default: 'handler',
          eastNorth: 'handler--east-north',
          north: 'handler--north',
          westNorth: 'handler--west-north',
          west: 'handler--west',
          westSouth: 'handler--west-south',
          south: 'handler--south',
          eastSouth: 'handler--east-south',
          east: 'handler--east',
        }
      }"
      @change="onChange($event)" />
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import type { Coordinates, CropperResult, Size, TransformParams } from 'vue-advanced-cropper'
import { CircleStencil, Cropper } from 'vue-advanced-cropper'

interface IProps {
  src?: string
  hidden?: boolean
}

const props = defineProps<IProps>()
const done = ref<boolean>(false)
const image = defineModel<string>('image', { default: '' })
const coordinates = defineModel<Coordinates>({
  default: {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  }
})

function onChange ({ coordinates: coordinatesValue, canvas }: CropperResult): void {
  done.value = false
  coordinates.value = coordinatesValue
  image.value = canvas?.toDataURL() || ''
  if (props.hidden) done.value = true
}

function defaultSize ({ imageSize, visibleArea }: TransformParams): Size {
  return {
    width: (visibleArea || imageSize).width,
    height: (visibleArea || imageSize).height
  }
}

const cropperRef = useTemplateRef<typeof Cropper>('CropperRef')

function setCoordinates (coordinates: Coordinates): void {
  cropperRef.value?.setCoordinates(coordinates)
}

defineExpose({
  setCoordinates
})
</script>

<style lang="" scoped>
/* :deep(.vue-bounding-box__handler) {
  .handler--west-north,
  .handler--east-north,
  .handler--east-south,
  .handler--west-south {
    @apply relative size-3 border-2 opacity-100;
  }

  .vue-handler-wrapper__draggable {
    &:has(.handler--west-north) {
      @apply justify-start items-start;
    }
    &:has(.handler--east-north) {
      @apply justify-end items-start;
    }
    &:has(.handler--east-south) {
      @apply justify-end items-end;
    }
    &:has(.handler--west-south) {
      @apply justify-start items-end;
    }
  }
}

:deep(.vue-circle-stencil__preview) {
  @apply border-none before:opacity-100 after:opacity-100;
} */
</style>
