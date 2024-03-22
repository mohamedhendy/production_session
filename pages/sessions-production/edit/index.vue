<template>
    <div :class="lang == 'ar' ? 'is_ar' : 'is_en'">
        <div v-if="loading" class="abs-section bg-white">
            <span class="m-auto inline-block h-14 w-14 animate-spin rounded-full border-8 border-[#f1f2f3] border-l-primary pb-10 align-middle"></span>
        </div>

        <form-wizard
            @on-complete="onComplete"
            title="This is a new title"
            subtitle="And a new subtitle"
            shape="tab"
            :back-button-text="$t('back')"
            :next-button-text="$t('next')"
            :finish-button-text="$t('save')"
            class="pills"
            color="#4361ee"
            customIcon=""
        >
            <tab-content
                customIcon='<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M16.24 3.5h-8.5a5 5 0 0 0-5 5v7a5 5 0 0 0 5 5h8.5a5 5 0 0 0 5-5v-7a5 5 0 0 0-5-5"/><path d="m2.99 17l2.75-3.2a2.2 2.2 0 0 1 2.77-.27a2.2 2.2 0 0 0 2.77-.27l2.33-2.33a4 4 0 0 1 5.16-.43l2.49 1.93M7.99 10.17a1.66 1.66 0 1 0 0-3.32a1.66 1.66 0 0 0 0 3.32"/></g></svg>'
                :title="$t('contentType')"
            >
                <div class="col-md-12">
                    <div class="border-bottom d-flex align-items-center">
                        <h5 class="text-lg font-semibold dark:text-white-light">
                            {{ $t('contentType') }}
                        </h5>
                        <div>
                            <content-type @has_images="is_has_images" :contentVal="content"  @has_videos="is_has_videos"></content-type>
                        </div>
                    </div>
                </div>
            </tab-content>
            <tab-content
                customIcon='<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M6.783 2.826A1.5 1.5 0 0 1 8.123 2h3.764a1.5 1.5 0 0 1 1.342.83L13.814 4h1.69a2.5 2.5 0 0 1 2.5 2.5v2.195a2.853 2.853 0 0 0-1-.56V6.5a1.5 1.5 0 0 0-1.5-1.5h-2a.5.5 0 0 1-.446-.276l-.723-1.447A.5.5 0 0 0 11.887 3H8.123a.5.5 0 0 0-.447.275l-.728 1.449a.5.5 0 0 1-.446.275H4.504a1.5 1.5 0 0 0-1.5 1.5V14.5a1.5 1.5 0 0 0 1.5 1.5H8.22l-.163.653a1.936 1.936 0 0 0-.054.347h-3.5a2.5 2.5 0 0 1-2.5-2.5v-8a2.5 2.5 0 0 1 2.5-2.5h1.69zm7.104 6.23A4.002 4.002 0 0 0 6 10c0 1.89 1.31 3.473 3.072 3.892a3.2 3.2 0 0 1 .202-.222l.67-.67A3 3 0 1 1 13 9.944zm.922.492l-4.83 4.83a2.197 2.197 0 0 0-.577 1.02l-.375 1.498a.89.89 0 0 0 1.079 1.078l1.498-.374a2.194 2.194 0 0 0 1.02-.578l4.83-4.83a1.87 1.87 0 0 0-2.645-2.644"/></svg>'
                :title="$t('session_data')"
            >
                <h5 class="text-lg font-semibold dark:text-white-light">
                    {{ $t('session_data') }}
                </h5>
                <session-data @addContent="setContent" :contentVal="content"></session-data>
            </tab-content>
            <tab-content
                customIcon='<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.5 8C14 8 16 10 16 12.5S14 17 11.5 17S7 15 7 12.5S9 8 11.5 8m0 1A3.5 3.5 0 0 0 8 12.5a3.5 3.5 0 0 0 3.5 3.5a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 11.5 9M5 5h2l2-2h5l2 2h2a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3m4.41-1l-2 2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2.41l-2-2z"/></svg>
            '
                :title="$t('add_photographer')"
            >
                <div class="mb-5 flex items-center justify-between">
                    <h5 class="text-lg font-semibold capitalize dark:text-white-light">
                        {{ $t('add_photographer') }}
                    </h5>
                    <button @click="addNewPhotographer" type="button" class="btn btn-outline-primary">
                        <icon-plus class="ltr:mr-2 rtl:ml-2" />
                        {{ $t('add_photographer') }}
                    </button>
                </div>
                <add-photographer
                    v-for="(item, indexObj) in photographer"
                    :key="indexObj"
                    @addPhotographer="setPhotographer"
                    :photographerVal="item"
                    :isEditable="true"
                    :indexNumber="indexObj"
                    :contractMenuList="contractMenuList"
                    :DefaultContract="DefaultContract"
                    @delete="deleteRow"
                ></add-photographer>
            </tab-content>
            <tab-content
                customIcon='<svg width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M229.19 213c-15.81-27.32-40.63-46.49-69.47-54.62a70 70 0 1 0-63.44 0C67.44 166.5 42.62 185.67 26.81 213a6 6 0 1 0 10.38 6c19.21-33.19 53.15-53 90.81-53s71.6 19.81 90.81 53a6 6 0 1 0 10.38-6M70 96a58 58 0 1 1 58 58a58.07 58.07 0 0 1-58-58"/></svg>'
                :title="$t('add_modal')"
            >
                <div class="mb-5 flex items-center justify-between">
                    <h5 class="text-lg font-semibold capitalize dark:text-white-light">
                        {{ $t('add_modal') }}
                    </h5>
                    <button @click="addNewRepresentative" type="button" class="btn btn-outline-primary">
                        <icon-plus class="ltr:mr-2 rtl:ml-2" />
                        {{ $t('add_modal') }}
                    </button>
                </div>
                <add-representative
                    v-for="(item, indexObj) in representative"
                    @addRepresentative="setRepresentative"
                    :key="indexObj"
                    :representativeVal="item"
                    :indexNumber="indexObj"
                    :isEditable="true"
                    :contractMenuList="contractMenuList"
                    :DefaultContract="DefaultContract"
                    @delete="deleteRow"
                ></add-representative>
            </tab-content>
            <tab-content
                customIcon='<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 50 50"><path fill="currentColor" d="m25 42.5l-.8-.9C23.7 41.1 12 27.3 12 19c0-7.2 5.8-13 13-13s13 5.8 13 13c0 8.3-11.7 22.1-12.2 22.7zM25 8c-6.1 0-11 4.9-11 11c0 6.4 8.4 17.2 11 20.4c2.6-3.2 11-14 11-20.4c0-6.1-4.9-11-11-11"/><path fill="currentColor" d="M25 24c-2.8 0-5-2.2-5-5s2.2-5 5-5s5 2.2 5 5s-2.2 5-5 5m0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3s3-1.3 3-3s-1.3-3-3-3"/></svg>
                '
                :title="$t('location')"
            >
                <div class="mb-5 flex items-center justify-between">
                    <h5 class="text-lg font-semibold capitalize dark:text-white-light">
                        {{ $t('add_location') }}
                    </h5>
                    <button @click="addNewLocation" type="button" class="btn btn-outline-primary">
                        <icon-plus class="ltr:mr-2 rtl:ml-2" />
                        {{ $t('add_location') }}
                    </button>
                </div>
                <add-location
                    v-for="(item, indexObj) in location"
                    @addLocation="setLocation"
                    :key="indexObj"
                    :indexNumber="indexObj"
                    :locationVal="item"
                    :isEditable="true"
                    :contractMenuList="contractMenuList"
                    :DefaultContract="DefaultContract"
                    @delete="deleteRow"
                ></add-location>
            </tab-content>
            <tab-content
                customIcon='<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M5 3h14v18l-1.032-.884a2 2 0 0 0-2.603 0L14.333 21l-1.031-.884a2 2 0 0 0-2.604 0L9.667 21l-1.032-.884a2 2 0 0 0-2.603 0L5 21zm10 4H9m6 4H9m6 4h-4"/></svg>'
                :title="$t('financialSection')"
            >
                <div class="mb-5 flex items-center justify-between">
                    <h5 class="text-lg font-semibold capitalize dark:text-white-light">
                        {{ $t('financialSection') }}
                    </h5>
                    <button @click="addNewInvoice" type="button" class="btn btn-outline-primary">
                        <icon-plus class="ltr:mr-2 rtl:ml-2" />
                        {{ $t('addInvoice') }}
                    </button>
                </div>
                <add-invoice
                    v-for="(item, indexObj) in invoice"
                    :key="indexObj"
                    @addInvoice="setInvoice"
                    :invoiceVal="item"
                    :isEditable="true"
                    :indexNumber="indexObj"
                    @delete="deleteRow"
                >
                </add-invoice>
                <div class="col-md-12">
                    <h5 class="mt-5 text-lg font-semibold capitalize dark:text-white-light">{{ $t('notes') }}</h5>
                    <textarea v-model="notes" name="" id="" class="form-input" rows="4"></textarea>
                </div>
            </tab-content>
        </form-wizard>
    </div>

  
