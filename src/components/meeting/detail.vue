<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="4">
                <span class="expand-key">组名称: </span>
                <span class="expand-value">{{ row.groupid }}</span>
            </Col>
            <Col span="4">
                <span class="expand-key">计划开始时间: </span>
                <span class="expand-value">{{ row.fromtime }}</span>
            </Col>
            <Col span="4">
                <span class="expand-key">计划结束时间: </span>
                <span class="expand-value">{{ row.endtime }}</span>
            </Col>
            <Col span="4">
                <span class="expand-key">理由: </span>
                <span class="expand-value">{{ row.notes }}</span>
            </Col>
            <Col span="4">
                <span class="expand-key">酒店理由: </span>
                <span class="expand-value">{{ row.hotelremark }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="4">
                <span class="expand-key">投影: </span>
                <span class="expand-value">{{ row.barco }}</span>
            </Col>
            <Col span="4">
                <span class="expand-key">白板: </span>
                <span class="expand-value">{{ row.board }}</span>
            </Col>
            <Col span="4">
                <span class="expand-key">话筒: </span>
                <span class="expand-value">{{ row.microPhone }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">朝向: </span>
                <span class="expand-value">{{ row.orient }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
  props: {
    row: Object
  }
}
</script>
