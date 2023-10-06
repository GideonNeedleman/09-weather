import "./Pin.css";

// need to set id from props
function Pin({ id, isPinned, handlePin }) {
  return (
    <div class="checkbox-wrapper-8">
      <input
        className="tgl tgl-skewed"
        id={`pin-${id}`}
        type="checkbox"
        name={`pin-${id}`}
        checked={isPinned}
        value={isPinned}
        onChange={handlePin}
      />
      <label
        class="tgl-btn"
        data-tg-off="SAVE"
        data-tg-on="SAVED"
        htmlFor={`pin-${id}`}
      ></label>
    </div>
  );
}

export default Pin;
