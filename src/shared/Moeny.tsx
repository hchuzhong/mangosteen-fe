import { defineComponent, PropType } from 'vue';

export const Money = defineComponent({
    props: {
        value: {
            type: Number as PropType<number>,
            required: true
        }
    },
    setup: (props, context) => {
        const formatNumber = (n: number) => {
            const nString = (n / 100).toString()
            const dotIndex = nString.indexOf('.')
            if (dotIndex < 0) {
                return nString + '.00'
            } else if (nString.length - dotIndex === 2) {
                return nString + '0'
            } else {
                return nString
            }
        }
        return () => (
            <span>{formatNumber(props.value)}</span>
        )
    }
})