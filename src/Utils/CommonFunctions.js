import moment from "moment";

export default function goLiveBtnHandler(batch = {}, variant = {}) {
  if (batch?.session?.type === 1)
    if (variant[moment().format("dddd").toLowerCase()])
      if (moment().isBetween(variant.start, variant.end))
        if (
          moment().isBetween(
            moment(variant.start_time, "HH:mm:ss"),
            moment(variant.end_time, "HH:mm:ss")
          )
        )
          return true;
  return false;
}
