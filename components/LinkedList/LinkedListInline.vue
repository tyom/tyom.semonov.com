<script>
export default {
  name: 'LinkedListInline',
  props: {
    linkedList: {
      type: [Array, Object],
      default: () => [],
    },
    el: {
      type: String,
      default: 'div',
    },
  },
  render(h) {
    return h(
      this.el,
      {
        class: 'LinkedListInline',
      },
      this.linkedList.map((items, idx) =>
        items.map((link, subIdx) => [
          h(
            'v-preview-link',
            {
              props: {
                href: link.url,
                wikipedia: link.wikipedia,
              },
            },
            link.name,
          ),
          link.children
            ? [
                ' (',
                h('LinkedListInline', {
                  props: { linkedList: link.children, el: 'span' },
                }),
                ')',
              ]
            : null,
          subIdx < items.length - 1 || idx < this.linkedList.length - 1
            ? ', '
            : '',
        ]),
      ),
    );
  },
};
</script>
