<template>
    <hr v-if="indexNumber > 0" class="my-8" style="border-color: rgb(229 224 224 / 80%) !important" />
    <div class="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-2">
        <div class="form-group">
            <label class="capitalize"> {{ $t('photographerName') }} </label>
            <div>
                <div class="">
                    <input type="text" v-model="contentObject.name" class="form-input" />
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="capitalize"> {{ $t('mobileNumber') }} </label>
            <div>
                <div class="">
                    <input type="text" v-model="contentObject.mobile" class="form-input" />
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="capitalize"> {{ $t('email') }} </label>
            <div>
                <div class="">
                    <input type="email" v-model="contentObject.email" class="form-input" />
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="capitalize"> {{ $t('identityNumber') }} </label>
            <div>
                <div class="">
                    <input type="text" v-model="contentObject.identity_number" class="form-input" />
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="capitalize"> {{ $t('typeOfPhotography') }} </label>
            <div>
                <div class="">
                    <select v-model="contentObject.photography_type" class="form-select text-white-dark">
                        <option v-for="item in photographyType" :key="item.value" :value="item.value">
                            {{ item.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        <div class="flex items-end">
            <button
                type="button"
                @click.prevent="
                    ConfirmDefaultContract = false;
                    setSignatureWidth();
                    modalValue[indexNumber] = true;
                "
                class="btn btn-success"
            >
                {{ $t('ContractForms') }}
            </button>
            <button v-if="indexNumber > 0" type="button" class="btn btn-danger mx-1" @click="deleteObj">
                <svg class="mx-0.5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                    />
                </svg>
                {{ $t('delete') }}
            </button>
        </div>
        <KeepAlive>
          <div appear v-show="modalValue[indexNumber] ? true : false" as="template">
              <div @close="modalValue[indexNumber] = false" class="relative z-[51]">
                  <div
                      as="template"
                      enter="duration-300 ease-out"
                      enter-from="opacity-0"
                      enter-to="opacity-100"
                      leave="duration-200 ease-in"
                      leave-from="opacity-100"
                      leave-to="opacity-0"
                  >
                      <div class="fixed inset-0 bg-[black]/60" />
                  </div>

                  <div class="fixed inset-0 overflow-y-auto">
                      <div class="flex min-h-full items-center justify-center">
                          <div
                              as="template"
                              enter="duration-300 ease-out"
                              enter-from="opacity-0 scale-95"
                              enter-to="opacity-100 scale-100"
                              leave="duration-200 ease-in"
                              leave-from="opacity-100 scale-100"
                              leave-to="opacity-0 scale-95"
                          >
                              <div class="panel h-full min-h-[100vh] w-full overflow-hidden rounded-none border-0 p-0 text-black dark:text-white-dark">
                                  <button
                                      type="button"
                                      class="absolute top-4 text-gray-400 outline-none hover:text-gray-800 dark:hover:text-gray-600 ltr:right-4 rtl:left-4"
                                      @click="modalValue[indexNumber] = false"
                                  >
                                      <icon-x />
                                  </button>
                                  <div class="bg-[#fbfbfb] py-3 text-lg font-medium dark:bg-[#121c2c] ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5">
                                      {{ $t('ContractForms') }}
                                  </div>
                                  <div class="p-5" ref="contract" :class="ConfirmDefaultContract ? 'activeSign' : ''">
                                      <div class="form-group">
                                          <label class="capitalize"> {{ $t('ContractForms') }} </label>
                                          <div>
                                              <div class="">
                                                  <select v-model="defaultContractObj"  @change="changeContract"
                                                  :placeholder="
                                                      $t('ContractForms')
                                                  " class="form-select text-white-dark">
                                                      <option
                                                          v-for="item in contractMenuList"
                                                          :key="item.id"
                                                          :label="lang == 'ar' ? item.name_ar : item.name_en"
                                                          :value="JSON.stringify(item)"
                                                      >
                                                          {{ lang == 'ar' ? item.name_ar : item.name_en }}
                                                      </option>
                                                  </select>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="fv-row mb-2">
                                          <div v-if="DefaultContract">
                                              <div v-html="lang == 'ar' ? default_contract_content.content_ar : default_contract_content.content_en"></div>
                                          </div>
                                      </div>
                                      <label class="inline-flex">
                                          <input v-model="ConfirmDefaultContract" type="checkbox" class="peer form-checkbox text-success" />
                                          <span class="capitalize peer-checked:text-success"> {{ $t('accept') }}</span>
                                      </label>
                                      <div class="fv-row mb-10">
                                          <div :style="!ConfirmDefaultContract ? 'opacity:.5' : ''">
                                              <div v-if="sigWidth">
                                                  <label class="form-label required text-capitalize" for="">{{ $t('signature') }} </label>
                                                  <div class="selected-w-sig border" @click="deleteAttachFile">
                                                      <vue3-signature
                                                          class="border border-gray-400"
                                                          ref="signature"
                                                          :sigOption="option"
                                                          :w="`${sigWidth}`"
                                                          :h="'300px'"
                                                          :disabled="!ConfirmDefaultContract"
                                                          @endStroke="viewValue"
                                                          @click="testStock()"
                                                      ></vue3-signature>
                                                  </div>
                                                  <div class="mb-4 text-left">
                                                      <button :disabled="!ConfirmDefaultContract" @click.prevent="clear" class="btn btn-default px-4">
                                                          {{ $t('deleteSignature') }}
                                                      </button>
                                                  </div>
                                              </div>
                                              <div>
                                                  <label class="form-label required text-capitalize" for="">{{ $t('attachSignature') }} </label>
                                              </div>
                                              <div class="max-w-72" :aria-disabled="ConfirmDefaultContract">
                                                  <div class="form-group">
                                                      <div class="">
                                                          <vue-file-agent
                                                              @select="filesSelected($event)"
                                                              :disabled="!ConfirmDefaultContract"
                                                              v-model="contentObject.contract_image"
                                                          ></vue-file-agent>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div>
                                              <img
                                                  class="w-100"
                                                  style="object-fit: contain"
                                                  v-if="typeof contentObject.contract_image == 'string' && contentObject.contract_image != ''"
                                                  :src="cdnPath + contentObject.contract_image"
                                              />
                                          </div>
                                      </div>
                                      <div class="flex items-center">
                                          <button type="button" @click="modalValue[indexNumber] = false" class="btn btn-light" data-bs-dismiss="modal">
                                              {{ $t('cancel') }}
                                          </button>
                                          <button
                                              type="button"
                                              class="btn btn-primary mx-3"
                                              @click="ConfirmDefaultContract && contentObject.contract_image != ''? modalValue[indexNumber] = false: ''"
                                              :style="`opacity:${ConfirmDefaultContract && contentObject.contract_image != '' ? '' : '.5'}`"
                                          >
                                              {{ $t('save') }}
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </KeepAlive>
    </div>
</template>
<script>
 import { useAppStore } from '@/stores/index';
    import Vue3Signature from 'vue3-signature';
    import { useRuntimeConfig } from '#imports'
    export default {
        props: {
            indexNumber: {
                require: true,
            },
            photographerVal: {
                require: false,
            },
            isEditable: {
                require: false,
            },
            contractMenuList: {
                require: true,
            },
            DefaultContract: {
                require: true,
            },
        },
        emits:  ["addPhotographer", "delete"],
        data() {
            return {
                cdnPath: useAppStore().cdnPath,
                lang: useAppStore().locale,
                modalValue: [false],
                apiUrl :  useRuntimeConfig().public.apiUrl,
                photographyType: [
                    { name: 'صور', value: 'images' },
                    { name: 'فيديو', value: 'videos' },
                    { name: 'الكل', value: 'all' },
                ],
                defaultContractObj: null,
                hasSignature: true,
                sigWidth: false,
                ConfirmDefaultContract: false,
                default_contract_content: '',
                contentObject: {
                    mobile: '',
                    name: '',
                    email: '',
                    photography_type: '',
                    identity_number: '',
                    legal_form_id: '',
                    contract_image: '',
                },
                option: {
                    penColor: 'rgb(0, 0, 0)',
                    backgroundColor: 'rgb(255,255,255)',
                },
                disabled: false,
            };
        },
        components: {
            Vue3Signature,
        },
        mounted() {
         

            if (this.isEditable) {
                this.contentObject = this.photographerVal;
                this.defaultContractObj = JSON.stringify({
                    id: this.photographerVal.legal_form.id,
                    name_en: this.photographerVal.legal_form.name_en,
                    name_ar: this.photographerVal.legal_form.name_ar,
                    is_active: this.photographerVal.legal_form.is_active,
                });
                this.getContractContent(this.photographerVal.legal_form.id);
            } else {
                this.contentObject.legal_form_id = this.DefaultContract.id;
                this.defaultContractObj = JSON.stringify({
                    id: this.DefaultContract.id,
                    name_en: this.DefaultContract.name_en,
                    name_ar: this.DefaultContract.name_ar,
                    is_active: this.DefaultContract.is_active,
                });
                this.default_contract_content = this.DefaultContract;
            }
        },
        watch: {
            DefaultContract() {
                this.contentObject.legal_form_id = this.DefaultContract.id;
                this.default_contract_content = this.DefaultContract;
                this.defaultContractObj = JSON.stringify({
                    id: this.DefaultContract.id,
                    name_en: this.DefaultContract.name_en,
                    name_ar: this.DefaultContract.name_ar,
                    is_active: this.DefaultContract.is_active,
                });
            },
            photographerVal() {
                this.contentObject = this.photographerVal;
                this.contentObject.legal_form_id = this.photographerVal.legal_form.id;
                this.defaultContractObj = JSON.stringify({
                    id: this.photographerVal.legal_form.id,
                    name_en: this.photographerVal.legal_form.name_en,
                    name_ar: this.photographerVal.legal_form.name_ar,
                    is_active: this.photographerVal.legal_form.is_active,
                });
                this.getContractContent(this.photographerVal.legal_form.id);
            },
            contentObject: {
                handler() {
                    this.$emit('addPhotographer', this.contentObject, this.indexNumber);
                },
                deep: true,
            },
        },
        methods: {
            deleteObj() {
                this.$emit('delete', this.indexNumber, 'photographer');
            },
            setSignatureWidth() {
                setTimeout(() => {
                    this.sigWidth = this.$refs.contract.clientWidth - 53 + 'px';
                }, 500);
            },
            checkObjectValues(obj) {
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (!obj[key]) {
                            return false;
                        }
                    }
                }
                return true;
            },
            clear() {
                var _this = this;
                _this.$refs.signature.clear();
                if (this.hasSignature) {
                    this.contentObject.contract_image = '';
                }
            },
            testStock() {
              if (this.ConfirmDefaultContract) {
                
                var _this = this;
                this.viewValue()
              }
            },
            fromDataURL(url) {
                var _this = this;
                _this.$refs.signature.fromDataURL('data:image/png;base64,iVBORw0K...');
            },
            changeContract() {
                const ID = JSON.parse(this.defaultContractObj).id;
                this.contentObject.legal_form_id = JSON.parse(this.defaultContractObj).id;
                this.getContractContent(ID);
            },
            async getContractContent(id) {
                this.default_contract_content = '';
                await $fetch(`${this.apiUrl}/api/legal-form/${id}`, {
                  method: 'GET'
                })
                    .then((res) => {
                        this.default_contract_content = res.data;
                    })
                    .catch((err) => {
                        // Notification.error({
                        //     title: '',
                        //     message: err?.response?.data?.message,
                        //     type: 'error',
                        // });
                        // Object.keys(err.response.data.errors).forEach((key) => {
                        //     var errMSG = err.response.data.errors[key][0];
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
            deleteAttachFile() {
                if (this.ConfirmDefaultContract) {
                    this.contentObject.contract_image = '';
                    this.hasSignature = true;
                }
            },
            filesSelected(e) {
                this.hasSignature = false;
                this.clear();
                this.contentObject.contract_image = e[0].file;
            },
            viewValue() {
                var _this = this;
                var img = _this.$refs.signature.save();
                fetch(img).then((res) => res.blob())
                    .then((blob) => {
                        const fd = new FormData();
                        const file = new File([blob], 'signature.jpeg');
                        fd.append('image', file);
                        this.contentObject.contract_image = file;
                    });

            },
        },
    };
</script>

<style></style>
