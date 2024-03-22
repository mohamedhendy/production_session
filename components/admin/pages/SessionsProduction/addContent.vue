<template>
    <fragment>
        <div class="col-md-12">
            <div class="form-group">
                <label for=""> {{ $t("contentType") }}</label>

                <div class="d-flex">
                    <div>
                        <el-checkbox
                            id="picture"
                            v-model="contentObject.has_images"
                            ><span class="btn btn-success mb-0 mx-1"
                                >{{ $t("pictures") }}
                            </span></el-checkbox
                        >
                    </div>
                    <div class="mx-4">
                        <el-checkbox
                            v-model="contentObject.has_videos"
                            id="picture"
                            ><span class="btn btn-primary mb-0 mx-1">{{
                                $t("videos")
                            }}</span></el-checkbox
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class=" control-label"
                    >{{ $t("sessionName") }} 
                </label>
                <el-input
                    :placeholder='t("sessionName")'
                    v-model="contentObject.name"
                ></el-input>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class=" control-label"> {{ t("date") }}</label>
                <div class="">
                    <label class="form-control">
                        {{ contentObject.date }}
                    </label>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class=" control-label">{{ $t("country") }}</label>
                <div class="">
                    <el-select
                        class="w-100"
                        filterable
                        v-model="country_id"
                        :placeholder="t('country')"
                    >
                        <el-option
                            v-for="item in countries"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class=" control-label">{{ $t("city") }}</label>
                <div class="">
                    <el-select
                        :disabled="!country_id"
                        class="w-100"
                        filterable
                        v-model="city_id"
                        :placeholder="t('city')"
                    >
                        <el-option
                            v-for="item in cites"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
    </fragment>
</template>
<script>
import { useRuntimeConfig } from '#imports'
import { useAppStore } from '@/stores/index';
export default {
    props: {
        contentVal: {
            require: false
        }
    },
    data() {
        return {
            localLang: useAppStore().locale,
            apiUrl :  useRuntimeConfig().public.apiUrl,
            cites: [],
            countries: [],
            city_id: null,
            country_id: null,
            contentObject: {
                has_images: 0,
                has_videos: 0,
                date: new Date().toISOString().slice(0, 10),
                name: ""
            }
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
                this.$emit("addContent", this.contentObject);
            },
            deep: true
        },
        country_id() {
            this.cites = [];
            this.city_id = null;
            this.contentObject.country_id = this.country_id;
            this.$emit("addContent", this.contentObject);
            this.getCity();
        },
        city_id() {
            this.contentObject.city_id = this.city_id;
            this.$emit("addContent", this.contentObject);
        }
    },
    created() {
        this.getCountry();
    },

    methods: {
        async getCountry() {
            await $fetch(`${this.apiUrl}/api/countries`, {method: 'GET'}).then(response => {
                this.countries = response.data.data.map(res => {
                    return {
                        name:
                            this.localLang == "ar" ? res.name_ar : res.name_en,
                        id: res.id
                    };
                });
            });
        },
        async getCity() {
            await axios
                .get(`${this.apiUrl}/api/cities?country_id=${this.country_id}`)
                .then(response => {
                    this.cites = response.data.data.map(res => {
                        return {
                            name:
                                this.localLang == "ar"
                                    ? res.name_ar
                                    : res.name_en,
                            id: res.id
                        };
                    });
                });
        }
    }
};
</script>
<style>
.el-checkbox__input .el-checkbox__inner {
    height: 39px;
    width: 39px;
    vertical-align: middle;
}
.el-checkbox__inner::after {
    content: "";
    border: 4px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 13px;
    left: 15px;
    position: absolute;
    top: 9px;
}
</style>
