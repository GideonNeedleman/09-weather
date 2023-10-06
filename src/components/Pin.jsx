import "./Pin.css";

// need to set id from props
function Pin() {
  return (
    <div class="checkbox-wrapper-8">
      <input class="tgl tgl-skewed" id="cb3-8" type="checkbox" />
      <label
        class="tgl-btn"
        data-tg-off="OFF"
        data-tg-on="ON"
        for="cb3-8"
      ></label>
    </div>
  );
}

export default Pin;
