<template>
    <div class="tgt">
        <div class="mt-6" :class="addNew || Edit ? '' : 'panel'">
            <div v-if="addNew || Edit" class="mb-5 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3 ltr:ml-auto rtl:mr-auto">
                <button
                    type="button"
                    class="btn btn-primary mr-auto"
                    @click="
                        addNew = false;
                        Edit = false;
                    "
                >
                    {{ $t('back') }}
                </button>
            </div>
            <div v-if="addNew">
                <CreateNewSession @backToHome="goToHome" />
            </div>
            <div v-if="Edit">
                <EditSession @backToHome="goToHome" :ID="selectedId" />
            </div>

            <div v-if="!addNew && !Edit" class="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                <h5 class="text-lg font-semibold dark:text-white-light">{{ $t('sessionProductionManagement') }}</h5>
                <div class="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3 ltr:ml-auto rtl:mr-auto">
                    <button
                        type="button"
                        class="btn btn-primary"
                        @click="
                            addNew = true;
                            Edit = false;
                        "
                    >
                        <icon-plus class="ltr:mr-2 rtl:ml-2" />

                        {{ $t('addNewSession') }}
                    </button>
                    <div>
                        <input v-model="search" type="text" class="form-input w-auto" placeholder="Search..." />
                    </div>
                </div>
            </div>
            <div v-if="!addNew && !Edit" class="datatable">
                <vue3-datatable
                    :rows="rows"
                    :columns="cols"
                    :sortable="true"
                    :totalRows="totals"
                    :isServerMode="true"
                    :search="search"
                    skin="whitespace-nowrap bh-table-hover"
                    :showFirstPage="false"
                    :showLastPage="false"
                    :showNumbersCount="20"
                    :pageSizeOptions="[10, 20, 50, 100]"
                    :paginationInfo="`${$t('showing')} {0} ${$t('to')}  {1} ${$t('of')} {2} ${$t('results')}`"
                    :noDataContent="$t('ThereAreNoData')"
                    @pageChange="handleCurrentChange"
                    @pageSizeChange="handleSizeChange"
                    @change="handleCurrentChange"
                    firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                    previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                >
                    <template #has_images="data">
                        {{ data.has_images ? $t('found') : $t('notFound') }}
                    </template>
                    <template #has_videos="data">
                        {{ data.has_videos ? $t('found') : $t('notFound') }}
                    </template>
                    <template #action="data">
                        <div class="flex items-center">
                            <client-only>
                                <div>
                                    <button
                                        @click="
                                            addNew = false;
                                            Edit = true;
                                            selectedId = data.value.id;
                                        "
                                        type="button"
                                        class="ltr:mr-2 rtl:ml-2"
                                    >
                                        <!-- v-tippy:edit -->
                                        <icon-pencil />
                                    </button>
                                    <!-- <tippy target="edit">{{ $t('edit') }} </tippy> -->
                                </div>
                                <div>
                                    <!-- v-tippy:delete -->
                                    <button @click="deleteModal(data.value.id, data.value.name)" type="button">
                                        <icon-trash-lines />
                                    </button>
                                    <!-- <tippy target="delete">{{ $t('delete') }}</tippy> -->
                                </div>
                            </client-only>
                        </div>
                    </template>
                </vue3-datatable>
            </div>
            <TransitionRoot appear :show="delModal" as="template">
                <Dialog as="div" class="relative z-50">
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0"
                        enter-to="opacity-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100"
                        leave-to="opacity-0"
                    >
                        <DialogOverlay class="fixed inset-0 bg-[black]/60" />
                    </TransitionChild>

                    <div class="fixed inset-0 overflow-y-auto">
                        <div class="flex min-h-full items-start justify-center px-4 py-8">
                            <TransitionChild
                                as="template"
                                enter="duration-300 ease-out"
                                enter-from="opacity-0 scale-95"
                                enter-to="opacity-100 scale-100"
                                leave="duration-200 ease-in"
                                leave-from="opacity-100 scale-100"
                                leave-to="opacity-0 scale-95"
                            >
                                <DialogPanel class="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        class="absolute top-4 text-gray-400 outline-none hover:text-gray-800 dark:hover:text-gray-600 ltr:right-4 rtl:left-4"
                                        @click="delModal = false"
                                    >
                                        <svg>...</svg>
                                    </button>
                                    <div class="bg-[#fbfbfb] py-3 text-lg font-bold dark:bg-[#121c2c] ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5">
                                        {{ delModalName }}
                                    </div>
                                    <div class="p-5">
                                        <p>
                                            {{ $t('areYouSure') }}
                                        </p>

                                        <div class="mt-8 flex items-center justify-end">
                                            <button type="button" @click="delModal = false" class="btn btn-primary">{{ $t('cancel') }}</button>
                                            <button
                                                type="button"
                                                @click="
                                                    delModal = false;
                                                    deleteSession(delModalID);
                                                "
                                                class="btn btn-outline-danger ltr:ml-4 rtl:mr-4"
                                            >
                                                {{ $t('delete') }}
                                            </button>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </TransitionRoot>
        </div>
    </div>
