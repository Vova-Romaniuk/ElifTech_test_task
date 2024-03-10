import dayjs from "dayjs";

export const formatDateTime = (dateString) =>
	dayjs(dateString).format("D MMMM, YYYY [в] HH:mm");
