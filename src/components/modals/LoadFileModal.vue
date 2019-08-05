<template>
	<b-modal id="load-file-modal" ref="load_file_modal" hide-header hide-footer :content-class="['load-file-modal-content', color_schema.global]" body-class="load-file-modal-body" centered>
		<div class="left-block text">
			<div class="top-block" :class="color_schema.item">
				ВЫБРАТЬ {{ type == 'badge' ? 'БЕЙДЖ' : 'МЕЛОДИЮ' }}
			</div>
			<div class="middle-block" :class="color_schema.item">
				<div class="link-galery" @click="list = true">
					Галерея ({{ getGalleryCounter }})
				</div>
				<div class="link-galery-loaded" @click="list = false">
					Загруженные ({{ getLoadedCounter }})
				</div>
				<vue-dropzone id="dropzone"
											:include-styling="false"
											:options="type === 'sound' ? dropzoneSoundOptions : dropzoneImageOptions"
											:useCustomSlot="true"
											@vdropzone-success="type === 'badge' ? processImageSaving : ''"
				>
					<div class="dropzone-custom-content" ref="dropzoneContent">
						<div class="dropzone-custom-title">
							<img src="../../assets/upload-cloud.svg" alt="Upload Cloud" class="upload-img">
							<div class="text" :class="color_schema.extra">ЗАГРУЗИТЬ ФАЙЛ</div>
						</div>
						<div class="subtitle" :class="color_schema.text"> {{ getAllowedFileTypes }}</div>
					</div>
				</vue-dropzone>
			</div>
			<div class="bottom-block" :class="color_schema.item">
				<button class="default-button"  @click="hideModal">СОХРАНИТЬ</button>
				<b-button class="btn-close" variant="outline-light" @click="hideModal">ОТМЕНА</b-button>
			</div>
		</div>
		<div class="right-block text">
			<div :class="['list-modal-items', {images: (type == 'badge'), sounds: (type == 'sound')}]">
				<div class="list-modal-item" v-for="item in listItems">
					<img :class="['badge-in-list', {badgeselected: (item.selected)}]"
							 :src="item.src"
							 :alt="item.filename"
							 v-if="type === 'badge'"
							 @click="$set(item, 'selected', !item.selected), toggleSelectedBadge(item)"
					>
					<vue-plyr
						v-if="type === 'sound'"
						@click="$set(item, 'selected', !item.selected), toggleSelectedBadge(item)"
						:class="['sound-play', {badgeselected: (item.selected)}]"
					>
						<audio>
							<source :src="`https://api.donatesupp.com${item.src}`" type="audio/mp3"/>
						</audio>
					</vue-plyr>
				</div>
			</div>
		</div>
	</b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import axios from 'axios'