</template>

<script>
    import { FormWizard, TabContent } from 'vue3-form-wizard';
    import { useAppStore } from '@/stores/index';
    import 'vue3-form-wizard/dist/style.css';
    import Swal from 'sweetalert2';
    import ContentType from '../../../components/admin/pages/SessionsProduction/ContentType.vue';
    import SessionData from '../../../components/admin/pages/SessionsProduction/SessionData.vue';
    import addContent from '../../../components/admin/pages/SessionsProduction/addContent.vue';
    import addInvoice from '../../../components/admin/pages/SessionsProduction/addInvoice.vue';
    import addLocation from '../../../components/admin/pages/SessionsProduction/addLocation.vue';
    import addPhotographer from '../../../components/admin/pages/SessionsProduction/addPhotographer.vue';
    import addRepresentative from '../../../components/admin/pages/SessionsProduction/addRepresentative.vue';
    export default {
        props: {
            ID: {
                require: true,
            },
        },
        components: {
            addContent,
            addInvoice,
            addLocation,
            addPhotographer,
            addRepresentative,
            ContentType,
            SessionData,
            FormWizard,
            TabContent
        },
        data() {
            return {
                lang: useAppStore().locale,
                sessionID: null,
                apiUrl :  useRuntimeConfig().public.apiUrl,
                defaultValue: {},
                photographer: [
                    {
                        mobile: '',
                        name: '',
                        email: '',
                        type: '',
                        identity_number: '',
                        contract_image: '',
                        legal_form_id: '',
                        legal_form: '',
                    },
                ],
                location: [
                    {
                        mobile: null,
                        name: '',
                        email: '',
                        location_name: '',
                        contract_image: '',
                        legal_form_id: '',
                        legal_form: '',
                    },
                ],
                loading: false,
                representative: [
                    {
                        mobile: null,
                        name: '',
                        email: '',
                        model_image: '',
                        identity_number: '',
                        contract_image: '',
                        legal_form_id: '',
                        legal_form: '',
                    },
                ],
                invoice: [
                    {
                        title: '',
                        price: '',
                        file: '',
                    },
                ],
                notes: '',
                contractMenuList: [],
                DefaultContract: [],
                content: [],
                form: {},
            };
        },
        created() {
            this.getSessionsDetails();
            this.getContractsMenuList();
        },
        methods: {
            is_has_images(val) {
                this.content.has_images = val ? 1 : 0;
            },
            is_has_videos(val) {
                this.content.has_videos = val ? 1 : 0;
            },
           
            addNewPhotographer() {
                this.photographer.push({
                    mobile: '',
                    name: '',
                    email: '',
                    photography_type: '',
                    identity_number: '',
                    contract_image: '',
                    legal_form_id: this.contractMenuList[0].id,
                    legal_form: this.contractMenuList[0],
                });
            },
            addNewRepresentative() {
                this.representative.push({
                    mobile: null,
                    name: '',
                    email: '',
                    model_image: '',
                    identity_number: '',
                    contract_image: '',
                    legal_form_id: this.contractMenuList[0].id,
                    legal_form: this.contractMenuList[0],
                });
            },
            addNewLocation() {
                this.location.push({
                    mobile: null,
                    name: '',
                    email: '',
                    location_name: '',
                    identity_number: '',
                    contract_image: '',
                    legal_form_id: this.contractMenuList[0].id,
                    legal_form: this.contractMenuList[0],
                });
            },
            addNewInvoice() {
                this.invoice.push({
                    title: '',
                    price: '',
                    file: '',
                });
            },
            setInvoice(data, index) {
                this.invoice[index] = data;
            },
            setContent(data) {
                this.content = data;
            },
            setPhotographer(data, index) {
                this.photographer[index] = data;
            },
            setLocation(data, index) {
                this.location[index] = data;
            },
            setRepresentative(data, index) {
                this.representative[index] = data;
            },
            onComplete() {
                this.saveSession();
            },
            async saveSession() {
                let IsValid = false;
                var formdata = new FormData();
                this.loading = true;

                if (!this.content.name) {
                    setTimeout(() => {
                        Swal.fire({
                            title: '',
                            text: this.$t('pleaseAdd') + ' ' + this.$t('sessionName'),
                            icon: 'error',
                        });
                    }, 100);
                    IsValid = true;
                }
                if (!this.content.country_id) {
                    setTimeout(() => {
                        Swal.fire({
                            title: '',
                            text: this.$t('pleaseSelect') + ' ' + this.$t('country'),
                            icon: 'error',
                        });
                    }, 100);
                    IsValid = true;
                }
                if (!this.content.city_id) {
                    setTimeout(() => {
                        Swal.fire({
                            title: '',
                            text: this.$t('pleaseSelect') + ' ' + this.$t('city'),
                            icon: 'error',
                        });
                    }, 100);
                    IsValid = true;
                }
                formdata.append('id', this.sessionID);
                formdata.append('notes', this.notes);
                formdata.append('city_id', this.content.city_id);
                formdata.append('date', this.content.date);
                formdata.append('_method', 'put');
                formdata.append('name', this.content.name);
                formdata.append('country_id', this.content.country_id);
                formdata.append('has_images', this.content.has_images ? 1 : 0);
                formdata.append('has_videos', this.content.has_videos ? 1 : 0);

                for (let i = 0; i < this.photographer.length; i++) {
                    if (!this.photographer[i].name) {
                        setTimeout(() => {
                            Swal.fire({
                                title: '',
                                text: this.$t('pleaseSelect') + ' ' + this.$t('photographerName') + '-' + i + 1,
                                icon: 'error',
                            });
                        }, 100);
                        IsValid = true;
                    }

                    if (!this.photographer[i].photography_type) {
                        setTimeout(() => {
                            Swal.fire({
                                title: '',
                                text: `(${this.$t('photographer')} - ${i + 1}) ${this.$t('pleaseAdd')} ${this.$t('photographerType')} }`,
                                icon: 'error',
                            });
                        }, 100);
                        IsValid = true;
                    }
                    if (!this.photographer[i].mobile) {
                        setTimeout(() => {
                            Swal.fire({
                                title: '',
                                text: `(${this.$t('photographer')} - ${i + 1}) ${this.$t('pleaseAdd')}   ${this.$t('mobile')} `,
                                icon: 'error',
                            });
                        }, 100);
                        IsValid = true;
                    }
                    if (!this.photographer[i].email) {
                        setTimeout(() => {
                            Swal.fire({
                                title: '',
                                text: `(${this.$t('photographer')} - ${i + 1}) ${this.$t('pleaseAdd')} ${this.$t('email')} `,
                                icon: 'error',
                            });
                        }, 100);
                        IsValid = true;
                    }
                    if (!this.photographer[i].identity_number) {
                        setTimeout(() => {
                            Swal.fire({
                                title: '',
                                text: `(${this.$t('photographer')} - ${i + 1}) ${this.$t('pleaseAdd')} ${this.$t('identityNumber')} `,
                                icon: 'error',
                            });
                        }, 100);
                        IsValid = true;
                    }
                    if (!this.photographer[i].contract_image) {
                        setTimeout(() => {
                            Swal.fire({
                                title: '',
                                text: `(${this.$t('photographer')} - ${i + 1}) ${this.$t('pleaseAdd')} ${this.$t('signature')} `,
                                icon: 'error',
                            });
                        }, 100);
                        IsValid = true;
                    }
                    formdata.append(`entities[${i}][type]`, 'photographer');
                    formdata.append(`entities[${i}][name]`, this.photographer[i].name);
                    if (this.photographer[i].id) {
                        formdata.append(`entities[${i}][id]`, this.photographer[i].id);
                    }
                    formdata.append(`entities[${i}][mobile]`, this.photographer[i].mobile);
                    formdata.append(`entities[${i}][email]`, this.photographer[i].email);
                    formdata.append(`entities[${i}][photography_type]`, this.photographer[i].photography_type);
                    formdata.append(`entities[${i}][identity_number]`, this.photographer[i].identity_number);
                    if (this.photographer[i].legal_form_id != undefined) {
                        formdata.append(`entities[${i}][legal_form_id]`, this.photographer[i].legal_form_id);
                    } else {
                        formdata.append(`entities[${i}][legal_form_id]`, this.photographer[i].legal_form.id);
                    }

                    if (typeof this.photographer[i].contract_image != 'string') {
                        formdata.append(
                            `entities[${i}][contract_image]`,
                            this.photographer[i].contract_image ? this.photographer[i].contract_image : this.photographer[i].contract_image
                        );
                    }
                }

                const step2 = this.photographer.length;
                for (let i = 0; i < this.representative.length; i++) {
                    if (!this.representative[i].name) {
                        setTimeout(() => {
                            Swal.fire({
                                title: '',
                                text: `(${this.$t('model')} - ${i + 1}) ${this.$t('pleaseAdd')} ${this.$t('modelName')}`,
                                icon: 'error',
                            });
                        }, 100);
                        IsValid = true;
                    }
                    if (!this.representative[i].mobile) {
                        setTimeout(() => {
                            Swal.fire({
                                title: '',
                                text: `(${this.$t('model')} - ${i + 1}) ${this.$t('pleaseAdd')}   ${this.$t('mobile')} `,
                                icon: 'error',
                            });
                        }, 100);
                        IsValid = true;
                    }
                    if (!this.representative[i].email) {
                        setTimeout(() => {
                            Swal.fire({
                                title: '',
                                text: `(${this.$t('model')} - ${i + 1}) ${this.$t('pleaseAdd')} ${this.$t('email')} `,
                                icon: 'error',
                            });
                        }, 100);
                        IsValid = true;
                    }
                    if (!this.representative[i].contract_image) {
                        setTimeout(() => {
                            Swal.fire({
                                title: '',
                                text: `(${this.$t('model')} - ${i + 1}) ${this.$t('pleaseAdd')} ${this.$t('signature')} `,
                                icon: 'error',
                            });
                        }, 100);
                        IsValid = true;
                    }
                    if (!this.representative[i].identity_number) {
                        setTimeout(() => {
                            Swal.fire({
                                title: '',
                                text: `(${this.$t('model')} - ${i + 1}) ${this.$t('pleaseAdd')} ${this.$t('identityNumber')} `,
                                icon: 'error',
                            });
                        }, 100);
                        IsValid = true;
                    }
                    formdata.append(`entities[${i + step2}][type]`, 'model');
                    formdata.append(`entities[${i + step2}][name]`, this.representative[i].name);
                    if (this.representative[i].id) {
                        formdata.append(`entities[${i + step2}][id]`, this.representative[i].id);
                    }
                    formdata.append(`entities[${i + step2}][mobile]`, this.representative[i].mobile);
                    if (this.photographer[i].legal_form_id != undefined) {
                        formdata.append(`entities[${i}][legal_form_id]`, this.representative[i].legal_form_id);
                    } else {
                        formdata.append(`entities[${i}][legal_form_id]`, this.representative[i].legal_form.id);
                    }
                    formdata.append(`entities[${i + step2}][email]`, this.representative[i].email);
                    if (typeof this.representative[i].model_image != 'string') {
                        formdata.append(`entities[${i + step2}][model_image]`, this.representative[i].model_image);
                    }
                    formdata.append(`entities[${i + step2}][identity_number]`, this.representative[i].identity_number);

                    if (typeof this.representative[i].contract_image != 'string') {
                        formdata.append(
                            `entities[${i + step2}][contract_image]`,
                            this.representative[i].contract_image ? this.representative[i].contract_image : this.representative[i].contract_image
                        );
                    }
                }

                const step3 = this.photographer.length + this.representative.length;
                for (let i = 0; i < this.location.length; i++) {
                    if (!this.location[i].name) {
                        setTimeout(() => {
                            Swal.fire({
                                title: '',
                                text: `(${this.$t('location')} ${i + 1}) ${this.$t('pleaseAdd')} ${this.$t('responsiblePerson')}`,
                                icon: 'error',
                            });
                        }, 100);
                        IsValid = true;
                    }
                    if (!this.location[i].location_name) {
                        setTimeout(() => {
                            Swal.fire({
                                title: '',
                                text: `(${this.$t('location')} - ${i + 1}) ${this.$t('pleaseAdd')} ${this.$t('name')} `,
                                icon: 'error',
                            });
                        }, 100);
                        IsValid = true;
                    }
                    if (!this.location[i].mobile) {
                        setTimeout(() => {
                            Swal.fire({
                                title: '',
                                text: `(${this.$t('location')} - ${i + 1}) ${this.$t('pleaseAdd')}   ${this.$t('mobile')} `,
                                icon: 'error',
                            });
                        }, 100);
                        IsValid = true;
                    }
                    if (!this.location[i].email) {
                        setTimeout(() => {
                            Swal.fire({
                                title: '',
                                text: `(${this.$t('location')} - ${i + 1}) ${this.$t('pleaseAdd')} ${this.$t('email')} `,
                                icon: 'error',
                            });
                        }, 100);
                        IsValid = true;
                    }
                    if (!this.location[i].contract_image) {
                        setTimeout(() => {
                            Swal.fire({
                                title: '',
                                text: `(${this.$t('location')} - ${i + 1}) ${this.$t('pleaseAdd')} ${this.$t('signature')} `,
                                icon: 'error',
                            });
                        }, 100);
                        IsValid = true;
                    }
                    if (!this.location[i].identity_number) {
                        setTimeout(() => {
                            Swal.fire({
                                title: '',
                                text: `(${this.$t('location')} - ${i + 1}) ${this.$t('pleaseAdd')} ${this.$t('identityNumber')} `,
                                icon: 'error',
                            });
                        }, 100);
                        IsValid = true;
                    }

                    formdata.append(`entities[${i + step3}][type]`, 'location');
                    if (this.location[i].id) {
                        formdata.append(`entities[${i + step3}][id]`, this.location[i].id);
                    }
                    formdata.append(`entities[${i + step3}][name]`, this.location[i].name);

                    if (this.photographer[i].legal_form_id != undefined) {
                        formdata.append(`entities[${i}][legal_form_id]`, this.location[i].legal_form_id);
                    } else {
                        formdata.append(`entities[${i}][legal_form_id]`, this.location[i].legal_form.id);
                    }

                    formdata.append(`entities[${i + step3}][identity_number]`, this.location[i].identity_number);
                    formdata.append(`entities[${i + step3}][mobile]`, this.location[i].mobile);
                    formdata.append(`entities[${i + step3}][email]`, this.location[i].email);
                    formdata.append(`entities[${i + step3}][location_name]`, this.location[i].location_name);

                    if (typeof this.location[i].contract_image != 'string') {
                        formdata.append(
                            `entities[${i + step3}][contract_image]`,
                            this.location[i].contract_image ? this.location[i].contract_image : this.location[i].contract_image
                        );
                    }
                }

                const step4 = this.photographer.length + this.representative.length + this.location.length;

                for (let i = 0; i < this.invoice.length; i++) {
                    if (!this.invoice[i].title) {
                        setTimeout(() => {
                            Swal.fire({
                                title: '',
                                text: `(${this.$t('invoice')} - ${i + 1}) ${this.$t('pleaseAdd')} ${this.$t('name')} `,
                                icon: 'error',
                            });
                        }, 100);
                        IsValid = true;
                    }
                    if (!this.invoice[i].price) {
                        setTimeout(() => {
                            Swal.fire({
                                title: '',
                                text: `(${this.$t('invoice')} - ${i + 1}) ${this.$t('pleaseAdd')} ${this.$t('price')} `,
                                icon: 'error',
                            });
                        }, 100);
                        IsValid = true;
                    }
                    if (!this.invoice[i]) {
                        setTimeout(() => {
                            Swal.fire({
                                title: '',
                                text: `(${this.$t('invoice')} - ${i + 1}) ${this.$t('pleaseAdd')} ${this.$t('file')} `,
                                icon: 'error',
                            });
                        }, 100);
                        IsValid = true;
                    }

                    formdata.append(`invoices[${i + step4}][type]`, 'invoice');
                    if (this.invoice[i].id) {
                        formdata.append(`invoices[${i + step4}][id]`, this.invoice[i].id);
                    }
                    formdata.append(`invoices[${i + step4}][title]`, this.invoice[i].title);
                    formdata.append(`invoices[${i + step4}][price]`, this.invoice[i].price);
                    if (typeof this.invoice[i].file != 'string') {
                        formdata.append(`invoices[${i + step4}][file]`, this.invoice[i].file);
                    }
                }
                if (IsValid) {
                    this.loading = false;
                    return;
                }
                await $fetch(`${this.apiUrl}/api/recording-session/${this.ID}`, {
                        method: 'POST',
                        body: formdata
                    })
                    .then((res) => {
                        Swal.fire({
                            title: '',
                            text: 'تمت التعديل بنجاح',
                            icon: 'success',
                        });
                        this.loading = false;
                        this.$emit('backToHome');
                    })
                    .catch((err) => {
                        this.loading = false;
                        Swal.fire({
                            title: '',
                            message: err.response.data.message,
                            icon: 'error',
                        });
                        Object.keys(err.response.data.errors).forEach((key) => {
                            var errMSG = err.response.data.errors[key][0];
                            setTimeout(() => {
                                Swal.fire({
                                    title: '',
                                    message: errMSG,
                                    icon: 'error',
                                });
                            }, 500);
                        });
                    });
            },
            deleteRow(index, rows) {
                if (rows == 'location') {
                    this.location.splice(index, 1);
                }
                if (rows == 'photographer') {
                    this.photographer.splice(index, 1);
                }
                if (rows == 'representative') {
                    this.representative.splice(index, 1);
                }
                if (rows == 'invoice') {
                    this.invoice.splice(index, 1);
                }
            },
            // ${this.ID}
            async getSessionsDetails() {
                await $fetch(`${this.apiUrl}/api/recording-session/${this.ID}`, {
                    method: 'GET'
                }).then((res) => {
                    this.defaultValue = res.data;
                    this.content = {
                        has_images: this.defaultValue.has_images,
                        has_videos: this.defaultValue.has_videos,
                        date: this.defaultValue.date,
                        name: this.defaultValue.name,
                        country_id: this.defaultValue.country_id,
                        city_id: this.defaultValue.city_id,
                    };
                    this.sessionID = this.defaultValue.id;
                    this.photographer = JSON.parse(JSON.stringify(this.defaultValue.entities.filter((res) => res.type == 'photographer')));

                    this.location = JSON.parse(JSON.stringify(this.defaultValue.entities.filter((res) => res.type == 'location')));
                    this.representative = JSON.parse(JSON.stringify(this.defaultValue.entities.filter((res) => res.type == 'model')));
                    this.invoice = this.defaultValue.invoices;
                    this.notes = this.defaultValue.notes;
                });
            },
            async getContractsMenuList() {
                await $fetch(`${this.apiUrl}/api/legal-form`, {
                    method: 'GET'
                })
                    .then((res) => {
                        this.contractMenuList = res.data.data;
                    })
                    .catch((err) => {
                        this.loading = false;
                        Swal.fire({
                            title: '',
                            message: err.response.data.message,
                            icon: 'error',
                        });
                        Object.keys(err.response.data.errors).forEach((key) => {
                            var errMSG = err.response.data.errors[key][0];
                            setTimeout(() => {
                                Swal.fire({
                                    title: '',
                                    message: errMSG,
                                    icon: 'error',
                                });
                            }, 500);
                        });
                    });
            },
        },
    };
