<template>
  <form @submit.prevent style="margin: 0 auto">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Room Reservation</p>
      </header>
      <section class="modal-card-body" style="width: 500px;">
        <b-field horizontal label="ชื่อรายการ">
          <b-input placeholder="แผน วิษณุฯ"></b-input>
        </b-field>
        <b-field horizontal label="ห้องที่จอง">
          <b-select placeholder="เลือกห้อง" icon="account">
            <optgroup label="< 15 คน">
              <option value>ห้องประชุม 1</option>
              <option value>ห้องประชุม 2</option>
              <option value>ห้องประชุม 3</option>
              <option value>ห้องประชุม 4</option>
              <option value>ห้องประชุม 5</option>
            </optgroup>

            <optgroup label="< 25 คน">
              <option value>ห้องประชุม กวศ</option>
            </optgroup>

            <optgroup label="< 40 คน">
              <option value>ห้องประชุมใหญ่</option>
            </optgroup>
          </b-select>
        </b-field>

        <b-field horizontal label="วัน">
          <b-datepicker></b-datepicker>
        </b-field>
        <b-field horizontal label="เวลาเริ่ม">
          <b-clockpicker></b-clockpicker>
        </b-field>
        <b-field horizontal label="เวลาจบ">
          <b-clockpicker></b-clockpicker>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">ยกเลิก</button>
        <button class="button is-primary">จองห้อง</button>
      </footer>
    </div>
  </form>
</template>
