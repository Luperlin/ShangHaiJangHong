export default function page (self, query) {
    let _p = {
        current: 1,//当前页码
        pageSize: 10, //当前条数
        total: 0, //总共条数
        showTotal: total => self.$t('page.total')+` ${total} ` + self.$t("page.tiao"),
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '50', '100'], //limit配置
        onShowSizeChange: (current, size) => { _p.current = current; _p.pageSize = size; query() }, //limit改变时的回调
        onChange: (current, size) => { _p.current = current; _p.pageSize = size; self; query() } //page 改变时的回调
    }
    return _p
}