</script>

<style>
    .el-table th {
        background-color: #282733 !important;
        color: #fff;
    }
    /* * * */
    .el-popper[x-placement^='bottom'] .popper__arrow {
        left: auto;
        right: 50%;
    }
    .el-popper[x-placement^='bottom'] .popper__arrow::after {
        margin-left: auto;
        margin-right: -6px;
    }
    .el-button [class*='el-icon-'] + span {
        margin-right: 5px;
    }
    .el-input__suffix {
        right: auto;
        left: 5px;
    }
    .el-scrollbar__wrap {
        margin-left: -17px !important;
        margin-right: 0px !important;
    }
    .el-table .el-table__cell {
        text-align: right;
    }
    .el-upload-dragger {
        box-sizing: border-box;
        width: 100%;
        height: 98px;
        text-align: center;
        overflow: hidden;
    }
    .el-upload-dragger .el-icon-upload {
        font-size: 46px;
        color: #c0c4cc;
        margin: 14px 0 16px;
        line-height: 25px;
    }
    .el-upload {
        width: 100%;
    }
    /* // A */
    .el-upload {
        position: relative;
    }
    .el-upload__input {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .el-notification {
        direction: ltr;
    }
    .el-form-item__content {
        width: 100% !important;
    }
    .el-form-item__error {
        left: auto;
        right: 0;
    }
</style>
