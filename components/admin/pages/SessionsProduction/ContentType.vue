<template>
    <div class="grid max-w-[600px] grid-cols-1 gap-6 pt-5 sm:grid-cols-2">
        <div class="">
            <label class="form-check-image">
                <div class="form-check-wrapper photo" :class="has_images ? 'has-value' : ''">
                    <img
                        class="w-100"
                        src="https://cdn.arabsstock.com/uploads/images/96743/image-96743-professional-saudi-arab-gulf-grapher-taking-graphs-man-thumbnail.webp"
                    />
                </div>

                <div class="form-check form-check-custom form-check-solid">
                    <input type="checkbox" class="form-checkbox rounded-full outline-success" checked value="1" name="image" v-model="has_images" />
                    <span>{{ $t('image') }}</span>
                </div>
            </label>
        </div>
        <div class="">
            <label class="form-check-image">
                <div class="form-check-wrapper photo" :class="has_videos ? 'has-value' : ''">
                    <img class="w-100" src="https://cdn.mos.cms.futurecdn.net/Da27thNt7SY7L7YRBi76Gm-1200-80.jpg" />
                </div>

                <div class="form-check form-check-custom form-check-solid">
                    <input type="checkbox" class="form-checkbox rounded-full outline-success" v-model="has_videos" value="1" name="video" />
                    <span>{{ $t('video') }}</span>
                </div>
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        emits: ['has_images', 'has_videos'],
        props: {
            contentVal: {
                require: false,
            },
        },
        data() {
            return {
                has_images: 0,
                has_videos: 0,
            };
        },
        watch: {
            contentVal() {
                if (this.contentVal && this.contentVal.length != 0) {
                    this.has_images = this.contentVal.has_images;
                    this.has_videos = this.contentVal.has_videos;
                }
            },

            has_images() {
                this.$emit('has_images', this.has_images);
            },
            has_videos() {
                this.$emit('has_videos', this.has_videos);
            },
        },
        methods: {},
    };
</script>
<style>
    .photo img {
        object-fit: cover;
        height: 100%;
    }
    .photo {
        width: 100%;
        height: 200px;
        border: 2px solid transparent;
    }
    .has-value {
        border-color: rgb(0 171 85) !important;
    }
</style>
