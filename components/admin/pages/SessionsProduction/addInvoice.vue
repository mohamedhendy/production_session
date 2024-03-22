<template>
    <hr v-if="indexNumber > 0" class="my-8" style="border-color: rgb(229 224 224 / 80%) !important" />
    <div class="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-2">
        <div class="form-group">
            <label class="capitalize"> {{ $t('addInvoice') }} </label>
            <div>
                <div class="">
                    <input type="text" v-model="contentObject.title" class="form-input" />
                </div>
            </div>
        </div>

        <div class="form-group">
            <label class="capitalize"> {{ $t('invoicePrice') }} </label>
            <div>
                <div class="">
                    <input type="text" v-model="contentObject.price" class="form-input" />
                </div>
            </div>
        </div>

        <div class="form-group">
            <label class="capitalize"> {{ $t('attachInvoicePicture') }} </label>
            <div>
                <div class="">
                    <vue-file-agent @select="filesSelected($event)"   v-model="contentObject.file">
                    </vue-file-agent>
                    <img
                        class="w-100"
                        style="object-fit: contain"
                        v-if="typeof contentObject.file == 'string' && contentObject.file != ''"
                        :src="cdnPath + contentObject.file"
                    />
                </div>
            </div>
        </div>
        <button v-if="indexNumber > 0" type="button" class="mt-6 btn h-[50px] max-w-[100px] btn-danger mx-1" @click="deleteObj">
            <svg class="mx-0.5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                />
            </svg>
            {{ $t('delete') }}
        </button>
    </div>
</template>

<script>
import { useAppStore } from '@/stores/index';
    export default {
        props: {
            indexNumber: {
                require: true,
            },
            invoiceVal: {
                require: true,
            },
            isEditable: {
                require: false,
            },
        },
        emits:  ["addInvoice", "delete"],
        data() {
            return {
                cdnPath:useAppStore().cdnPath,
                contentObject: {
                    title: '',
                    price: '',
                    file: '',
                },
            };
        },
        mounted() {
            if (this.isEditable) {
                this.contentObject = this.invoiceVal;
            }
        },
        watch: {
            invoiceVal() {
                this.contentObject = this.invoiceVal;
            },
            contentObject: {
                handler(newValue, oldValue) {
                    this.$emit('addInvoice', this.contentObject, this.indexNumber);
                },
                deep: true,
            },
        },
        methods: {
            deleteObj() {
                this.$emit('delete', this.indexNumber, 'invoice');
            },
            filesSelected(e) {
                this.contentObject.file = e[0].file;
            },
        },
    };
</script>
<style>
    .el-checkbox__input .el-checkbox__inner {
        height: 39px;
        width: 39px;
        vertical-align: middle;
    }
    .el-checkbox__inner::after {
        content: '';
        border: 4px solid #fff;
        border-left: 0;
        border-top: 0;
        height: 13px;
        left: 15px;
        position: absolute;
        top: 9px;
    }
</style>
