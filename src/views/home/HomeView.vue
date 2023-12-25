<script setup lang="ts">
import { type Ref } from 'vue'
import { getHitokoto } from '@/api/alova'
import type { ArticleInfo, Hitokoto } from '@/type/type'
import TitleCard from '@/components/card/TitleCard.vue'
import ArticleCard from '@/components/card/ArticleCard.vue'

const hitokotoData: Ref<Hitokoto> = getHitokoto
const action: ArticleInfo = {
  author: 'Cheese',
  time: 86400000,
  view: 100
}
</script>

<template>
  <div class="title-container">
    <TitleCard
      title="这里一片荒芜"
      content="勃，三尺微命，一介书生。无路请缨，等终军之弱冠；有怀投笔，慕宗悫之长风。舍簪笏于百龄，
    奉晨昏于万里。非谢家之宝树，接孟氏之芳邻。他日趋庭，叨陪鲤对；今兹捧袂，喜托龙门。杨意
    不逢，抚凌云而自惜；钟期既遇，奏流水以何惭？"
      :extra="hitokotoData.hitokoto"
    />
  </div>
  <div class="card-container">
    <ArticleCard
      title="滕王阁序"
      extra="诗词"
      content="勃，三尺微命，一介书生。无路请缨，等终军之弱冠；有怀投笔，慕宗悫之长风。舍簪笏于百龄，
    奉晨昏于万里。非谢家之宝树，接孟氏之芳邻。他日趋庭，叨陪鲤对；今兹捧袂，喜托龙门。杨意
    不逢，抚凌云而自惜；钟期既遇，奏流水以何惭？"
      :action="action"
    />
    <ArticleCard
      title="头发"
      extra="挑染"
      content="勃，三尺微命，一介书生。无路请缨，等终军之弱冠；有怀投笔，慕宗悫之长风。舍簪笏于百龄，
    奉晨昏于万里。非谢家之宝树，接孟氏之芳邻。他日趋庭，叨陪鲤对；今兹捧袂，喜托龙门。杨意
    不逢，抚凌云而自惜；钟期既遇，奏流水以何惭？"
      :action="action"
      class="m-card"
    />
    <ArticleCard title="头发" extra="挑染" content="身体" :action="action" class="l-card" />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/css/color';
@import '@/assets/css/shadow';
@import '@/assets/css/variable';

.title-container {
  margin-bottom: $space-size;
}

.card-container {
  display: grid;
  gap: $space-size;
  box-sizing: border-box;
  grid-template-columns: repeat(auto-fill, minmax($card-size, 1fr));
  grid-auto-flow: dense;
}

.m-card {
  grid-column: span 2;
}

.l-card {
  grid-column: span 3;
}

$l-card-media: $card-size * 3 + 4 * $space-size;
@media (max-width: $l-card-media) {
  .card-container {
    .l-card {
      grid-column: span 2;
    }
  }
}

$m-card-media: $card-size * 2 + 3 * $space-size;
@media (max-width: $m-card-media) {
  .card-container {
    .l-card {
      grid-column: span 1;
    }

    .m-card {
      grid-column: span 1;
    }
  }
}
</style>
