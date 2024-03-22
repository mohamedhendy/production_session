<template>
    <div class="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-2">
        <div class="form-check form-check-custom form-check-solid col-span-full">
            <label for="active">
                <input type="checkbox" class="form-checkbox rounded-full outline-success" checked value="1" name="active" id="active" v-model="is_active" />
                <span>{{ $t('is_active') }}</span>
            </label>
        </div>
        <div class="form-group">
            <label class="capitalize"> {{ $t('name_ar') }} </label>
            <div>
                <div class="">
                    <input type="text" v-model="name_ar" class="form-input" />
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="capitalize"> {{ $t('name_en') }} </label>
            <div>
                <div class="">
                    <input type="text" v-model="name_en" class="form-input" />
                </div>
            </div>
        </div>

        <div class="form-group">
            <h5 class="mt-5 text-lg font-semibold capitalize dark:text-white-light">{{ $t('content_ar') }}</h5>
            <textarea v-model="content_ar" name="" id="" class="form-input" rows="8"></textarea>
        </div>
        <div class="form-group">
            <h5 class="mt-5 text-lg font-semibold capitalize dark:text-white-light">{{ $t('content_en') }}</h5>
            <textarea v-model="content_en" name="" id="" class="form-input" rows="8"></textarea>
        </div>
        <div class="">
            <button @click.prevent="saveContract()" type="submit" class="btn btn-success w-100 text-center">
                {{ $t('save') }}
            </button>
        </div>
    </div>
</template>

<script>
    import Swal from 'sweetalert2';
    import { useRuntimeConfig } from '#imports';
    import { useAppStore } from '@/stores/index';
    export default {
        props: {
            ID: {
                require: true,
            },
        },
        data() {
            return {
                lang: useAppStore().locale,
                apiUrl: useRuntimeConfig().public.apiUrl,
                name_ar: '',
                name_en: '',
                is_active: '',
                content_en: '',
                content_ar: '',
                loading: false,
            };
        },
        created() {
            this.getContractDetails();
        },

        methods: {
            async getContractDetails() {
                await $fetch(`${this.apiUrl}/api/legal-form/${this.ID}`, {
                    method: 'GET',
                }).then((res) => {
                    const data = res.data;
                    this.name_ar = data.name_ar;
                    this.name_en = data.name_en;
                    this.is_active = data.is_active == 1 ? true : false;
                    this.content_en = data.content_en;
                    this.content_ar = data.content_ar;
                });
            },
            async saveContract() {
                this.loading = true;
                let IsValid = false;
                if (!this.name_ar) {
                    setTimeout(() => {
                        Swal.fire({
                            title: '',
                            text: this.t('pleaseAdd') + ' ' + this.t('name_ar'),
                            icon: 'error',
                        });
                    }, 100);
                    IsValid = true;
                }
                if (!this.name_en) {
                    setTimeout(() => {
                        Swal.fire({
                            title: '',
                            text: this.t('pleaseSelect') + ' ' + this.t('name_en'),
                            icon: 'error',
                        });
                    }, 100);
                    IsValid = true;
                }
                if (!this.content_en) {
                    setTimeout(() => {
                        Swal.fire({
                            title: '',
                            text: this.t('pleaseSelect') + ' ' + this.t('content_en'),
                            icon: 'error',
                        });
                    }, 100);
                    IsValid = true;
                }
                if (!this.content_ar) {
                    setTimeout(() => {
                        Swal.fire({
                            title: '',
                            text: this.t('pleaseSelect') + ' ' + this.t('content_ar'),
                            icon: 'error',
                        });
                    }, 100);
                    IsValid = true;
                }
                if (IsValid) {
                    this.loading = false;
                    return;
                }
                await $fetch(`${this.apiUrl}/api/legal-form`, {
                    method: 'POST',
                    body: {
                        name_ar: this.name_ar,
                        name_en: this.name_en,
                        is_active: this.is_active,
                        content_en: this.content_en,
                        content_ar: this.content_ar,
                    },
                })
                    .then((res) => {
                        Swal.fire({
                            title: '',
                            text: 'تمت الإضافة بنجاح',
                            icon: 'success',
                        });
                        this.loading = false;
                        this.$emit('backToHome');
                    })
                    .catch((err) => {
                        this.loading = false;
                        Swal.fire({
                            title: '',
                            text: err.response.data.message,
                            icon: 'error',
                        });
                        Object.keys(err.response.data.errors).forEach((key) => {
                            var errMSG = err.response.data.errors[key][0];
                            setTimeout(() => {
                                Swal.fire({
                                    title: '',
                                    text: errMSG,
                                    icon: 'error',
                                });
                            }, 500);
                        });
                    });
            },
        },
    };
</script>