export default {
  name: 'load-file-modal',
  props: ['type'],
  components: {
    vueDropzone: vue2Dropzone
  },
  data () {
    return {
      dropzoneImageOptions: {
        url: `https://api.donatesupp.com/api/mailstone/badge/upload/`,
        thumbnailWidth: 150,
        headers: { 'Authorization': 'Bearer ' + this.$store.getters.token },
        maxFilesize: 0.5,
        success: function (file, response) {
          this.removeFile(file)
        }
      },
      dropzoneSoundOptions: {
        url: `https://api.donatesupp.com/api/mailstone/sound/upload/`,
        thumbnailWidth: 150,
        headers: { 'Authorization': 'Bearer ' + this.$store.getters.token },
        maxFilesize: 15,
        success: function (file, response) {
          this.removeFile(file)
        }
      },
      list: true,
      imageGalleryItems: [],
      soundGalleryItems: [],
      imageItems: [],
      soundItems: [],
      selectedItems: []
    }
  },
  methods: {
    toggleSelectedBadge (item) {
      if (!this.selectedItems.some(element => element.id === item.id)) {
        this.selectedItems.push(item)
      } else {
        this.selectedItems = this.selectedItems.filter(element => element.id !== item.id)
      }
    },
    hideModal () {
      this.$emit(this.type, this.selectedItems)
      this.$refs.load_file_modal.hide()
    },
    getItems () {
      axios.get(`/mailstone/1/${this.type}/`)
        .then((response) => { this.pushItems(response.data) })
    },
    getLoadedItems () {
      axios.get(`/mailstone/1/${this.type}/?loaded=1`)
        .then((response) => { this.pushLoadedItems(response.data) })
    },
    pushItems (data) {
      this.imageGalleryItems = data
    },
    pushLoadedItems (data) {
      if (this.type === 'sound') {
        this.soundItems = data
      } else {
        this.imageItems = data
      }
    },
    processImageSaving (file, xhr) {
      this.imageItems.push({
        src: 'https://api.donatesupp.com' + xhr.src,
        selected: false
      })
      axios.post('/mailstone/badge/add', {
        path: 'https://api.donatesupp.com' + xhr.src
      }).then(() => console.log('Badge saved to DB'))
    }
  },
  computed: {
    ...mapGetters(['color_schema', 'user']),
    listItems () {
    	if (this.list) {
    		return this.type === 'badge'
          ? this.imageGalleryItems
          : this.soundGalleryItems
      }
      return this.type === 'badge'
        ? this.imageItems
        : this.soundItems
    },
    getGalleryCounter () {
    	return this.type === 'sound'
        ? this.soundGalleryItems.length
        : this.imageGalleryItems.length
    },
    getLoadedCounter () {
      return this.type === 'sound' ? this.soundItems.length : this.imageItems.length
    },
    getAllowedFileTypes () {
      return this.type === 'badge' ? 'JPG, PNG, GIF' : 'Только mp3'
    }
  },
  mounted () {
    this.getItems()
    this.getLoadedItems()
  },
  watch: {
    type: function () {
      this.getItems()
      this.getLoadedItems()
    }
  }
}
</script>

<style>
	.plyr--audio .plyr__controls {
		background: unset!important;
		color: #fff!important;
	}
	img.badgeselected {
		border: 2px solid #998CFD;
		border-radius: 3px;
	}
	img.badge-in-list {
		max-width: 130px;
		max-height: 130px;
	}
.load-file-modal-content {
	width: 851px !important;
	height: 645px !important;
	border-radius: 5px !important;
	text-align: center !important;
}
.load-file-modal-content.dark {
	background-color: #282855 !important;
}

@media (min-width: 576px) {
	#load-file-modal > .modal-dialog {
		max-width: 851px !important;
	}
}

.load-file-modal-body {
	display: grid;
	grid-template-columns: 240px 1fr;
	height: 645px;
	width: 851px;
	position: absolute;
	padding: 0;
}
.left-block {
	display: grid;
	grid-template-rows: 1fr 3fr 2fr;
	grid-row-gap: 2px;
}

.right-block {
	overflow: auto;
	position: absolute;
	height: 625px;
	margin: 10px 0;
	right: 16px;
	top: 0;
	padding: 50px;
	width: calc(100% - 240px);
}
.list-modal-items.images {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-column-gap: 50px;
	grid-row-gap: 20px;
}

.list-modal-items.sounds {
	display: grid;
	grid-template-columns: 1fr;
}

.sounds > .list-modal-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #37376A;
	height: 100px;
	cursor: pointer;
}

.bottom-block > button {
	height: 45px;
	border-radius: 33px;
	width: 180px;
	font-size: 12px;
}

.bottom-block {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	padding: 40px 30px;
}

.middle-block > div#dropzone {
	width: 100%;
}

.middle-block {
	padding: 30px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: flex-start;
}
.top-block {
	display: flex;
	justify-content: center;
	align-items: center;
}
.sound-play {
	width: 100%;
	padding: 15px 60px;
}
.link-galery, .link-galery-loaded {
	cursor: pointer;
}
</style>