</template>
<script>
    import { useRuntimeConfig } from '#imports';
    import { useAppStore } from '@/stores/index';
    import CreateNewSession from './add';
    import EditSession from './edit';
    import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import Swal from 'sweetalert2';
    import '@bhplugin/vue3-datatable/dist/style.css';
    // import 'tippy.js/dist/tippy.css';

    export default {
        components: {
            Vue3Datatable,
            TransitionRoot,
            TransitionChild,
            Dialog,
            DialogPanel,
            DialogOverlay,
            CreateNewSession,
            EditSession,
        },
        data() {
            return {
                lang: useAppStore().locale,
                apiUrl: useRuntimeConfig().public.apiUrl,
                addNew: false,
                delModal: false,
                totals: 0,
                search: '',
                cols: [
                    { field: 'name', title: this.$t('selectSessionName') },
                    { field: 'country', title: this.$t('country') },
                    { field: 'city', title: this.$t('city') },
                    { field: 'has_images', title: this.$t('pictures') },
                    { field: 'has_videos', title: this.$t('videos') },
                    { field: 'action', title: this.$t('actions'), sort: false },
                ],
                rows: [],
                Edit: false,
                sessionList: [],
                per_page: 10,
                pageInfo: 1,
                page: 1,
                delModalName: '',
                delModalID: '',
            };
        },
        mounted() {
            console.log('ms hendy', this.apiUrl);
        },
        created() {
            this.getSessionsList();
        },
        watch: {
            page() {
                this.getSessionsList();
            },
        },
        methods: {
            goToHome() {
                this.addNew = false;
                this.Edit = false;
                this.getSessionsList();
            },
            handleCurrentChange(val) {
                this.page = val.current_page;
                this.per_page = val.pagesize;
                this.getSessionsList();
            },
            handleSizeChange(val) {
                this.per_page = val;
                this.getSessionsList();
            },
            async getSessionsList() {
                const res = {
                    data: [
                        {
                            id: 11,
                            name: '2021',
                            country_id: 2,
                            country: 'ألبانيا',
                            city_id: 33,
                            city: 'بيرات',
                            datetime: null,
                            has_videos: true,
                            has_images: true,
                        },
                        {
                            id: 12,
                            name: 'جديد',
                            country_id: 63,
                            country: 'مصر',
                            city_id: 1004,
                            city: 'الفيوم',
                            datetime: null,
                            has_videos: true,
                            has_images: true,
                        },
                        {
                            id: 13,
                            name: 'qawedawf',
                            country_id: 3,
                            country: 'الجزائر',
                            city_id: 71,
                            city: 'عين تموشنت',
                            datetime: null,
                            has_videos: true,
                            has_images: true,
                        },
                        {
                            id: 14,
                            name: '2w43',
                            country_id: 2,
                            country: 'ألبانيا',
                            city_id: 34,
                            city: 'بولقيز',
                            datetime: null,
                            has_videos: false,
                            has_images: true,
                        },
                        {
                            id: 15,
                            name: 'eadaf',
                            country_id: 2,
                            country: 'ألبانيا',
                            city_id: 34,
                            city: 'بولقيز',
                            datetime: null,
                            has_videos: true,
                            has_images: true,
                        },
                        {
                            id: 16,
                            name: 'adfsda',
                            country_id: 3,
                            country: 'الجزائر',
                            city_id: 72,
                            city: 'الجزائر',
                            datetime: null,
                            has_videos: false,
                            has_images: true,
                        },
                        {
                            id: 17,
                            name: 'sadfsdf',
                            country_id: 4,
                            country: 'ساموا الأمريكية',
                            city_id: 119,
                            city: 'روز ايلاند',
                            datetime: null,
                            has_videos: true,
                            has_images: false,
                        },
                        {
                            id: 18,
                            name: 'sadfsdf',
                            country_id: 4,
                            country: 'ساموا الأمريكية',
                            city_id: 119,
                            city: 'روز ايلاند',
                            datetime: null,
                            has_videos: true,
                            has_images: false,
                        },
                        {
                            id: 19,
                            name: 'ertewrt',
                            country_id: 2,
                            country: 'ألبانيا',
                            city_id: 34,
                            city: 'بولقيز',
                            datetime: null,
                            has_videos: false,
                            has_images: true,
                        },
                        {
                            id: 22,
                            name: 'warfwe',
                            country_id: 2,
                            country: 'ألبانيا',
                            city_id: 34,
                            city: 'بولقيز',
                            datetime: null,
                            has_videos: false,
                            has_images: true,
                        },
                    ],
                    links: {
                        first: 'http://127.0.0.1:8000//api/recording-session?page=1',
                        last: 'http://127.0.0.1:8000//api/recording-session?page=2',
                        prev: null,
                        next: 'http://127.0.0.1:8000//api/recording-session?page=2',
                    },
                    meta: {
                        current_page: 1,
                        from: 1,
                        last_page: 2,
                        path: 'http://127.0.0.1:8000//api/recording-session',
                        per_page: '10',
                        to: 10,
                        total: 12,
                    },
                };
                this.sessionList = res.data;
                this.rows = res.data;
                this.totals = res.meta.total;
                console.log('value', this.totals);
                this.pageInfo = res.meta;
                // await $fetch(`${this.apiUrl}/api/recording-session?per_page=${this.per_page}&page=${this.page}`, {
                //     method: 'GET',
                //     headers: {
                //         'Accept-Language': this.lang,
                //     },
                // }).then((res) => {
                //     this.sessionList = res.data;
                //     this.rows = res.data;
                //     this.totals = res.meta.total;
                //     console.log('value', this.totals);
                //     this.pageInfo = res.meta;
                // });
            },
            async deleteSession(id) {
                await $fetch(`${this.apiUrl}/api/recording-session/${id}`, {
                    method: 'DELETE',
                })
                    .then((res) => {
                        Swal.fire({
                            title: '',
                            text: 'تم الحذف  بنجاح',
                            icon: 'success',
                        });
                        this.getSessionsList();
                    })
                    .catch((err) => {
                        // Notification.error({
                        //     title: '',
                        //     message: err?.response?.data?.message,
                        //     type: 'error',
                        // });
                        // Object.keys(err?.response?.data?.errors).forEach((key) => {
                        //     var errMSG = err?.response?.data?.errors[key][0];
                        //     setTimeout(() => {
                        //         Notification.error({
                        //             title: '',
                        //             message: errMSG,
                        //             type: 'error',
                        //         });
                        //     }, 500);
                        // });
                    });
            },
            deleteModal(id, name) {
                console.log('Action');
                this.delModal = true;
                this.delModalName = name;
                this.delModalID = id;
            },
        },
    };
</script>
<style>
    @import '@bhplugin/vue3-datatable/dist/style.css';
</style>
