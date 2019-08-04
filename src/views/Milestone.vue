<template>
  <div class="content-app milestone" :class="color_schema.text">
    <div class="milestone-actions">
      <div class="milestone-header">
        <div :class="['title', color_schema.title_text]">
         {{ actions ? 'НОВЫЙ МАЙЛСТОУН' : 'МАЙЛСТОУНЫ'}}
       </div>
       <div class="action-buttons">
        <button class="default-button text" @click="save(payload); actions = !actions; " v-b-toggle.milestone-create>
         {{ actions ? 'СОХРАНИТЬ' : 'ДОБАВИТЬ'}}
       </button>
       <button v-if="actions" class="btn-cancel" @click="actions = !actions" v-b-toggle.milestone-create></button>
     </div>
   </div>

   <b-collapse id="milestone-create">
    <div class="milestone-create-block" :class="color_schema.item">

      <div class="form-group ">
        <label>Суммарный Донат</label>
        <div class="text amount-milestone">
          <input type="number" name="amount" class="widget-input" v-model="amount">
          EUR
        </div>
      </div>
      <div class="form-group">
        <label>Анимация</label>
				<div class="select-block">
					<b-dropdown toggle-class="drop-select-block" id="milestone-animation"
											v-model="animation.value"
											:text="animation.value"
											dropbottom
											class="btn my-btn"
					>
						<b-dropdown-item v-for="option in animation_options"
														 :value="option.value"
														 :key="option.value"
														 :class="{ active: animation.value === option.value }"
														 @click="animation.value = option.value; animation.class_name = option.class_name;"
						>
							{{ option.value }}
						</b-dropdown-item>
					</b-dropdown>
				</div>
      </div>
      <div class="milestone-form-badge">
        <label>Бейдж</label>
        <div class="modal-badge modal-file" @click="type = 'badge'" v-b-modal.load-file-modal>
          ВЫБРАТЬ ФАЙЛ
        </div>
        <div class="image-form">
          <img src="../assets/dog.png" alt="dog">
        </div>
        <div class="img-info">
          <div class="name">
            happy_corgi.GIF
            <img src="../assets/remove-btn.svg" alt="remove" class="remove-icon" />
        </div>
        <div class="img-size" :class="color_schema.text">
          842,50 Кб
        </div>
      </div>
    </div>
    <div class="milestone-form-sound">
      <label>Мелодия</label>
      <div class="modal-sound modal-file" @click="type = 'sound'" v-b-modal.load-file-modal>
        ВЫБРАТЬ ФАЙЛ
      </div>
      <div class="milestone-sounds" >
        <img class="play-icon-btn" src="../assets/play-icon.svg">
        <div class="info-sound text">
          message.mp3
          <div class="size-sound" :class="color_schema.text">
            118,27 Кб
          </div>
        </div>
        <img src="../assets/remove-btn.svg" alt="remove" class="remove-icon">
      </div>
    </div>
  </div>
</b-collapse>
</div>
<div class="milestone-list">
  <!-- <template > -->
    <div class="milestone-box" v-for="milestone in milestones" :key="`milestones-${milestone.id}`">
      <div class="top-box" :class="color_schema.item">
        <div class="cash-box text">
          ${{ milestone.donate }}
        </div>
        <div class="inscription text">
          Суммарный донат
        </div>
        <button style="border: none" class="milestone-delete" @click="c_id = milestone.id" v-b-modal.destroy-modal></button>
      </div>
      <div class="middle-box" :class="color_schema.item">
        <div class="milestone-badge">
          <div class="count text">
            {{milestone.badges_count}}
          </div>
          <div class="inscription text">
            Бейдж
          </div>
        </div>
        <div class="animation">
         <div class="count text ">
           {{milestone.animations_count}}
         </div>
         <div class="inscription text ">
          Анимация
        </div>
      </div>
      <div class="sound">
        <div class="count text ">
          {{ milestone.music_count }}
        </div>
        <div class="inscription text ">
          Мелодия
        </div>
      </div>
    </div>
    <div class="bottom-box" :class="color_schema.item">
      <div class="users-avatar">
        <img
					v-for="(badge, index) in milestone.badges"
					:key="`badges-${badge.id}`"
					:src="badge.src"
					alt="avatar-milestone"
					:class="`milestone-img block${index + 1}`"/>
      </div>
    </div>
  </div>
  <!-- </template> -->
</div>
<load-file-modal :type="type"/>
<destroy-modal title="Майлстоун" :m_id="c_id"/>
</div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import ModalBlock from '@/components/ModalBlock.vue'
import MilestoneBox from '@/components/MilestoneBox.vue'

