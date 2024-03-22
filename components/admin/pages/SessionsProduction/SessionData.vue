<template>
    <div class="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-2">
        <div class="form-group">
            <label class="capitalize"> {{ $t('sessionName') }} </label>
            <div>
                <div class="">
                    <input type="text" v-model="contentObject.name" class="form-input" />
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="capitalize"> {{ $t('date') }} </label>
            <div>
                <div class="form-input">
                    {{ contentObject.date }}
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="capitalize"> {{ $t('country') }} </label>
            <div>
                <div class="">
                    <select v-model="country_id" :placeholder="$t('country')" class="form-select text-white-dark">
                        <option v-for="item in countries" :key="item.id" :value="item.id">
                            {{ item.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="capitalize"> {{ $t('city') }} </label>
            <div>
                <div class="">
                    <select v-model="city_id" :disabled="!country_id" :placeholder="$t('city')" class="form-select text-white-dark">
                        <option v-for="item in cites" :key="item.id" :value="item.id">
                            {{ item.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { useRuntimeConfig } from '#imports';
    import { useAppStore } from '@/stores/index';
    export default {
        props: {
            contentVal: {
                require: false,
            },
        },
        data() {
            return {
                lang: useAppStore().locale,
                cites: [],
                apiUrl: useRuntimeConfig().public.apiUrl,
                countries: [],
                city_id: null,
                country_id: null,
                contentObject: {
                    has_images: 0,
                    has_videos: 0,
                    date: new Date().toISOString().slice(0, 10),
                    name: '',
                },
            };
        },
        watch: {
            contentVal() {
                if (this.contentVal && this.contentVal.length != 0) {
                    this.contentObject = this.contentVal;
                    this.country_id = this.contentVal.country_id;
                    this.city_id = this.contentVal.city_id;
                }
            },

            contentObject: {
                handler(newValue, oldValue) {
                    this.$emit('addContent', this.contentObject);
                },
                deep: true,
            },
            country_id() {
                this.cites = [];
                this.city_id = null;
                this.contentObject.country_id = this.country_id;
                this.$emit('addContent', this.contentObject);
                this.getCity();
            },
            city_id() {
                this.contentObject.city_id = this.city_id;
                this.$emit('addContent', this.contentObject);
            },
        },
        created() {
            this.getCountry();
        },
        methods: {
            async getCountry() {
                await $fetch(`${this.apiUrl}/api/countries`, {
                    method: 'GET',
                    headers: {
                        "Accept-Language": this.lang,
                    },
                }).then((response) => {
                    this.countries = response.data.map((res) => {
                        return {
                            name: this.lang == 'ar' ? res.name_ar : res.name_en,
                            id: res.id,
                        };
                    });
                });
            },
            async getCity() {
                await $fetch(`${this.apiUrl}/api/cities?country_id=${this.country_id}`, {
                    method: 'GET',
                }).then((response) => {
                    this.cites = response.data.map((res) => {
                        return {
                            name: this.lang == 'ar' ? res.name_ar : res.name_en,
                            id: res.id,
                        };
                    });
                });
            },
        },
    };
</script>
