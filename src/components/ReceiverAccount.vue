<template>
    <a-input-group compact>
        <a-select v-model="type" @change="handleTypeChange" style="width:120px;">
            <a-select-option value="alipay">支付宝</a-select-option>
            <a-select-option value="bank">银行账户</a-select-option>
        </a-select>
        <a-input style="width:calc(100% - 120px)"  v-model="number" @change="handleNumberchange"/>
    </a-input-group>
</template>

<script>
export default {
    props: {
        value: {
            type: Object,
        }
    },
    data() {
        const {type, number} = this.value || {};
        return {
            type: type || 'alipay',
            number: number || ''
        }

    },
    watch: {
        value(val) {
            Object.assign(this, val);
        }
    },
    methods: {
        handleTypeChange(val) {
            // console.log('type',val);
            this.$emit('change', {...this.value, type: val});
        },
        handleNumberchange(e) {
            // console.log('Num',e);
            this.$emit('change', {...this.value, number: e.target.value});
        }
    },
}
</script>

<style>

</style>