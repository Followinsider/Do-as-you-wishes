<script>
import {check} from '../utils/auth'
export default {
    functional: true,
    name: 'Authorized',
    props: {
        authority: {
            type: Array,
            required: true,
        }
    },
    render(h,context) {
        const {props, scopedSlots} = context
        // 校验通过，饭返回插槽也即子组件
        return check(props.authority) ? scopedSlots.default(): null
    }
}
</script>

<style>

</style>