export default {
  name: 'milestone',
  components: {
    MilestoneBox,
    ModalBlock
  },
  data () {
    return {
      type: 'badge',
      animation: { value: 'Стандартно', class_name: 'static' },
      animation_options: [
        { value: 'Стандартно', class_name: 'static' },
        { value: 'Слайдер', class_name: 'widget-slider' },
        { value: 'Список', class_name: 'widget-list' },
        { value: 'Бегущая строка', class_name: 'crawl-line' }
      ],
      amount: 3000,
      actions: false,
      c_id: null,
      dropzoneImageOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 3,
        headers: { 'My-Awesome-Header': 'header value' },
        addRemoveLinks: true,
        maxFiles: 1,
        previewTemplate: this.template()
      },
      dropzoneSoundOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 10,
        headers: { 'My-Awesome-Header': 'header value' },
        addRemoveLinks: true,
        maxFiles: 1
      }
    }
  },
  mounted () {
    this.$store.dispatch('fetchMilestones')
  },
  computed: {
    ...mapGetters(['color_schema']),
    ...mapState(['milestones']),
    payload () {
      return {
        amount: this.amount,
        animation: this.animation
      }
    }
  },
  methods: {
    save (payload) {
      if (this.actions) {
        this.createMilestone(payload)
      }
    },
    ...mapActions(['createMilestone']),
    template: function () {
      return `<div class="dz-preview dz-file-preview">
				<div class="dz-details">
				<div class="dz-filename"><span data-dz-name></span></div>
				<div data-dz-remove class="remove-icon"> </div>
				</div>
				<div class="dz-image">
				<div data-dz-thumbnail-bg></div>
				</div>

				<div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
				<div class="dz-error-message"><span data-dz-errormessage></span></div>

				</div>
				`
    },
    thumbnail: function (file, dataUrl) {
      var j, len, ref, thumbnailElement
      if (file.previewElement) {
        file.previewElement.classList.remove('dz-file-preview')
        // console.log('qwe',file.previewElement)
        // console.log('qwe1',file.previewElement.classList)
        ref = file.previewElement.querySelectorAll('[data-dz-thumbnail-bg]')
        for (j = 0, len = ref.length; j < len; j++) {
          thumbnailElement = ref[j]
          thumbnailElement.alt = file.name
          thumbnailElement.style.backgroundImage = 'url("' + dataUrl + '")'
        }
        return setTimeout(((function (_this) {
          return function () {
            return file.previewElement.classList.add('dz-image-preview')
          }
        })(this)), 1)
      }
    }
  }
}
</script>

<style >
.milestone {
  display: flex;
  flex-direction: column;
}
.milestone-list {
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
}
.milestone-actions {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 20px;
  width: 61.1%;
}
.milestone-actions > .white-text {
  font-size: 13px;
  padding: 30px 15px 20px 25px;
}
.btn.btn-add {
  width: 45px;
  height: 45px;
  background: url(../assets/+.svg) no-repeat center, linear-gradient(to right, #9834D7, #3D79DC) 90%;
  background-size: 12px auto, cover;
  border-radius: 23px;
  margin: 5px;
  border-color: transparent;
}
.btn.btn-add:focus {
  box-shadow: 0 0 0 0.2rem #282855;
}

.milestone-modal-content {
  width: 500px;
  height: 395px;
  border-radius: 5px;
  text-align: center;
  box-shadow: #000000 0px 3px 99px;
}

button.close {
  position: absolute;
  top: 24px;
  right: 25px;
}

img.icon-close {
  width: 15px;
  height: 15px;
}
.modal-title {
  margin: 50px 0;
  text-align: center;
}

.submit-btn {
  height: 45px;
  align-self: center;
  justify-self: center;
}

.list-form-input {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  padding: 0 30px;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}
form.form-modal {
  display: grid;
  grid-template-rows: 2fr 1fr;
}

.group-input {
  font-size: 12px;
  text-align: left;
}
.form-control {
  color: #A9ABBF;
  background-color: transparent;
  border: 2px #595986 solid;
  height: 45px;
}

.form-control:focus {
  color: white;
  background-color: transparent;
  border: 2px white solid;
  border-radius: 3px;
}

input#money {
  width: calc(100% - 16px);
}

span.white-text {
  margin-left: 8px;
}
.milestone-modal-body {
  width: 500px;
  height: 395px;
  position: relative;
  padding: 0;
  display: grid;
  grid-template-rows: 1fr 2fr;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-items: center;
  height: 100%;
}
label {
  margin-bottom: 10px;
}

.milestone-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.milestone-create-block {
  padding: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;
  border-radius: 10px;
}

.milestone-form-badge {
  display: flex;
  flex-direction: column;
  /* width: 53%; */
}

.image-form > img {
  border: 1px solid #595986;
}

img.remove-icon {
  cursor: pointer;
  margin: 10px;
}

.img-info {
  margin-top: 10px;
}

.amount-milestone {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 170px;
}

.amount-milestone > input {
  max-width: 130px;
}

.info-sound.text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.milestone-sounds {
  display: flex;
  justify-content: space-around;
  max-width: 238px;
  align-items: center;
  height: 70px;
  border: 2px solid #595986;
}

.modal-file {
  margin: 10px 0;
  cursor: pointer;
}

.modal-file:hover {
  color: #998CFD;
}
</style>

<style>
.milestone-box {
  /*width: 300px;*/
  /*height: 280px;*/
  border-radius: 5px;
  margin-right: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-rows: repeat(3,1fr);
  grid-row-gap: 3px;
}
.middle-box {
  width: 100%;
  /*height: 79px;*/
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}
.milestone-badge, .animation, .sound {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  width: 80px;
  text-align: center;
  padding: 8px;
}
.inscription {
  font-size: 10px;
}
.top-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  position: relative;
}
.bottom-box {
  /*height: 90px;*/
  /*width: 100%;*/
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.count {
  font-size: 18px;
  text-align: center;
  margin-bottom: 4px;
}

.milestone-delete {
  background: url(../assets/delete.svg) no-repeat center;
  height: 20px;
  width: 20px;
  position: absolute;
  right: 15px;
  top: 15px;
}

.users-avatar > img {
  width: 40px;
  height: 40px;
}

.users-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
}

img.block1.milestone-img {
  left: 26%;
}
img.block2.milestone-img {
  left: 33.7%;
}
img.block3.milestone-img {
  left: 43%;
}
img.block4.milestone-img {
  left: 53%;
}
img.block5.milestone-img {
  left: 63%;
}

img.milestone-img {
  position: absolute;
  border: 2px solid white;
  border-radius: 100%;
}
</style>
